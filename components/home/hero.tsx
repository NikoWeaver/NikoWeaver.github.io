import { Mail, Phone, Linkedin, Download } from "lucide-react"
import type { Theme } from "@/lib/themes"
import { contacts, hero, metrics } from "@/lib/home-content"
import { cn } from "@/lib/utils"

const ICONS = { phone: Phone, linkedin: Linkedin, mail: Mail } as const

/**
 * The introduction.
 *
 * Fixed content, four token-driven decisions: alignment, whether the long lede
 * replaces the one-liner, whether the headline figures appear, and whether
 * labels are bracketed.
 *
 * The name is an <h1> at --h1, which every rendition sets to a clamp() with a
 * viewport term — so the largest thing on the page is always the one thing a
 * visitor is trying to identify in the first fixation.
 */
export function Hero({ theme }: { theme: Theme }) {
  const { heroAlign, showMetrics, useLede, decor } = theme.layout
  const centered = heroAlign === "center"
  const bracket = decor === "brackets"

  return (
    <section
      id="home"
      className={cn(
        "relative z-10 mx-auto w-full max-w-container px-gutter pb-section pt-16 md:pt-24",
        centered && "text-center",
      )}
    >
      {bracket && (
        <p className="mb-4 font-meta text-xs uppercase tracking-[var(--track-eyebrow)] text-mark">
          [ 01 · IDENTIFICATION ]
        </p>
      )}

      <h1 className="font-display text-h1 font-bold tracking-[var(--track-display)] text-foreground">{hero.name}</h1>

      <p className={cn("mt-4 text-lead text-muted-foreground", centered && "mx-auto")}>
        {hero.role} at <span className="font-medium text-mark">{hero.school}</span>
      </p>

      <p
        className={cn(
          "mt-4 max-w-measure text-muted-foreground",
          centered && "mx-auto",
        )}
      >
        {useLede ? hero.lede : hero.summary}
      </p>

      <ul className={cn("mt-8 flex flex-wrap gap-2.5", centered && "justify-center")}>
        {contacts.map(({ kind, href, label, external }) => {
          const Icon = ICONS[kind]
          return (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "inline-flex items-center gap-2 text-sm transition-colors",
                  bracket
                    ? "font-meta text-muted-foreground hover:text-mark"
                    : "rounded-[var(--radius)] border border-border px-4 py-2 text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {bracket ? `[ ${label} ]` : label}
              </a>
            </li>
          )
        })}
        <li>
          <a
            href={hero.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={cn(
              "inline-flex items-center gap-2 text-sm transition-colors",
              bracket
                ? "font-meta text-mark hover:underline"
                : "rounded-[var(--radius)] border border-transparent bg-primary px-4 py-2 text-primary-foreground hover:opacity-90",
            )}
          >
            <Download className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {bracket ? "[ RESUME.PDF ]" : "Resume"}
          </a>
        </li>
      </ul>

      {showMetrics && (
        // Large numerals read preattentively — they are picked out of the page
        // before any word is decoded, so the four things worth remembering go
        // here rather than into the prose above.
        <dl
          className={cn(
            "mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 md:grid-cols-4",
            centered && "text-center",
          )}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="tnum block font-display text-3xl font-bold tracking-[var(--track-display)] text-mark md:text-4xl">
                  {m.value}
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
