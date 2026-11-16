"use client";

import { useEffect } from "react";
import { gtag, track } from "@/lib/track";

const CLARITY_ID = "zenl4evg02";
// Google tag created by Google Analytics; it carries the GA4 stream G-DQ2H393P77.
const GOOGLE_TAG_ID = "GTM-WCJM6JNH";
const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

// Google Analytics and Microsoft Clarity. Neither is needed to show the page,
// so both load on the visitor's first interaction; that keeps them out of
// page-load metrics and off visits that never interact. Events are queued
// from the start, so nothing fired before the scripts arrive is lost.
export function Analytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    gtag("js", new Date());

    const load = () => {
      TRIGGERS.forEach((t) => window.removeEventListener(t, load));
      addScript(`https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`);
      const w = window as unknown as { clarity?: ClarityFn };
      // Clarity's tag throws if its command queue doesn't exist yet.
      w.clarity ||= Object.assign((...args: unknown[]) => (w.clarity!.q ||= []).push(args), { q: [] });
      addScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
    };
    TRIGGERS.forEach((t) => window.addEventListener(t, load, { once: true, passive: true }));

    // Email links anywhere on the site. Outbound links (Upwork, LinkedIn,
    // GitHub) are already counted by GA's enhanced measurement.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='mailto:']");
      if (a) track("contact_email_click", { link_location: window.location.pathname });
    };
    document.addEventListener("click", onClick);

    return () => {
      TRIGGERS.forEach((t) => window.removeEventListener(t, load));
      document.removeEventListener("click", onClick);
    };
  }, [enabled]);
  return null;
}
