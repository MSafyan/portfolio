"use client";

import { useEffect } from "react";

const PROJECT_ID = "zenl4evg02";
const TRIGGERS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

// Microsoft Clarity (heatmaps, session recordings). Loads on the visitor's
// first interaction rather than on page load: it adds third-party cookies
// and a script nobody needs to see the page, so a visitor who never
// scrolls or taps never downloads it.
export function Clarity({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const load = () => {
      TRIGGERS.forEach((t) => window.removeEventListener(t, load));
      const w = window as unknown as { clarity?: ClarityFn };
      // The command queue must exist before the tag runs, or it throws.
      w.clarity ||= Object.assign((...args: unknown[]) => (w.clarity!.q ||= []).push(args), { q: [] });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
      document.head.appendChild(s);
    };
    TRIGGERS.forEach((t) => window.addEventListener(t, load, { once: true, passive: true }));
    return () => TRIGGERS.forEach((t) => window.removeEventListener(t, load));
  }, [enabled]);
  return null;
}
