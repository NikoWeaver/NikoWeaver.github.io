/**
 * The five layout renditions.
 *
 * A "theme" here is NOT just a palette. It is a design system: colour, type,
 * measure, rhythm and a small number of *structural* choices about how the
 * same content is arranged. Everything cosmetic lives in CSS custom properties
 * (see the `[data-theme="…"]` blocks in `app/globals.css`); everything
 * structural lives in the `layout` object below and is read by the components
 * in `components/home/`.
 *
 * HOW TO SWITCH
 *   • Interactively: run the site and open /preview — a bar lets you flip
 *     between all five live. The choice is stored in localStorage and applies
 *     to the whole site while you browse.
 *   • Permanently: change DEFAULT_THEME at the bottom of this file. That is
 *     the single line that promotes a rendition to the real home page.
 *
 * HOW TO ADD A SIXTH
 *   1. Add its id to ThemeId.
 *   2. Add an entry to THEMES here.
 *   3. Add a `[data-theme="yourid"]` block (and a `.dark [data-theme="yourid"]`
 *      block) in app/globals.css.
 *   No component changes are needed unless you want a new structural layout.
 */

export type ThemeId = "swiss" | "editorial" | "datasheet" | "gallery" | "console"

/** How the five projects are arranged. */
export type ProjectsLayout =
  | "grid" // equal cards on a modular grid
  | "index" // a numbered contents list, thumbnail at the right
  | "table" // a spec table; the quantified result is a column
  | "feature" // one large lead project, the rest smaller

/** How the skills inventory is arranged. */
export type SkillsLayout =
  | "chips" // logo + name + detail tiles, wrapped
  | "columns" // group label in a left column, names as running text
  | "table" // group per row, dense

/** How the resume block is arranged. */
export type ResumeLayout =
  | "card" // bordered card sitting on the page
  | "sheet" // full-measure sheet, hairline rules, no container chrome
  | "dense" // tight leading, tabular alignment, minimum ink

export interface Theme {
  id: ThemeId
  /** Shown in the /preview switcher. */
  label: string
  /** One line on what the rendition is optimising for. */
  tagline: string
  /** The design argument, and the research it comes from. */
  thesis: string
  sources: string[]
  layout: {
    projects: ProjectsLayout
    skills: SkillsLayout
    resume: ResumeLayout
    /** Hero text alignment. */
    heroAlign: "left" | "center"
    /** Show the four headline metrics under the hero. */
    showMetrics: boolean
    /** Use the long lede instead of the one-line summary. */
    useLede: boolean
    /** Prefix section headings and project entries with 01 / 02 / 03… */
    numbered: boolean
    /** Section heading treatment. */
    heading: "rule" | "display" | "eyebrow"
    /** Section headings centred (only meaningful for "display"). */
    headingAlign: "left" | "center"
    /** Draw the hairline divider between sections. */
    sectionRule: boolean
    /** Surface decoration: "brackets" draws corner ticks and [bracketed]
     *  labels, the way a drawing sheet marks its frames. */
    decor: "none" | "brackets"
  }
}

