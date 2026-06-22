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
| `app/page.tsx` | `/` | The home page: hero, About Me, Projects grid, scrolling Skills strip, and the Resume section. |
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
| `app/globals.css` | — | Global styles: Tailwind imports, the color theme (light/dark CSS variables), the skills marquee animation, smooth-scroll behavior. |

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

- **Add/edit a project card on the home page:** edit the Projects grid in `app/page.tsx`. Each card is a `<Card>` wrapping a `<Link href="/your-route">` with an `<Image>`, title, and description.
- **Add a new project page:** create `app/your-project/page.tsx`. Copy an existing project page (e.g. `frc-robot`) as a template, then link to it from the home grid.
- **Images:** local files go in `public/images/` and are referenced as `/images/foo.jpg`. Many images are also hosted on Vercel Blob storage (the long `*.public.blob.vercel-storage.com` URLs) — those load directly.
- **Colors / theme:** all colors are CSS variables in `app/globals.css` under `:root` (light) and `.dark` (dark). Change them there; everything else references them through Tailwind. The palette is intentionally grayscale/monochrome.
- **The blue "Duke University" text** on the home hero is a one-off inline color (`text-[#00539B]`) in `app/page.tsx`, not part of the theme.
- **Nav links** (Home / Projects / Resume / Blog) live in `app/layout.tsx`. The Home/Projects/Resume links are in-page anchors (`/#projects`, etc.).
- **Resume content** is hand-written JSX inside the Resume section of `app/page.tsx`. The downloadable PDF is `public/NikoWeaverResume.pdf`.
- **Dark mode flash prevention:** `app/layout.tsx` injects a tiny inline script in `<head>` that sets the theme class before the page paints, so there's no white flash on load for dark-mode users.
- **Footer & license:** the footer is defined once in `app/layout.tsx`, so it (and the copyright + MIT license link) appears on every page. The year is computed automatically. Edit the license wording in `LICENSE` and `app/license/page.tsx`.

---

## Gotchas / things to know

- **macOS `EMFILE: too many open files`** — the dev server's file watcher can exceed the default open-file limit and then return **404 for every route**. Fix: run `ulimit -n 10240` in the terminal *before* `npm run dev`. If routes 404 unexpectedly, this is almost always why.
- If the site behaves strangely after big changes, delete the build cache and restart: `rm -rf .next && npm run dev`.
- `combat-robotics` is not linked from the home page (see table above).
- There is an unused duplicate stylesheet at `styles/globals.css` and an empty `app/general-robotics-lab/` folder — neither is used by the live site; safe to ignore or delete.
- Image optimization is turned **off** (`next.config.mjs`), which is why external image URLs work but don't get resized — fine for this small site.

---

## Tech stack summary

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 + Tailwind CSS + shadcn/ui (Radix primitives)
- **Icons:** lucide-react
- **3D:** `@google/model-viewer` (loaded via CDN on the wind tunnel page)
- **Analytics:** `@vercel/analytics`
- **Deploy target:** Vercel
