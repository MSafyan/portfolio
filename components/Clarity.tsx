import Script from "next/script";

const PROJECT_ID = "zenl4evg02";

// Microsoft Clarity (heatmaps, session recordings). Production only, so
// local and preview visits don't pollute the data, and lazyOnload so it
// starts after the page has loaded and never affects LCP or blocking time.
export function Clarity() {
  if (process.env.VERCEL_ENV !== "production") return null;
  return (
    <Script id="clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${PROJECT_ID}");`}
    </Script>
  );
}
