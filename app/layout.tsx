import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { graph, siteGraph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1013" },
  ],
};

// Runs before first paint, so the page never flashes the wrong theme. A choice made with the toggle
// wins; otherwise the system setting, followed live; light if the browser reports neither.
const themeScript = `(function(){var d=document.documentElement,m=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)");function s(){try{return localStorage.getItem("theme")}catch(e){}}function a(){var t=s();d.dataset.theme=t==="dark"||t==="light"?t:m&&m.matches?"dark":"light"}a();m&&m.addEventListener&&m.addEventListener("change",a)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <JsonLd data={graph(...siteGraph())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics enabled={process.env.VERCEL_ENV === "production"} />
      </body>
    </html>
  );
}
