/** Lowercase a title for use mid-sentence, keeping acronyms: "Technical SEO" → "technical SEO", "AI integration" stays. */
export const midSentence = (s: string) => s.replace(/\b([A-Z])([a-z])/g, (_, a: string, b: string) => a.toLowerCase() + b);
