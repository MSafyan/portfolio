---
title: "Matching People by What They Lack, Not What They Share"
seo_title: "Complementary Matching With Embeddings: Strength to Weakness"
seo_description: "Embed each member's weaknesses and search them against everyone else's strengths. Weight it 0.5, similarity 0.4, engagement 0.1, and drop anything under 40/100."
slug: complementary-matching-embeddings
target_query: complementary matching strengths weaknesses embeddings
service: ai-integration
case_study: wesion-ai-matching
status: draft
published: null
---

> **Short answer**
> - Have an LLM pull keywords, strengths and weaknesses out of each profile first. Don't embed the whole bio.
> - Store each dimension in its own Pinecone namespace. Then embed a member's *weaknesses* and search them against the *strengths* namespace.
> - Final score = 0.4 × semantic similarity + 0.5 × strength-to-weakness fit + 0.1 × engagement, on a 0–100 scale.
> - Drop anything under 40. Vector search always returns *something*, even for a bad match.

Most "AI matching" connects people who look alike: same hobbies, same words in their bio. For a social learning app that's the wrong goal. A member who wants to get better at public speaking doesn't need another nervous speaker. They need someone whose *strength* is public speaking. This post shows how I built that for a UK social learning app, with OpenAI embeddings and Pinecone: what goes into the vectors, which vectors are compared with which, and the exact formula and cut-off it runs on.

## Contents

- Why similarity alone gives the wrong matches
- Step 1: extract keywords, strengths and weaknesses before embedding
- Step 2: one Pinecone namespace per dimension
- Step 3: search weaknesses against strengths
- Step 4: the complementary matching score, 0.4 / 0.5 / 0.1
- Step 5: drop matches under 40/100
- What I'd do the same way again

## Why similarity-based matching gives the wrong matches

Embeddings measure how close two pieces of text are in topic. Two people who both write "I like cricket, I like sports" come out as close. That's fine for an "interests" match, but it can't express *I can teach what you want to learn*. If you put one vector per profile into a vector database and ask for nearest neighbours, you get people like you, and that's all you get.

The members of this app answer an assessment: what they can help with, what they need help with, what they want to collaborate on, what they can teach, their hobbies, their values. That's enough data for complementary matching. It just has to be split up before it's embedded.

## Step 1: Extract keywords before embedding, not after

The first lesson was not to embed paragraphs. A whole bio is full of words that don't help matching: pronouns, filler, "I really like". Matching on all of it means matching on noise. In my walkthrough video I put it as: someone writes "I like cricket", and the only useful thing in it is *cricket*.

So each member's answers go to an LLM once, with a prompt that asks for structured output:

```text
Analyze these user responses and create a profile summary:

USER RESPONSES:
{formatted answers}

Provide JSON with:
1. Top 5 strengths with brief explanations
2. Top 3 weaknesses with brief explanations
3. Top 3 interests with brief explanations
4. Top 3 values with brief explanations
5. Summary (150-200 words)
6. 30-40 keywords (single words or short terms)

Focus on skills ratings, patterns, and meaningful keywords. Avoid common words.
```

Before the call, each answer gets a prefix that says what kind of answer it is, such as `I NEED HELP WITH:`, `I CAN HELP WITH:` or `I CAN TEACH:`. Rating questions keep their score (`public speaking (rated 2/5)`), so the model can tell a strength from a weakness instead of guessing from the wording.

> **Warning:** A response capped at a few thousand tokens can stop halfway through the keyword array, and then `JSON.parse` fails. The parser repairs a cut-off `"keywords": [` list and quotes keywords that came back unquoted. Without that, a member silently gets no profile.

> **Note:** At the time (2025), extraction ran on `gpt-4o-mini`, capped at 2,000 output tokens with temperature 0.2, and embeddings used `text-embedding-3-small`. Model names change quickly. The approach doesn't depend on them.

## Step 2: One Pinecone namespace per profile dimension

Each list from the LLM is joined into one short text and embedded on its own. The vectors go into the same Pinecone index under separate namespaces:

| Namespace | What it holds |
|---|---|
| `profiles` | The full formatted profile (fallback) |
| `strengths` | The member's top strengths |
| `weaknesses` | The member's top weaknesses |
| `interests` | Interests |
| `values` | Values |
| `keywords` | The 30–40 extracted keywords |

A namespace works like a table inside the index. Every vector has the same ID (`user-<id>`) in every namespace, so you can fetch any dimension for any member without a lookup table. Keeping the dimensions apart also means strengths are compared with strengths, not with hobbies.

