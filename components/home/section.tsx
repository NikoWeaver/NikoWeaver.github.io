import type React from "react"
import type { Theme } from "@/lib/themes"
import { cn } from "@/lib/utils"

/**
 * One section band, with the heading treatment the active rendition asks for.
 *
 * Three treatments, all of them producing the same *information*: a label, a
 * position in the sequence, and an optional right-hand note.
 *
 *   rule    – hairline above, small tracked label at the left (Swiss, Journal,
 *             Datasheet). Follows the layer-cake scanning pattern: a clearly
 *             banded page gives the eye a reliable place to land.
 *   display – large centred heading (Gallery). Conventional, and conventional
 *             is the point in that rendition.
 *   eyebrow – [ 02 · PROJECTS ] in mono (Blueprint).
 */
export function Section({
  theme,
  id,
  index,
  label,
  note,
  labelHidden,
  children,
  className,
}: {
  theme: Theme
  id: string
  index: number
  label: string
  note?: string
  /** Keep the heading for screen readers only (used when the hero *is* the heading). */
  labelHidden?: boolean
  children: React.ReactNode
  className?: string
}) {
  const { heading, headingAlign, numbered, sectionRule } = theme.layout
  const num = String(index).padStart(2, "0")

  return (
    <section
      id={id}
      className={cn(
        "relative z-10 mx-auto w-full max-w-container px-gutter py-section",
        sectionRule && "border-t border-border",
        className,
      )}
    >
      {labelHidden ? (
        <h2 className="sr-only">{label}</h2>
      ) : heading === "display" ? (
        <header className={cn("mb-10 md:mb-14", headingAlign === "center" && "text-center")}>
          <h2 className="font-display text-h2 font-bold tracking-[var(--track-display)]">{label}</h2>
        </header>
      ) : heading === "eyebrow" ? (
        <header className="mb-8 flex items-baseline gap-3 font-meta text-xs">
          <h2 className="eyebrow font-semibold uppercase text-mark">
            [ {numbered && `${num} · `}
            {label} ]
          </h2>
          {note && <span className="text-muted-foreground">{note}</span>}
          <span aria-hidden className="ml-auto hidden select-none text-muted-foreground/50 sm:block">
            ////
          </span>
        </header>
      ) : (
        <header className="mb-8 flex items-baseline justify-between gap-4 md:mb-10">
          <h2 className="eyebrow font-meta text-xs font-semibold uppercase text-muted-foreground">
            {numbered && <span className="text-mark">{num}&nbsp;&nbsp;</span>}
            {label}
          </h2>
          {note && (
            <span className="eyebrow font-meta text-xs uppercase text-muted-foreground/70">{note}</span>
          )}
        </header>
      )}
      {children}
    </section>
  )
}

/** Corner ticks, drawn only by the Blueprint rendition. Purely decorative. */
export function CornerTicks({ theme }: { theme: Theme }) {
  if (theme.layout.decor !== "brackets") return null
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-mark" />
      <span aria-hidden className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-mark" />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-mark"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-mark"
      />
    </>
  )
}

