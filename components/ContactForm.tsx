"use client";

import { useActionState, useEffect } from "react";
import { track } from "@/lib/track";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { SERVICES } from "@/lib/services";

const BUDGETS = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];

const input =
  "mt-2 block w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });

  // GA4's recommended event for a lead, so it can be marked as a key event.
  useEffect(() => {
    if (state.status === "sent") track("generate_lead", { form: "contact" });
  }, [state.status]);

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-surface p-8">
        <p className="font-serif text-3xl font-medium tracking-tight">Thanks — message received.</p>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          I&rsquo;ll reply to the email you gave, usually with a few questions or a short plan.
        </p>
      </div>
    );
  }

  const err = pending ? {} : (state.fieldErrors ?? {});
  const v = state.values;

  return (
    <form action={action} noValidate className="grid gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={err.name}>
          <input id="name" name="name" defaultValue={v?.name} autoComplete="name" required className={input} aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} />
        </Field>
        <Field label="Email" name="email" error={err.email}>
          <input id="email" name="email" type="email" defaultValue={v?.email} autoComplete="email" required className={input} aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you need?" name="service">
          <select id="service" name="service" className={input} defaultValue={v?.service ?? ""}>
            <option value="">Choose one (optional)</option>
            {SERVICES.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
            <option>Something else</option>
          </select>
        </Field>
        <Field label="Budget" name="budget">
          <select id="budget" name="budget" className={input} defaultValue={v?.budget ?? ""}>
            <option value="">Optional</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="About the project" name="message" error={err.message}>
        <textarea
          id="message"
          name="message"
          defaultValue={v?.message}
          rows={6}
          required
          placeholder="What you're building, what exists today, and what's blocking you."
          className={input}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !pending && (
        <p role="alert" className="rounded-xl bg-accent-soft px-4 py-3 text-sm font-medium">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-muted">Your details are only used to reply to you.</p>
      </div>
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
