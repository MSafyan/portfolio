"use server";

import { headers } from "next/headers";
import { SITE } from "@/lib/site";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back on error: React resets the form after an action, which would
   * otherwise wipe what the visitor typed. */
  values?: Record<"name" | "email" | "service" | "budget" | "message", string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

// Per-instance only, so it slows a burst from one IP rather than being a hard cap.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT.max;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  const field = (k: string) => String(form.get(k) ?? "").trim();

  // Honeypot: hidden from people, filled in by bots. Pretend it worked.
  if (field("company_website")) return { status: "sent" };

  const name = field("name").slice(0, 120);
  const email = field("email").slice(0, 200);
  const service = field("service").slice(0, 80);
  const budget = field("budget").slice(0, 80);
  const message = field("message").slice(0, 5000);

  const values = { name, email, service, budget, message };
  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please add your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please add an email I can reply to.";
  if (message.length < 20) fieldErrors.message = "A couple of sentences about the project, please.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { status: "error", values, message: `Too many messages from this connection. Please email ${SITE.email} directly.` };
  }

  const ok = await deliver({ name, email, service: service || "—", budget: budget || "—", message });
  if (!ok) {
    return { status: "error", values, message: `Something went wrong sending your message. Please email ${SITE.email}.` };
  }

  return { status: "sent" };
}

type Enquiry = { name: string; email: string; service: string; budget: string; message: string };

// Resend when RESEND_API_KEY is set; otherwise the EmailJS account the old
// site already used (keys kept under their original VITE_ names in Vercel).
async function deliver(e: Enquiry): Promise<boolean> {
  if (process.env.RESEND_API_KEY) return sendViaResend(e, process.env.RESEND_API_KEY);
  const emailjs = {
    service: process.env.VITE_APP_EMAILJS_SERVICE_ID,
    template: process.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.VITE_APP_EMAILJS_PUBLIC_KEY,
  };
  if (emailjs.service && emailjs.template && emailjs.publicKey) {
    return sendViaEmailJs(e, emailjs as Record<keyof typeof emailjs, string>);
  }
  console.error("No email provider configured; enquiry not sent");
  return false;
}

function summary(e: Enquiry) {
  return `Service: ${e.service}\nBudget: ${e.budget}\nReply to: ${e.email}\n\n${e.message}`;
}

async function sendViaEmailJs(e: Enquiry, cfg: { service: string; template: string; publicKey: string }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin: SITE.url },
    body: JSON.stringify({
      service_id: cfg.service,
      template_id: cfg.template,
      user_id: cfg.publicKey,
      // Variable names match the template the old site's form used.
      template_params: {
        from_name: e.name,
        from_email: e.email,
        reply_to: e.email,
        to_name: SITE.name,
        to_email: process.env.CONTACT_TO ?? SITE.email,
        message: summary(e),
      },
    }),
  });
  if (!res.ok) console.error("EmailJS error", res.status, await res.text());
  return res.ok;
}

async function sendViaResend(e: Enquiry, apiKey: string) {
  const rows = [
    ["Name", e.name],
    ["Email", e.email],
    ["Service", e.service],
    ["Budget", e.budget],
  ];
  const html = `
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(e.message)}</p>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Resend's shared sender works until a custom domain is verified; set
      // RESEND_FROM to e.g. "Portfolio <hello@yourdomain.com>" after that.
      from: process.env.RESEND_FROM ?? "Portfolio enquiry <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? SITE.email],
      reply_to: e.email,
      subject: `New enquiry from ${e.name}${e.service !== "—" ? ` — ${e.service}` : ""}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${e.message}`,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
  return res.ok;
}