```ts
const index = pinecone.index('member-profiles');

await index.namespace('strengths').upsert([{
  id: `user-${userId}`,
  values: await embed(profile.strengths.join('. ')),
  metadata: { userId: String(userId), strengths: profile.strengths.join('|') },
}]);
// ...the same for weaknesses, interests, values and keywords
```

## Step 3: Search weaknesses against strengths, not like against like

This is where complementary matching happens, and it's a single query. Take the member's weaknesses, embed them, and search the **strengths** namespace:

```ts
const queryVector = await embed(me.weaknesses.join('. '));

const { matches } = await index.namespace('strengths').query({
  vector: queryVector,
  topK: limit + 1,           // +1: the member may match themselves
  includeMetadata: true,
});

const strengthScore = Math.round(match.score * 100); // 0–100
```

Someone whose weakness is "nervous speaking in front of groups" lands next to someone whose strength is "public speaking and presenting". The words differ but the meaning is close, and that's what embeddings are good at. A simple word-overlap check on the returned strengths then picks out the specific areas that match ("Complementary in: public speaking"). These become the reasons shown with the match.

The semantic side runs separately: the member's `keywords` vector against everyone else's `keywords` namespace, falling back to the full `profiles` namespace if that finds nothing.

> **Tip:** Run this query in both directions and store both. In this app a match row is one-directional (A→B and B→A are separate rows). What A can teach B isn't what B can teach A, so the scores differ.

## Step 4: The complementary matching score, 0.4 / 0.5 / 0.1

The two searches return two candidate lists. They are merged by member ID and scored:

```ts
const SEMANTIC_WEIGHT   = 0.4; // shared keywords and meaning
const COMPLEMENT_WEIGHT = 0.5; // their strengths vs my weaknesses
const ENGAGEMENT_WEIGHT = 0.1; // how active the other member is

const score = Math.min(100, Math.round(
  semanticScore   * SEMANTIC_WEIGHT +
  strengthScore   * COMPLEMENT_WEIGHT +
  engagementScore * ENGAGEMENT_WEIGHT,
));
```

All three inputs are on 0–100. The engagement score is the platform's own measure of how active a member is (learning, feedback, completed tasks). It gives an active member a small boost, so recommendations point to people who will reply.

These weights weren't right first time. In the commit history the two-part version went from 0.4 similarity / 0.6 complementary to 0.5 / 0.5 to 0.6 / 0.4 on the day matching was built (16 May 2025). On 21 July 2025 the engagement term was added and the weights settled at 0.4 / 0.5 / 0.1. Complementary fit now carries the most weight, which is the point of the feature.

> **Note:** A member who appears in only one list gets 0 for the other part. Someone who complements you but shares none of your keywords can still score up to 50 from that part alone, plus engagement.

## Step 5: Drop complementary matches under 40/100

Vector search never comes back empty. Ask for the ten nearest neighbours and you get ten, even if the closest one is a poor fit. In this system a bad pairing still scored 5, 10, 20 or 30 points. Showing those as "recommended" would teach members to ignore recommendations.

So matches under **40 out of 100** aren't recommended. The query that builds introduction lists filters `score >= 40`, and a member can't unlock a match that scores less. We picked 40 for this app's member base. With a much larger pool you could afford a higher bar.

Each kept match then gets a one- or two-sentence explanation written by the LLM from the score parts and the match reasons, so a member sees *why* someone was suggested, not just a number.

## How often to recompute the matches

Profiles change as members answer more questions, so matching runs as a weekly job, plus whenever a new member is added. It works in two phases:

1. **Build profiles.** Call the LLM to extract the lists, then embed and upsert into each namespace.
2. **Calculate matches.** For every member with relevant answers, run the two searches, merge, score, filter and save.

The engagement scores are loaded in one query before phase 2 and passed in as a map, so the job doesn't query the database once per pair.

## What I'd do the same way again

- **Extract, then embed.** Most of the quality came from this.
- **One namespace per dimension**, so the matching rule ("my weaknesses vs your strengths") is just a choice of which namespace to query.
- **Weights in named constants**, changed in small steps and kept in version control, so the history shows what was tried.
- **A cut-off chosen on real data.** 40 suited this member base. Look at your own score distribution before you pick a number.

## Want matching like this in your app?

I build AI features like this for community, mentoring and learning products: matching, recommendations, and the cost control that keeps them affordable. See [AI integration services](/services/ai-integration) for what I offer, or read the [full case study](/work/wesion-ai-matching) to see how this matching fits into a platform of 11 AI services, and how LLM spend was cut by 95%. If you want members matched on what they can give each other, [get in touch](/contact).
