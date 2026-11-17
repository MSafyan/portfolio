---
title: "Our LLM Moderator Blocked Real Posts. The Fix"
seo_title: "LLM Moderation Rejecting Legitimate Posts: How We Fixed It"
seo_description: "An LLM moderator that rejects real posts usually has vague rules. Default to valid, list only explicit violations with examples of both sides and keep a revert."
slug: llm-moderation-false-positives
target_query: llm moderation rejecting legitimate posts
service: ai-integration
case_study: helpicon-marketplace
status: published
published: 2026-11-17
---

> **Short answer**
> - Make "valid" the default. Reject only on a short list of explicit violations, and say "when in doubt, return TRUE".
> - Give examples of both sides: "I want to work as a teacher" (reject) next to "I want a math teacher for my son" (accept).
> - Store the model's reason, tell the poster, and give admins a one-click "Mark valid".
> - Re-test the prompt whenever the model changes, including when the name stays the same.

On a services marketplace, a post that says "I want a math teacher for my son" is the business working as intended. A post that says "I want to work as a teacher" is a helper advertising themselves in the place where customers ask for help. To a careless moderator the two look almost the same. This is how the LLM validator I built for a Swedish services marketplace went from rejecting real tasks to letting them through, prompt by prompt, with the dates from the commit history.

## Contents

- What the moderator had to catch
- The first prompts, and why they rejected legitimate posts
- The fix: default to valid, explicit violations only
- Contact details: phone numbers, emails, "call me at…"
- Design the pipeline so a false positive is cheap
- Why the prompt needs re-testing when the model behind the same name changes

## What the LLM moderator had to catch

The marketplace connects people who need help (cleaning, babysitting, pet care, errands) with local helpers. Three kinds of post kept appearing that the platform doesn't allow:

1. **"Hire me" ads in the wrong place.** Helpers posted tasks asking to *be* hired, instead of waiting for tasks to apply to.
2. **Off-platform contact.** Helpers put phone numbers into the questions they're allowed to ask on a task, so the customer could contact them directly and skip the platform.
3. **Services the platform doesn't offer**, such as massage requests that specify the gender of the person.

None of these can be caught reliably with keywords. "Looking for a cleaner" and "looking for cleaning work" share most of their words. So an LLM checks every task, and a second set of prompts checks every question, answer and review.

## The first prompts, and why they rejected legitimate posts

The first task validator (February 2025) was two sentences:

```text
Analyze if the following task description is a valid service request from a buyer.
Invalid tasks are those where someone is offering services (like "hire me")
instead of requesting services.
```

A week later it had become a rule list:

```text
Return FALSE if and ONLY if ANY of these conditions are met:
1. Someone is offering/advertising their services (examples: "hire me", "I can help", "looking for work")
2. Someone is seeking employment or work opportunities
3. The post includes contact information (phone numbers, email, etc.)
4. The post appears to be from a service provider/seller rather than a buyer

Return TRUE for all other cases, even if the task description is brief or unclear.
```

It looks reasonable, but in its first versions the validator blocked a lot of tasks that were fine. Read the rules again with a customer's post in mind:

- Rule 1 uses bare phrases as examples. "I can help" and "looking for" also appear in ordinary requests ("looking for someone who can help me move").
- Rule 4 asks the model to judge whether a post "appears to be" from a seller. That invites guessing, and a short or oddly worded request is easy to guess wrong.
- Nothing shows the model what a *valid* post looks like. It only has examples of what to reject.

The model changed too. Within about a week in February 2025 the validator moved from `gpt-3.5-turbo` to `gpt-4o-mini` to `o1-mini`. Swapping models doesn't fix vague rules, though. The prompt had to change.

> **Note:** Model names here are what the service ran at the time (2025). The lesson doesn't depend on them.

## The fix for LLM moderation false positives: default to valid

On 28 November 2025 the prompt went through four revisions in a single day. The final version is built on three ideas.

**1. A stated default.** The prompt opens by telling the model which way to lean:

```text
VALIDATION PHILOSOPHY: Be EXTREMELY PERMISSIVE. Almost all requests should be marked VALID.
DEFAULT BEHAVIOR: Return TRUE (valid) unless you find an EXPLICIT violation listed below.
```

**2. Few categories, each tied to explicit wording.** There are four: seller advertising, a seller looking for work, contact information, and inappropriate services. Seller advertising now requires first-person offers ("I offer", "I provide", "Hire me"), not any sentence that mentions help.

**3. Contrasting examples, side by side.** This is the change that mattered most. The seller rule now carries both lists:

