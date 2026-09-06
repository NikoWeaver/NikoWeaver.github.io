import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Theme } from "@/lib/themes"
import { projects, type Project } from "@/lib/home-content"
import { cn } from "@/lib/utils"
import { CornerTicks, TechTags } from "./section"

/**
 * The five projects, arranged four different ways from one array.
 *
 * Every layout carries the same links and the same information; what changes
 * is which facet is given the strongest visual weight — the image (grid,
 * feature), the title sequence (index), or the quantified result (table).
 */
export function Projects({ theme }: { theme: Theme }) {
  switch (theme.layout.projects) {
    case "index":
      return <ProjectIndex theme={theme} />
    case "table":
      return <ProjectTable theme={theme} />
    case "feature":
      return <ProjectFeature theme={theme} />
    default:
      return <ProjectGrid theme={theme} />
  }
}

function num(i: number) {
  return String(i + 1).padStart(2, "0")
}

/* ------------------------------------------------------------------ grid --
   Equal cards on a modular grid. No shadow unless the theme asks for one; the
   border does the grouping work (uniform connectedness beats proximity alone
   for saying "these belong together").                                      */
function ProjectGrid({ theme }: { theme: Theme }) {
  const bracket = theme.layout.decor === "brackets"
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <li key={p.href} className="relative">
          <CornerTicks theme={theme} />
          <Link
            href={p.href}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-theme transition-colors hover:border-foreground"
          >
            <div className={cn("relative aspect-video", p.containImage && "bg-muted")}>
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={p.containImage ? "object-contain p-8" : "object-cover"}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow font-meta text-xs uppercase text-muted-foreground">
                {theme.layout.numbered && <span className="text-mark">{num(i)}&nbsp;&nbsp;</span>}
                {p.domain}
              </p>
              <h3 className="mt-2 font-display text-h3 font-semibold tracking-tight">
                {bracket ? `> ${p.title}` : p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>
              <TechTags tags={p.tags} theme={theme} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ----------------------------------------------------------------- index --
   A contents page. Rows of number / title / blurb, with a small thumbnail at
   the right. Headings stack into the horizontal bands the eye is already
   looking for when it scans.                                                */
function ProjectIndex({ theme }: { theme: Theme }) {
  return (
    <ol className="border-t border-border">
      {projects.map((p, i) => (
        <li key={p.href} className="border-b border-border">
          <Link href={p.href} className="group flex items-start gap-5 py-7 md:gap-8 md:py-9">
            {theme.layout.numbered && (
              <span className="tnum mt-1 hidden w-8 flex-shrink-0 font-meta text-sm text-mark sm:block">
                {num(i)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h3 className="font-display text-h3 font-semibold tracking-tight group-hover:text-mark">{p.title}</h3>
                <span className="eyebrow font-meta text-xs uppercase text-muted-foreground">
                  {p.domain} &middot; {p.period}
                </span>
              </div>
              <p className="mt-2 max-w-measure text-muted-foreground">{p.blurb}</p>
              <TechTags tags={p.tags} theme={theme} />
            </div>
            <div
              className={cn(
                "relative hidden h-24 w-36 flex-shrink-0 overflow-hidden rounded-[var(--radius)] border border-border sm:block",
                p.containImage && "bg-muted",
              )}
            >
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="144px"
                className={p.containImage ? "object-contain p-3" : "object-cover"}
              />
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}

/* ----------------------------------------------------------------- table --
   Maximum data-ink. The decorative photograph is the chartjunk here, so it is
   erased and the column a reader would actually compare — the measured result
   — is promoted to its own field. Scrolls horizontally on narrow screens
   rather than reflowing, so the columns stay comparable.                     */
function ProjectTable({ theme }: { theme: Theme }) {
  return (
    <div className="-mx-gutter overflow-x-auto px-gutter">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">Selected engineering projects</caption>
        <thead>
          <tr className="border-y border-border">
            {["", "Project", "Domain", "Result", "Stack", "Period"].map((h, i) => (
              <th
                key={i}
                scope="col"
                className="eyebrow whitespace-nowrap py-2 pr-6 font-meta text-[0.6875rem] font-semibold uppercase text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p, i) => (
            <tr key={p.href} className="group border-b border-border align-top hover:bg-muted">
              <td className="tnum py-4 pr-4 font-meta text-xs text-mark">{num(i)}</td>
              <td className="py-4 pr-6">
                <Link href={p.href} className="font-display text-h3 font-semibold group-hover:text-mark">
                  {p.title}
                  <ArrowRight
                    aria-hidden
                    className="ml-1.5 inline h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
                <p className="mt-1 max-w-[38ch] text-sm text-muted-foreground">{p.blurb}</p>
              </td>
              <td className="whitespace-nowrap py-4 pr-6 font-meta text-xs text-muted-foreground">{p.domain}</td>
              <td className="tnum py-4 pr-6 text-sm font-medium text-foreground">{p.result}</td>
              <td className="py-4 pr-6 font-meta text-xs text-muted-foreground">{p.tags.join(", ")}</td>
              <td className="tnum whitespace-nowrap py-4 font-meta text-xs text-muted-foreground">{p.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* --------------------------------------------------------------- feature --
   One lead project at full width, four beneath it. The most conventional
   portfolio arrangement there is, chosen deliberately: at a 50 ms glance,
   prototypicality is one of only two variables that move the verdict.        */
function ProjectFeature({ theme }: { theme: Theme }) {
  const [lead, ...rest] = projects
  return (
    <div className="space-y-8">
      <FeatureCard project={lead} theme={theme} />
      <ul className="grid gap-8 sm:grid-cols-2">
        {rest.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-theme transition-shadow hover:shadow-lg"
            >
              <div className={cn("relative aspect-[16/10]", p.containImage && "bg-muted")}>
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className={cn(
                    "transition-transform duration-500 group-hover:scale-[1.03]",
                    p.containImage ? "object-contain p-10" : "object-cover",
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow font-meta text-xs uppercase text-muted-foreground">{p.domain}</p>
                <h3 className="mt-2 font-display text-h3 font-semibold tracking-tight group-hover:text-mark">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>
                <TechTags tags={p.tags} theme={theme} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeatureCard({ project: p, theme }: { project: Project; theme: Theme }) {
  return (
    <Link
      href={p.href}
      className="group grid overflow-hidden rounded-[var(--radius)] border border-border bg-card shadow-theme transition-shadow hover:shadow-lg lg:grid-cols-2"
    >
      <div className={cn("relative aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]", p.containImage && "bg-muted")}>
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className={cn(
            "transition-transform duration-500 group-hover:scale-[1.03]",
            p.containImage ? "object-contain p-12" : "object-cover",
          )}
        />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="eyebrow font-meta text-xs uppercase text-mark">Featured &middot; {p.domain}</p>
        <h3 className="mt-3 font-display text-h2 font-bold tracking-[var(--track-display)] group-hover:text-mark">
          {p.title}
        </h3>
        <p className="mt-4 max-w-measure text-muted-foreground">{p.blurb}</p>
        <p className="tnum mt-4 text-sm font-medium">{p.result}</p>
        <TechTags tags={p.tags} theme={theme} />
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-mark">
          View project
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
