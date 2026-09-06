import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"

/**
 * The header and footer are shared by every page and by every layout
 * rendition. They read the same theme tokens as the home page, so flipping a
 * rendition in /preview restyles the chrome too rather than leaving a default
 * navbar sitting on top of a redesigned page.
 */

const NAV = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-container items-center gap-4 px-gutter">
        <Link
          href="/#home"
          className="flex-shrink-0 font-display text-sm font-bold tracking-tight transition-colors hover:text-mark"
        >
          NW
        </Link>
        {/* Scrolls rather than wraps or clips on narrow viewports; the
            scrollbar itself is hidden so it still reads as a plain nav. */}
        <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {NAV.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-shrink-0 items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border py-6">
      <div className="mx-auto max-w-container px-gutter text-center text-sm text-muted-foreground">
        <p>
          <a href="mailto:nikoweaver@gmail.com" className="underline underline-offset-4 hover:text-mark">
            nikoweaver@gmail.com
          </a>
          <span className="mx-2">&middot;</span>
          <a
            href="https://www.linkedin.com/in/niko-weaver/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-mark"
          >
            LinkedIn
          </a>
          <span className="mx-2">&middot;</span>
          <a
            href="/NikoWeaverResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-mark"
          >
            Resume
          </a>
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Niko Weaver &mdash; Mechanical Engineering Portfolio.</p>
        <p className="mt-1">
          Source code licensed under the{" "}
          <Link href="/license" className="underline underline-offset-4 hover:text-mark">
            MIT License
          </Link>
          . Trademarks and images belong to their respective owners.
        </p>
      </div>
    </footer>
  )
}