```text
Examples that should be REJECTED (seller seeking work):
  * "I want to work as a plumber"   (person wants to BE a plumber)
  * "Looking for work as a teacher" (person wants to BE a teacher)
Examples that should be ACCEPTED (buyer wanting to hire):
  * "I want a math teacher for my son" (buyer wants to HIRE a teacher)
  * "Looking for a plumber to fix sink" (buyer wants to HIRE a plumber)
```

It also lists odd posts that must pass: unusual services ("capture the sunset in Stockholm"), errands ("stand in the queue at the Apple store"), lifts ("drive me to Stockholm"), and vague tests like "Testing" or "Help needed". It ends with: *"WHEN IN DOUBT: Return TRUE (valid). Only reject when 100% certain it matches a rejection category."*

> **Tip:** Examples work better than adjectives. "Don't be too strict" changes little. One pair of near-identical sentences with opposite answers shows the model exactly where the line is.

One revision that day only *removed* an example: "I am a cleaner" came out of the rejection list. Every example teaches the model something, and a bad one can do as much damage as a missing rule.

## Moderating contact details: phone numbers, emails, "call me at…"

Questions, answers and reviews have their own validator, tuned the same way in June 2025. The earlier version rejected anything that "requests personal information or contact details" or "attempts to bypass systems", which is broad enough to catch innocent questions. The revision:

- Starts from `DEFAULT: Return TRUE` and lists seven explicit violations (phone numbers, emails, physical addresses, URLs, "email me at…"-style requests to talk off the platform, threats, abuse).
- Spells out phone formats for several countries, Swedish among them: international `+46 …` style, local formats, and numbers written without spaces.
- Lists inputs that must pass: `"test"`, `"hello"`, `"aaaa"`, `"one three two four"`, short answers, and answers in any language.

`"one three two four"` is there on purpose. Spelled-out digits look a lot like an attempt to hide a number, and you want the model to separate a real phone number from a nonsense test string. If writing numbers out in words becomes a real way people slip past the moderator, add that as an explicit rule rather than leaving the model to guess.

> **Warning:** Don't put real phone numbers or emails in your prompt examples. Use obviously fake ones such as `+46 70 000 00 00` and `name@example.com`. Prompts end up in logs, repos and vendor dashboards.

## Design the pipeline so a false positive is cheap

Better prompts reduce false positives, but they never get them to zero. The rest of the fix was making each one cheap to undo:

- **Don't make the user wait.** Checking the task while the user waited made posting take several seconds. Validation now runs in the background right after the task is saved, and the API answers in well under a second.
- **A backup job.** An hourly cron re-checks any task from the last 24 hours that still has no verdict, and logs a warning, because that means the background check failed.
- **Fail open.** If the AI service is down, the task counts as valid. An outage shouldn't cancel real posts.
- **Record why.** A rejected task is cancelled with `cancel_reason = "Rejected by AI"` and the model's own explanation stored next to it. Before December 2025 that reason only went out in email and team-chat notifications, so you couldn't search past rejections.
- **Tell people politely.** The poster gets an email in English or Swedish saying the task doesn't meet the content guidelines, with a way to contact support if they think it's a mistake. It doesn't accuse them of anything.
- **One-click revert.** The admin dashboard lists every AI-cancelled task with a "Mark valid" button. A request for help with small chores around the house was cancelled this way and had to be restored by hand. That's exactly the case the button exists for.

The structured output matters here too. The validator returns `{ isValid, reason }` through a schema parser, so the reason is always there to store and show.

## Why re-test the prompt when the model behind the same name changes?

The model you call by name isn't fixed. Providers update what sits behind a name such as `gpt-4o-mini`, and OpenRouter-style gateways can route the same name to different backends. The name stays the same while the behaviour shifts, and a prompt tuned to one version can drift on the next. When the model changes, the prompt may need to change with it.

What I recommend:

- **Pin a dated model snapshot** where the provider offers one, and change it on purpose.
- **Keep a test set** of real cases from both sides: posts the moderator must reject and posts it wrongly rejected before. The "Mark valid" list is the best source of the second kind. Anonymise them first.
- **Re-run the set** whenever the model, the prompt or the provider changes, and compare results before you ship.

## Need moderation that doesn't fight your users?

I add LLM features like this to marketplaces and community apps: moderation, task enhancement, matching, and the pipeline around them that keeps mistakes cheap. See [AI integration services](/services/ai-integration) for how I work, or read the [marketplace case study](/work/helpicon-marketplace) for the rest of this marketplace's back end, payments and infrastructure, serving 10,000+ users. If your moderator is rejecting good posts, [send me the prompt](/contact) and I'll tell you where it's guessing.
