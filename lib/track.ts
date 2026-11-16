// Google Analytics events. Calls queue on window.dataLayer, so an event fired
// before the tag has loaded (it loads on first interaction) is still sent.
type Gtag = (...args: unknown[]) => void;

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: Gtag };
  w.dataLayer ||= [];
  w.gtag ||= function () {
    // gtag must push the arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag(...args);
}

export function track(event: string, params: Record<string, string | number> = {}) {
  gtag("event", event, params);
}