export const THEMES: Record<ThemeId, Theme> = {
  swiss: {
    id: "swiss",
    label: "01 — Grid",
    tagline: "International Typographic Style: one grid, one sans, one accent.",
    thesis:
      "Everything hangs off a visible modular grid and a single flush-left axis. Müller-Brockmann's argument is that making the structure explicit is itself the communication; Tschichold's is that an asymmetric, flush-left layout reads faster than a centred one because the eye always knows where the next line starts. Section numbers give the page a spine, and one red accent is the only colour that ever means anything — so when it appears, it is information rather than decoration.",
    sources: [
      "Josef Müller-Brockmann, Grid Systems in Graphic Design (1981)",
      "Jan Tschichold, Die neue Typographie (1928)",
      "Emil Ruder, Typographie: A Manual of Design (1967)",
      "Massimo Vignelli, The Vignelli Canon (2010)",
    ],
    layout: {
      projects: "grid",
      skills: "columns",
      resume: "sheet",
      heroAlign: "left",
      showMetrics: false,
      useLede: false,
      numbered: true,
      heading: "rule",
      headingAlign: "left",
      sectionRule: true,
      decor: "none",
    },
  },

  editorial: {
    id: "editorial",
    label: "02 — Journal",
    tagline: "Print-editorial: a real measure, a serif face, a contents page.",
    thesis:
      "Body prose is held to Bringhurst's 45–75 character measure with 1.4–1.5 leading, because a line the eye can traverse without losing its place is the single biggest readability lever available. Projects become a numbered contents list rather than a card grid — which is what NN/g's eyetracking calls a layer-cake: fixations land on headings and subheadings, so a page built as a stack of clearly-labelled bands is the easiest kind to scan successfully. Warm paper ground and a serif display face lower the perceived visual complexity that Tuch et al. found people penalise within 17 ms.",
    sources: [
      "Robert Bringhurst, The Elements of Typographic Style (1992)",
      "Ellen Lupton, Thinking with Type (2004)",
      "Pernice & Whitenton, Text Scanning Patterns: Eyetracking Evidence, NN/g (2019)",
      "Tuch et al., IJHCS 70(11) (2012)",
    ],
    layout: {
      projects: "index",
      skills: "columns",
      resume: "sheet",
      heroAlign: "left",
      showMetrics: false,
      useLede: true,
      numbered: true,
      heading: "rule",
      headingAlign: "left",
      sectionRule: true,
      decor: "none",
    },
  },

  datasheet: {
    id: "datasheet",
    label: "03 — Datasheet",
    tagline: "Maximum data-ink: the numbers are the layout.",
    thesis:
      "Tufte's rule — above all else, show the data; erase non-data ink — applied to a portfolio. The decorative image-on-top card is the chartjunk here, so projects become a table whose columns are the things a reader is actually comparing: domain, quantified result, stack, date. Four headline figures sit under the name because preattentive processing (Ware) picks large high-contrast numerals out of a page before any reading happens. Density is deliberate: a scannable table is lower cognitive load than five prose paragraphs, not higher.",
    sources: [
      "Edward Tufte, The Visual Display of Quantitative Information (1983)",
      "Colin Ware, Information Visualization: Perception for Design (2000)",
      "Miller, The Magical Number Seven, Plus or Minus Two (1956)",
      "Palmer & Rock, Uniform connectedness (1994)",
    ],
    layout: {
      projects: "table",
      skills: "table",
      resume: "dense",
      heroAlign: "left",
      showMetrics: true,
      useLede: false,
      numbered: true,
      heading: "rule",
      headingAlign: "left",
      sectionRule: true,
      decor: "none",
    },
  },

  gallery: {
    id: "gallery",
    label: "04 — Gallery",
    tagline: "Prototypical and low-complexity: engineered for the 50 ms verdict.",
    thesis:
      "Lindgaard et al. showed visual-appeal judgements are formed in 50 ms and barely move afterwards; Tuch et al. showed the two levers at that timescale are low visual complexity and high prototypicality — a page that looks like what its category is supposed to look like. So this rendition deliberately does not innovate on structure: centred hero, one large lead project, a clean two-up below, one saturated accent (Duke blue), generous whitespace, soft radii. Reber's processing-fluency account explains why that reads as 'good design' rather than 'boring': fluent processing is itself experienced as pleasure, and Kurosu/Kashimura and Tractinsky's aesthetic-usability work says that impression then transfers to how usable the work looks.",
    sources: [
      "Lindgaard et al., Behaviour & Information Technology 25(2) (2006)",
      "Tuch et al., IJHCS 70(11) (2012)",
      "Reber, Schwarz & Winkielman, Processing Fluency and Aesthetic Pleasure (2004)",
      "Kurosu & Kashimura (1995); Tractinsky et al. (2000)",
    ],
    layout: {
      projects: "feature",
      skills: "chips",
      resume: "card",
      heroAlign: "center",
      showMetrics: true,
      useLede: true,
      numbered: false,
      heading: "display",
      headingAlign: "center",
      sectionRule: false,
      decor: "none",
    },
  },

  console: {
    id: "console",
    label: "05 — Blueprint",
    tagline: "Dark-first technical drawing: monospace, visible construction lines.",
    thesis:
      "The high-personality option, and the one with the most risk attached. It borrows the visual language of the drawing sheet and the terminal — monospace throughout, a faint construction grid, corner ticks, bracketed labels — so that the page signals the domain before a word is read. Loewy's MAYA rule is the guardrail: it stays advanced-yet-acceptable by keeping the underlying information architecture completely conventional, so novelty lives in the surface and never in the navigation. Gestalt common-region does the grouping: every block is a drawn enclosure, which is a stronger grouping cue than whitespace alone.",
    sources: [
      "Raymond Loewy, Never Leave Well Enough Alone (1951) — the MAYA principle",
      "Palmer, Common region: a new principle of perceptual grouping (1992)",
      "Armin Hofmann, Graphic Design Manual (1965)",
      "Don Norman, The Design of Everyday Things (1988/2013)",
    ],
    layout: {
      projects: "grid",
      skills: "table",
      resume: "dense",
      heroAlign: "left",
      showMetrics: true,
      useLede: false,
      numbered: true,
      heading: "eyebrow",
      headingAlign: "left",
      sectionRule: true,
      decor: "brackets",
    },
  },
}

export const THEME_ORDER: ThemeId[] = ["swiss", "editorial", "datasheet", "gallery", "console"]

/**
 * The rendition the live site uses. Change this one value to promote any of
 * the five to the real home page — nothing else needs to move.
 */
export const DEFAULT_THEME: ThemeId = "swiss"

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && value in THEMES
}
