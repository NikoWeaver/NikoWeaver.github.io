import "./globals.css"
import type React from "react"
import Link from "next/link"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Suspense } from "react"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

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
    { media: "(prefers-color-scheme: light)", color: "#f9f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#14161a" },
  ],
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Suspense fallback={null}>
            <header className="site-header sticky top-0 z-50 w-full border-b backdrop-blur">
              <div className="header-inner">
                <nav aria-label="Main navigation" className="site-nav">
                  <Link href="/#home" className="transition-colors">
                    Home
                  </Link>
                  <Link href="/#projects" className="transition-colors">
                    Projects
                  </Link>
                  <Link href="/about" className="transition-colors">
                    About
                  </Link>
                  <Link href="/#resume" className="transition-colors">
                    Resume
                  </Link>
                  <Link href="/blog" className="transition-colors">
                    Blog
                  </Link>
                </nav>
                <div className="theme-control ml-auto flex items-center">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main id="main-content" tabIndex={-1}>{children}</main>
            <footer className="site-footer border-t py-8">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p className="footer-links flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <a href="mailto:nikoweaver@gmail.com" className="underline underline-offset-4 hover:text-primary">
                    nikoweaver@gmail.com
                  </a>
                  <span className="mx-2">&middot;</span>
                  <a
                    href="https://www.linkedin.com/in/niko-weaver/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    LinkedIn
                  </a>
                  <span className="mx-2">&middot;</span>
                  <a
                    href="/NikoWeaverResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Resume
                  </a>
                </p>
                <p className="mt-2">&copy; {new Date().getFullYear()} Niko Weaver &mdash; Mechanical Engineering Portfolio.</p>
                <p className="mt-1">
                  Source code licensed under the{" "}
                  <Link href="/license" className="underline underline-offset-4 hover:text-primary">
                    MIT License
                  </Link>
                  . Trademarks and images belong to their respective owners.
                </p>
              </div>
            </footer>
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
