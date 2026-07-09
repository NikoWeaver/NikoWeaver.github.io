import "./globals.css"
import type React from "react"
import Link from "next/link"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })

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
      <body className={`${inter.className} ${spaceGrotesk.variable} min-h-screen bg-background text-foreground`}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
              <div className="container flex h-14 items-center">
                <Link href="/#home" className="ml-5 mr-6 font-display text-sm font-bold tracking-tight transition-colors hover:text-primary">
                  NW
                </Link>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                  <Link href="/#home" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    Home
                  </Link>
                  <Link href="/#projects" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    Projects
                  </Link>
                  <Link href="/#resume" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    Resume
                  </Link>
                  <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    Blog
                  </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main>{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Niko Weaver &mdash; Mechanical Engineering Portfolio.</p>
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
      </body>
    </html>
  )
}
