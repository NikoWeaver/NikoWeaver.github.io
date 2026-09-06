import { Download } from "lucide-react"
import type { Theme } from "@/lib/themes"
import { hero, resumeContact, resumeSections, resumeSkills } from "@/lib/home-content"
import { cn } from "@/lib/utils"

/**
 * The resume block.
 *
 * The content is identical in all three treatments; what changes is how much
 * chrome sits between the reader and the text.
 *
 *   card  – a bordered, shadowed panel that reads as a document on a page
 *   sheet – no container at all, the page itself is the sheet
 *   dense – tighter leading and smaller type, for the data-forward renditions
 */
export function Resume({ theme }: { theme: Theme }) {
  const mode = theme.layout.resume
  const dense = mode === "dense"

  return (
    <div
      className={cn(
        mode === "card" && "mx-auto max-w-3xl rounded-[var(--radius)] border border-border bg-card p-8 shadow-theme md:p-10",
        // Swiss keeps everything on one flush-left axis; the centred sheet
        // would break it, so "sheet" follows whatever axis the hero uses.
        mode === "sheet" && cn("max-w-3xl", theme.layout.heroAlign === "center" && "mx-auto"),
        dense && "mx-auto max-w-4xl text-sm",
      )}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-2xl font-bold tracking-[var(--track-display)] md:text-3xl">{hero.name}</p>
        <a
          href={hero.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          download
          className={cn(
            "inline-flex items-center gap-2 text-sm transition-colors",
            theme.layout.decor === "brackets"
              ? "font-meta text-mark hover:underline"
              : "rounded-[var(--radius)] border border-transparent bg-primary px-4 py-2 text-primary-foreground hover:opacity-90",
          )}
        >
          <Download className="h-4 w-4" aria-hidden />
          {theme.layout.decor === "brackets" ? "[ DOWNLOAD ]" : "Download Resume"}
        </a>
      </div>

      <p className="mb-8 break-words font-meta text-sm text-muted-foreground">
        {resumeContact.map((c, i) => (
          <span key={c.href}>
            {i > 0 && <span className="mx-2">&middot;</span>}
            <a
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hover:text-mark hover:underline"
            >
              {c.label}
            </a>
          </span>
        ))}
      </p>

      {resumeSections.map((section) => (
        <section key={section.label} className={dense ? "mb-6" : "mb-8"}>
          <h3 className="eyebrow mb-4 border-b border-border pb-2 font-meta text-xs font-semibold uppercase text-muted-foreground">
            {section.label}
          </h3>
          {section.entries.map((entry) => (
            <article key={entry.title + entry.period} className={dense ? "mb-3" : "mb-5"}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h4 className={cn("font-semibold", dense ? "text-base" : "text-lg")}>{entry.title}</h4>
                <p className="tnum font-meta text-sm text-muted-foreground">{entry.period}</p>
              </div>
              {entry.org && <p className="text-sm text-muted-foreground">{entry.org}</p>}
              <ul className={cn("mt-1 list-disc pl-5 text-muted-foreground marker:text-border", dense && "mt-0.5")}>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      ))}

      <h3 className="eyebrow mb-4 border-b border-border pb-2 font-meta text-xs font-semibold uppercase text-muted-foreground">
        Technical Skills
      </h3>
      <dl>
        {resumeSkills.map((row) => (
          <div key={row.label} className={dense ? "mb-1" : "mb-2"}>
            <dt className="inline font-semibold text-foreground">{row.label}:</dt>{" "}
            <dd className="inline text-muted-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
