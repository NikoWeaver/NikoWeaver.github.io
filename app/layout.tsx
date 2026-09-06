import "./globals.css"
import type React from "react"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader, SiteFooter } from "@/components/site-chrome"
import { Suspense } from "react"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { DEFAULT_THEME } from "@/lib/themes"

// Cloudflare Web Analytics: cookieless, no consent banner required.
// Paste the beacon token from your Cloudflare dashboard here to enable it.
const CF_BEACON_TOKEN = "7424d0cd025943788eb338faf915cd55"

export const metadata = {
  title: {
    default: "Niko Weaver - Engineering Portfolio",
    template: "%s | Niko Weaver",
  },
  description: "Mechanical Engineering student at Duke University. Projects in aerospace, robotics, and controls.",
  applicationName: "Niko Weaver Portfolio",
  authors: [{ name: "Niko Weaver" }],
  keywords: ["Niko Weaver", "Mechanical Engineering", "Duke University", "Aerospace", "Robotics", "UAV", "Portfolio"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Niko Weaver - Engineering Portfolio",
    description: "Mechanical Engineering student at Duke University. Projects in aerospace, robotics, and controls.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niko Weaver - Engineering Portfolio",
    description: "Mechanical Engineering student at Duke University. Projects in aerospace, robotics, and controls.",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

// Runs before first paint. Sets light/dark (as before) and, if the /preview
// switcher has stored a layout rendition, applies that too — so there is no
// flash of the default theme while comparing renditions.
const themeScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;var p=localStorage.getItem('previewTheme');if(p){r.setAttribute('data-theme',p);}}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // The font variables must be declared on the SAME element as the theme
    // tokens that reference them (--font-body: var(--font-inter)). A custom
    // property containing var() is substituted where it is *declared*, so with
    // the faces on <body> and the tokens on <html> every --font-* resolved to
    // the guaranteed-invalid value and the whole site silently fell back to
    // system sans.
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-body min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Suspense fallback={null}>
            <SiteHeader />
            <main className="relative z-10">{children}</main>
            <SiteFooter />
          </Suspense>
        </ThemeProvider>
        <Analytics />
        {CF_BEACON_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_BEACON_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  )
}
