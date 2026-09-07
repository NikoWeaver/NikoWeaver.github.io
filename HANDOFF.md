# Portfolio — Handoff / Developer Notes

Personal engineering portfolio for Niko Weaver. Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS** with **shadcn/ui** components.

> This file lives at the repo root and is **not** part of the website. Next.js only serves routes under `app/` and static files under `public/`, so `HANDOFF.md` is never published.

---

## Running locally

```bash
npm install        # first time only
ulimit -n 10240    # IMPORTANT on macOS — see "Gotchas" below
npm run dev        # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

---

## How the site is structured

This uses the Next.js **App Router**. Every folder inside `app/` with a `page.tsx` becomes a URL. There is no router config — the folder name *is* the route.

| File / folder | URL | What it is |
|---|---|---|
| `app/layout.tsx` | (wraps everything) | Root layout: `<html>`/`<body>`, the sticky top nav bar, theme provider, fonts, analytics. Every page renders inside this. |
| `app/page.tsx` | `/` | The home page. A three-line file: it renders `<HomeView>` with whichever rendition `DEFAULT_THEME` names. See **Layout renditions** below. |
| `app/blog/page.tsx` | `/blog` | Blog/updates page (currently UAV updates). |
| `app/uav-project/page.tsx` | `/uav-project` | UAV project detail page (includes a YouTube embed + spec tables + image gallery). |
| `app/underwater-rov/page.tsx` | `/underwater-rov` | RoboSub AUV ("Crush") project page. |
| `app/wind-tunnel-translation/page.tsx` | `/wind-tunnel-translation` | Wind tunnel robot arm page. **Client component** — loads an interactive 3D `<model-viewer>` and shows MATLAB code blocks. |
| `app/frc-robot/page.tsx` | `/frc-robot` | FRC Team 3245 robot page. |
| `app/model-rocket/page.tsx` | `/model-rocket` | Guided model rocket page. |
| `app/combat-robotics/page.tsx` | `/combat-robotics` | Combat robots page. **Note:** this page exists but is not linked from the home Projects grid — add a card in `app/page.tsx` if you want it visible. |
| `app/license/page.tsx` | `/license` | License & copyright page (MIT for the code; trademark/image disclaimer). Linked from the global footer. |
| `app/not-found.tsx` | (any unknown URL) | Custom 404 page. |
| `app/error.tsx` | (on runtime errors) | Error boundary — catches render/runtime errors and shows a friendly "try again / go home" screen instead of a crash. |
| `app/globals.css` | — | Global styles: Tailwind imports and the six `[data-theme]` token blocks (colour, type, measure, rhythm, scale) in light and dark. |
| `app/preview/page.tsx` | `/preview` | Side-by-side harness for the six layout renditions. Not linked from nav, `noindex`. |

### Other top-level pieces

| Path | What it does |
|---|---|
| `components/ui/*` | Reusable shadcn/ui primitives: `button`, `card`, `table`, `separator`, `theme-toggle`. Used across all pages. |
| `components/theme-provider.tsx` | Light/dark mode state. Stores choice in `localStorage` under the key `theme`, falls back to the OS preference. Exposes `useTheme()`. |
| `lib/utils.ts` | `cn()` helper — merges Tailwind class names (clsx + tailwind-merge). |
| `public/` | Static assets served at the site root, e.g. `public/images/3245bot.jpeg` → `/images/3245bot.jpeg`, and `public/NikoWeaverResume.pdf` → `/NikoWeaverResume.pdf`. |
| `LICENSE` | Root MIT license file (covers the source code). Mirrored on-site at `/license`. |
| `tailwind.config.ts` | Tailwind setup — maps the CSS color variables to Tailwind color names (`bg-primary`, `text-muted-foreground`, etc.). |
| `next.config.mjs` | Next config. Images are `unoptimized` (so external image URLs work without an image CDN); TS/ESLint build errors are ignored during `build`. |
| `components.json` | shadcn/ui generator config (only matters if you add more shadcn components). |

---

## Key concepts (how to edit common things)

- **Add/edit a project on the home page:** edit the `projects` array in `lib/home-content.ts`. All five renditions read it, so one edit updates the card grid, the contents list, the spec table and the feature layout at once.
- **Add a new project page:** create `app/your-project/page.tsx`. Copy an existing project page (e.g. `frc-robot`) as a template, then link to it from the home grid.
- **Images:** local files go in `public/images/` and are referenced as `/images/foo.jpg`. Many images are also hosted on Vercel Blob storage (the long `*.public.blob.vercel-storage.com` URLs) — those load directly.
- **Colors / theme:** all colors are CSS variables in `app/globals.css`, per rendition, under `[data-theme="…"]` (light) and `.dark [data-theme="…"]` (dark). Everything else references them through Tailwind.
- **The "Duke University" text** on the home hero uses `text-mark` — the single accent colour each rendition is allowed to use for meaning (`--mark`). It is Duke blue in the Gallery rendition and something else in the others.
- **Nav links** (Home / Projects / About / Resume / Blog) live in `components/site-chrome.tsx`. The Home/Projects/Resume links are in-page anchors (`/#projects`, etc.).
- **Resume content** is data in `lib/home-content.ts` (`resumeSections`, `resumeSkills`, `resumeContact`). The downloadable PDF is `public/NikoWeaverResume.pdf`.
- **Dark mode flash prevention:** `app/layout.tsx` injects a tiny inline script in `<head>` that sets the theme class before the page paints, so there's no white flash on load for dark-mode users.
- **Footer & license:** the footer is defined once in `components/site-chrome.tsx`, so it (and the copyright + MIT license link) appears on every page. The year is computed automatically. Edit the license wording in `LICENSE` and `app/license/page.tsx`.

---

## Gotchas / things to know

- **macOS `EMFILE: too many open files`** — the dev server's file watcher can exceed the default open-file limit and then return **404 for every route**. Fix: run `ulimit -n 10240` in the terminal *before* `npm run dev`. If routes 404 unexpectedly, this is almost always why.
- If the site behaves strangely after big changes, delete the build cache and restart: `rm -rf .next && npm run dev`.
- `combat-robotics` is not linked from the home page (see table above).
- There is an unused duplicate stylesheet at `styles/globals.css` and an empty `app/general-robotics-lab/` folder — neither is used by the live site; safe to ignore or delete.
- Image optimization is turned **off** (`next.config.mjs`), which is why external image URLs work but don't get resized — fine for this small site.

---

## Layout renditions (the theme system)

The home page exists in **six renditions**. They are not five pages — there is
one implementation, driven by a token object. Nothing about the site's function
changed: same sections, same order, same anchors (`#home`, `#projects`,
`#skills`, `#resume`), same links, same content.

### Where things live

| Path | What it is |
|---|---|
| `lib/home-content.ts` | **All** home-page copy: hero, the five projects, skills, resume. Every rendition renders this one array. Edit a project blurb here and it changes in all five. |
| `lib/themes.ts` | The six renditions. Each is an id, a label, a design thesis, its sources, and a `layout` object of *structural* choices. `DEFAULT_THEME` at the bottom is the one the live site ships. |
| `lib/fonts.ts` | The only file that names a typeface. Four humanist faces (Fira Sans, Alegreya, Fraunces, Fira Mono), exposed as CSS variables. |
| `app/globals.css` | A `[data-theme="…"]` block per rendition holding every *cosmetic* decision — colour, which face plays which role, measure, rhythm, type scale, radius, shadow. |
| `components/home/*` | The single implementation. `home-view.tsx` is the page; `projects.tsx`, `skills.tsx`, `resume.tsx` each contain the two-to-four arrangements a token can select. |
| `components/theme-lab.tsx` + `app/preview/page.tsx` | The `/preview` comparison harness. Not linked from nav, `noindex`. |

### Switching between them

**To look at them:** `npm run dev`, then <http://localhost:3000/preview>. Press
**1–6**, or use the bar at the bottom. The chevron opens the design rationale
and sources for whichever one is showing.

The choice is written to `localStorage.previewTheme` and re-applied before
paint by the inline script in `app/layout.tsx`, so it sticks while you browse
the rest of the site — the header, footer and every inner page restyle with it.
The circular-arrow button in the bar clears it.

**To ship one:** change one line.

```ts
// lib/themes.ts
export const DEFAULT_THEME: ThemeId = "deployed"   // ← swap for any of the six ids
```

### The six

| id | Name | Argument |
|---|---|---|
| `deployed` | Current | The layout already live, re-typeset in Fraunces over Fira Sans, with the per-project tag pills removed. This is what `DEFAULT_THEME` currently points at. |
| `swiss` | Grid | Modular grid, one grotesque, one red accent, flush-left axis, numbered sections. Cards. |
| `editorial` | Journal | Serif on warm paper, a real 45–75 character measure, projects as a numbered contents list. |
| `datasheet` | Datasheet | Maximum data-ink. Projects become a spec table whose columns are what a reader compares; headline figures under the name. |
| `gallery` | Gallery | The most conventional portfolio shape on purpose — centred hero, one large lead project, generous whitespace, Duke blue. |
| `console` | Blueprint | Dark-first drawing sheet. Monospace throughout, faint construction grid, corner ticks, bracketed labels. |

Each carries its own `thesis` and `sources` in `lib/themes.ts`, and those are
what `/preview` displays.

### Adding another

1. Add its id to `ThemeId` and an entry to `THEMES` in `lib/themes.ts`.
2. Add `[data-theme="yourid"]` and `.dark [data-theme="yourid"]` blocks in
   `app/globals.css`.

No component changes are needed unless you want a genuinely new arrangement —
in which case add a case to the switch in `components/home/projects.tsx` (or
`skills.tsx` / `resume.tsx`) and a value to the corresponding union type.

### Typography

`lib/fonts.ts` loads four **humanist** faces — ones whose skeletons come from
Renaissance pen forms rather than the compass, which is what makes text read as
written rather than generated:

- **Fira Sans** (Spiekermann & Carrois) — the workhorse sans
- **Alegreya** (Huerta Tipográfica) — the literary serif; ATypI "Fonts of the
  Decade", TDC Certificate of Excellence
- **Fraunces** — a soft, deliberately irregular old-style display face
- **Fira Mono** — Fira Sans's own monospace companion

Each rendition assigns them to `--font-body`, `--font-display` and
`--font-meta` in `globals.css`. Changing a face anywhere on the site is one
edit in `lib/fonts.ts`.

> **Note on `<html>` vs `<body>`:** the `next/font` variable classes must sit on
> `<html>`, the same element as the theme tokens that reference them. A custom
> property whose value contains `var()` is substituted where it is *declared* —
> put the faces on `<body>` and every `--font-*` resolves to the
> guaranteed-invalid value, and the whole site silently falls back to system
> sans with no error anywhere.

---

## Tech stack summary

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 + Tailwind CSS + shadcn/ui (Radix primitives)
- **Icons:** lucide-react
- **3D:** `@google/model-viewer` (loaded via CDN on the wind tunnel page)
- **Analytics:** `@vercel/analytics`
- **Deploy target:** Vercel
