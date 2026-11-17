// Read-only Search Console report for muhammadsafyan.com. No dependencies: the
// service-account login is a JWT signed with Node's crypto.
//
//   node scripts/search-console.mjs            # last 28 days: pages, queries, blog index status
//   node scripts/search-console.mjs --days 7
//
// Key: keys/*.json (git-ignored), a service account added in Search Console as a
// Restricted user. Search Console data lags 2–3 days.

import { createSign } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_ORIGIN = "https://muhammadsafyan.com";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

const keyFile = process.env.GSC_KEY_FILE ?? readdirSync(path.join(ROOT, "keys")).find((f) => f.endsWith(".json"));
if (!keyFile) throw new Error("No service-account key in keys/ (or set GSC_KEY_FILE)");
const key = JSON.parse(readFileSync(path.isAbsolute(keyFile) ? keyFile : path.join(ROOT, "keys", keyFile), "utf8"));

const b64url = (v) => Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
    iss: key.client_email,
    scope: SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Token request failed: ${body.error_description ?? body.error}`);
  return body.access_token;
}

const token = await accessToken();

async function api(url, body) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${json.error?.message ?? ""}`.trim());
  return json;
}

// Domain property if the service account has one, else the URL-prefix property.
const { siteEntry = [] } = await api("https://www.googleapis.com/webmasters/v3/sites");
const property = siteEntry.map((s) => s.siteUrl).find((u) => u === "sc-domain:muhammadsafyan.com" || u.startsWith(SITE_ORIGIN));
if (!property) {
  console.log(`The service account (${key.client_email}) sees: ${siteEntry.map((s) => s.siteUrl).join(", ") || "no properties"}`);
  console.log("Add it in Search Console → Settings → Users and permissions (Restricted).");
  process.exit(1);
}

const days = Number(process.argv[process.argv.indexOf("--days") + 1]) || 28;
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(Date.now() - 2 * 864e5); // data lags ~2 days
const start = new Date(end.getTime() - (days - 1) * 864e5);
const prop = encodeURIComponent(property);

async function top(dimension, rowLimit = 15) {
  const { rows = [] } = await api(`https://www.googleapis.com/webmasters/v3/sites/${prop}/searchAnalytics/query`, {
    startDate: iso(start),
    endDate: iso(end),
    dimensions: [dimension],
    rowLimit,
  });
  return rows;
}

const fmt = (r) =>
  `${String(r.impressions).padStart(6)} impr ${String(r.clicks).padStart(4)} clicks  pos ${r.position.toFixed(1).padStart(5)}  ${r.keys[0].replace(SITE_ORIGIN, "")}`;

console.log(`${property} · ${iso(start)} → ${iso(end)} (${days} days)\n`);
const pages = await top("page");
console.log("Top pages\n" + (pages.length ? pages.map(fmt).join("\n") : "  (no data yet)"));
const queries = await top("query");
console.log("\nTop searches\n" + (queries.length ? queries.map(fmt).join("\n") : "  (no data yet)"));

// Index status for every blog post in the live sitemap.
const sitemap = await (await fetch(`${SITE_ORIGIN}/sitemap.xml`)).text();
const blogUrls = [...sitemap.matchAll(/<loc>([^<]*\/blog\/[^<]+)<\/loc>/g)].map((m) => m[1]);
console.log("\nBlog posts in Google's index");
for (const url of blogUrls) {
  const { inspectionResult: r } = await api("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    inspectionUrl: url,
    siteUrl: property,
  });
  const s = r.indexStatusResult;
  console.log(`  ${(s.coverageState ?? s.verdict).padEnd(38)} last crawl ${s.lastCrawlTime?.slice(0, 10) ?? "never"}  ${url.replace(SITE_ORIGIN, "")}`);
}
