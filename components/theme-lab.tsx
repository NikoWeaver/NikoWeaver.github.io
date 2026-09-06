"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronDown, RotateCcw } from "lucide-react"
import { HomeView } from "@/components/home/home-view"
import { DEFAULT_THEME, THEMES, THEME_ORDER, isThemeId, type ThemeId } from "@/lib/themes"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "previewTheme"

/**
 * The comparison harness for the five layout renditions.
 *
 * It swaps two things at once:
 *   1. `data-theme` on <html>, which switches every CSS custom property — so
 *      the header, footer and any other page you navigate to change with it.
 *   2. The `theme` object handed to <HomeView>, which switches the structural
 *      choices (project layout, skills layout, resume layout).
 *
 * The choice is written to localStorage and re-applied before paint by the
 * inline script in app/layout.tsx, so it survives navigation and reloads.
 * Press 1–5 to flip between renditions.
 */
export function ThemeLab() {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME)
  const [notesOpen, setNotesOpen] = useState(false)

  const apply = useCallback((id: ThemeId) => {
    setActive(id)
    document.documentElement.setAttribute("data-theme", id)
    try {
      window.localStorage.setItem(STORAGE_KEY, id)
    } catch {
      /* private mode — the switcher still works for this page view */
    }
  }, [])

  const reset = useCallback(() => {
    setActive(DEFAULT_THEME)
    document.documentElement.setAttribute("data-theme", DEFAULT_THEME)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  // Pick up whatever the pre-paint script already applied.
  useEffect(() => {
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    if (isThemeId(stored)) setActive(stored)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const i = Number(e.key)
      if (i >= 1 && i <= THEME_ORDER.length) apply(THEME_ORDER[i - 1])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [apply])

  const theme = THEMES[active]

  return (
    <>
      <HomeView theme={theme} />

      {/* Switcher. Fixed to the bottom so it never disturbs the layout it is
          being used to judge. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-3 sm:p-4">
        <div className="pointer-events-auto w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900/95 text-neutral-100 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-center gap-1 p-2">
            {THEME_ORDER.map((id, i) => (
              <button
                key={id}
                type="button"
                onClick={() => apply(id)}
                aria-pressed={active === id}
                className={cn(
                  "flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  active === id ? "bg-neutral-100 text-neutral-900" : "text-neutral-300 hover:bg-neutral-800",
                )}
              >
                <span className="tabular-nums opacity-60">{i + 1}</span> {THEMES[id].label.replace(/^\d+ — /, "")}
              </button>
            ))}
            <button
              type="button"
              onClick={reset}
              title={`Reset to the shipped default (${THEMES[DEFAULT_THEME].label})`}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Reset to default</span>
            </button>
            <button
              type="button"
              onClick={() => setNotesOpen((v) => !v)}
              aria-expanded={notesOpen}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", notesOpen && "rotate-180")} />
              <span className="sr-only">Toggle design notes</span>
            </button>
          </div>

          <div className="border-t border-neutral-800 px-3 py-2.5 text-xs text-neutral-400">
            <p className="text-neutral-200">{theme.tagline}</p>
            {notesOpen && (
              <div className="mt-3 space-y-3">
                <p className="leading-relaxed">{theme.thesis}</p>
                <div>
                  <p className="mb-1 font-medium uppercase tracking-widest text-neutral-500">Sources</p>
                  <ul className="space-y-0.5">
                    {theme.sources.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-neutral-500">
                  Press 1&ndash;5 to switch. The choice persists across the whole site until you reset it. To ship one,
                  set <code className="text-neutral-300">DEFAULT_THEME</code> in{" "}
                  <code className="text-neutral-300">lib/themes.ts</code> to{" "}
                  <code className="text-neutral-300">&quot;{active}&quot;</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keeps the switcher from covering the end of the resume. */}
      <div aria-hidden className="h-28" />
    </>
  )
}
