"use client"

import * as React from "react"
import { Check, Copy, Maximize2, Pause, Play, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Shared helpers
 * -----------------------------------------------------------------------------------------------*/

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {}
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }
  // Safari < 14
  mq.addListener(onChange)
  return () => mq.removeListener(onChange)
}

function getReducedMotion() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false
}

function getServerReducedMotion() {
  return false
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion)
}

/* -------------------------------------------------------------------------------------------------
 * Lightbox provider
 * -----------------------------------------------------------------------------------------------*/

type LightboxApi = { open: (src: string, title: string) => void }
// Internal variant lets MarbleVideo hand over its trigger so focus can be restored even where
// the browser did not focus the button on click (Safari/macOS).
type InternalLightboxApi = { open: (src: string, title: string, trigger?: HTMLElement | null) => void }

const LightboxContext = React.createContext<InternalLightboxApi | null>(null)

const NOOP_LIGHTBOX: InternalLightboxApi = { open: () => {} }

export function useMarbleLightbox(): LightboxApi {
  return React.useContext(LightboxContext) ?? NOOP_LIGHTBOX
}

function useInternalLightbox(): InternalLightboxApi {
  return React.useContext(LightboxContext) ?? NOOP_LIGHTBOX
}

type LightboxItem = { src: string; title: string }

/* Page-wide pause for the looping inline videos (WCAG 2.2.2), remembered per visitor. */
type MotionApi = { paused: boolean; toggle: () => void }
const MotionContext = React.createContext<MotionApi>({ paused: false, toggle: () => {} })
const MOTION_STORAGE_KEY = "marble-videos-paused"

export function MarbleMediaProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [item, setItem] = React.useState<LightboxItem | null>(null)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const pointerDownOnBackdrop = React.useRef(false)
  const titleId = React.useId()
  const [motionPaused, setMotionPaused] = React.useState(false)

  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(MOTION_STORAGE_KEY) === "1") setMotionPaused(true)
    } catch {}
  }, [])

  const toggleMotion = React.useCallback(() => {
    setMotionPaused((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(MOTION_STORAGE_KEY, next ? "1" : "0")
      } catch {}
      return next
    })
  }, [])

  const motion = React.useMemo<MotionApi>(() => ({ paused: motionPaused, toggle: toggleMotion }), [motionPaused, toggleMotion])

  const open = React.useCallback((src: string, title: string, trigger?: HTMLElement | null) => {
    if (typeof document !== "undefined") {
      const active = document.activeElement
      triggerRef.current =
        trigger ?? (active instanceof HTMLElement && active !== document.body ? active : null)
    }
    setItem({ src, title })
  }, [])

  const api = React.useMemo<InternalLightboxApi>(() => ({ open }), [open])

  const isOpen = item !== null

  // Show the modal once its content has rendered.
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen || dialog.open) return
    try {
      dialog.showModal()
    } catch {
      // Fallback for engines without modal support: open non-modally.
      dialog.setAttribute("open", "")
    }
  }, [isOpen])

  // Every close path (Esc, backdrop, button) funnels through the native "close" event.
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => {
      const video = videoRef.current
      if (video) {
        video.pause()
        video.removeAttribute("src")
        video.load()
      }
      setItem(null)

      // Native <dialog> restores focus to the previously focused element; fill in where it didn't.
      const trigger = triggerRef.current
      triggerRef.current = null
      const active = document.activeElement
      if (trigger && trigger.isConnected && (!active || active === document.body || dialog.contains(active))) {
        trigger.focus({ preventScroll: true })
      }
    }
    dialog.addEventListener("close", handleClose)
    return () => dialog.removeEventListener("close", handleClose)
  }, [])

  // Lock page scroll while the lightbox is open.
  React.useEffect(() => {
    if (!isOpen) return
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    body.style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${current + scrollbarWidth}px`
    }
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  const close = React.useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
  }, [])

  // Backdrop click: only when the press both started and ended on the dialog element itself,
  // so dragging the scrubber out of the frame does not dismiss it.
  const handlePointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    pointerDownOnBackdrop.current = event.target === event.currentTarget
  }
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const startedOnBackdrop = pointerDownOnBackdrop.current
    pointerDownOnBackdrop.current = false
    if (event.target === event.currentTarget && startedOnBackdrop) close()
  }

  return (
    <MotionContext.Provider value={motion}>
    <LightboxContext.Provider value={api}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        className="w-[calc(100%-2rem)] max-w-5xl rounded-none border border-white/10 bg-black p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 pl-4 pr-1.5">
          <h2 id={titleId} className="min-w-0 truncate text-sm font-medium leading-snug">
            {item?.title ?? ""}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white focus-visible:outline-offset-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {item ? (
          <video
            key={item.src}
            ref={videoRef}
            src={item.src}
            controls
            autoPlay
            playsInline
            className="block max-h-[80vh] w-full bg-black"
          />
        ) : null}
      </dialog>
    </LightboxContext.Provider>
    </MotionContext.Provider>
  )
}

export function MarbleMotionToggle({ className }: { className?: string }): JSX.Element | null {
  const { paused, toggle } = React.useContext(MotionContext)
  const reducedMotion = usePrefersReducedMotion()
  // With reduced motion the tiles never autoplay, so there is nothing to pause.
  if (reducedMotion) return null
  return (
    <Button type="button" variant="outline" size="sm" onClick={toggle} className={cn("gap-1.5 rounded-sm text-xs", className)}>
      {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
      {paused ? "Play videos" : "Pause videos"}
    </Button>
  )
}

/* -------------------------------------------------------------------------------------------------
 * MarbleVideo: muted autoplay-when-visible tile that opens the lightbox
 * -----------------------------------------------------------------------------------------------*/

type MarbleVideoProps = {
  src: string
  title: string
  poster?: string
  label?: string
  badge?: string
  note?: string
  aspect?: "16/9" | "4/3" | "1/1"
  fill?: boolean
  className?: string
}

const chipClass =
  "pointer-events-none absolute z-10 border bg-background/90 px-2 py-1 text-[11px] font-medium leading-none text-foreground"

export function MarbleVideo({
  src,
  title,
  poster,
  label,
  badge,
  note,
  aspect = "16/9",
  fill = false,
  className,
}: MarbleVideoProps): JSX.Element {
  const { open } = useInternalLightbox()
  const rootRef = React.useRef<HTMLButtonElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const loadedSrcRef = React.useRef<string | null>(null)
  const [ready, setReady] = React.useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = React.useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const { paused: motionPaused } = React.useContext(MotionContext)
  const still = reducedMotion || motionPaused
  const noteId = React.useId()

  React.useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    // Source changed: drop the old one so the new one lazy-loads.
    if (loadedSrcRef.current !== null && loadedSrcRef.current !== src) {
      video.pause()
      video.removeAttribute("src")
      video.load()
      loadedSrcRef.current = null
      setReady(false)
    }

    if (still) {
      video.pause()
      return
    }

    const start = () => {
      if (getReducedMotion()) return
      if (loadedSrcRef.current !== src) {
        video.src = src
        loadedSrcRef.current = src
      }
      video.muted = true
      const attempt = video.play()
      if (attempt !== undefined) {
        attempt
          .then(() => setAutoplayBlocked(false))
          .catch((error: unknown) => {
            if (error instanceof DOMException && error.name === "NotAllowedError") setAutoplayBlocked(true)
          })
      }
    }

    if (typeof IntersectionObserver === "undefined") {
      start()
      return () => video.pause()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start()
          else video.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(root)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [src, still])

  const showVideo = ready && !still
  const showPlayGlyph = still || autoplayBlocked

  return (
    <button
      ref={rootRef}
      type="button"
      aria-label={label ? `${label}. Open video: ${title}` : `Open video: ${title}`}
      aria-describedby={note ? noteId : undefined}
      onClick={(event) => open(src, title, event.currentTarget)}
      style={fill ? undefined : { aspectRatio: aspect }}
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden rounded-none border bg-black p-0 text-left",
        fill && "h-full",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 block motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-visible:scale-[1.02]"
      >
        {poster ? (
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            showVideo ? "opacity-100" : "opacity-0",
          )}
        />
      </span>

      {showPlayGlyph ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-foreground"
        >
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
        </span>
      ) : null}

      {label ? <span className={cn(chipClass, "left-2 top-2 max-w-[calc(100%-4.5rem)] truncate")}>{label}</span> : null}
      {badge ? <span className={cn(chipClass, "right-2 top-2 font-mono")}>{badge}</span> : null}
      {note ? (
        <span
          id={noteId}
          className="pointer-events-none absolute bottom-2 left-2 z-10 max-w-[calc(100%-3.5rem)] bg-black/60 px-2 py-1 text-[11px] leading-snug text-white"
        >
          {note}
        </span>
      ) : null}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 z-10 grid h-7 w-7 place-items-center border bg-background/90 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  )
}

/* -------------------------------------------------------------------------------------------------
 * YouTubeFacade: poster + play button, swaps in the privacy-enhanced embed on click
 * -----------------------------------------------------------------------------------------------*/

export function YouTubeFacade({ id, title, poster }: { id: string; title: string; poster: string }): JSX.Element {
  const [active, setActive] = React.useState(false)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // The facade button unmounts on click; hand focus to the player instead of dropping it to <body>.
  React.useEffect(() => {
    if (active) iframeRef.current?.focus()
  }, [active])

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden border bg-black",
        // The play button fills this box, so draw its focus ring here where overflow cannot clip it.
        "has-[>button:focus-visible]:outline has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-offset-[5px] has-[>button:focus-visible]:outline-ring",
      )}
    >
      {active ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 block h-full w-full p-0 focus-visible:outline-none"
        >
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
          >
            <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-[11px] leading-none text-white"
          >
            YouTube · with sound
          </span>
        </button>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CopyBibtex
 * -----------------------------------------------------------------------------------------------*/

function legacyCopy(text: string): boolean {
  const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.setAttribute("aria-hidden", "true")
  textarea.style.position = "fixed"
  textarea.style.top = "0"
  textarea.style.left = "0"
  textarea.style.opacity = "0"
  textarea.style.pointerEvents = "none"
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, text.length)
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  previouslyFocused?.focus({ preventScroll: true })
  return ok
}

export function CopyBibtex({ citation }: { citation: string }): JSX.Element {
  const [copied, setCopied] = React.useState(false)
  const [announcement, setAnnouncement] = React.useState("")
  const resetTimer = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    },
    [],
  )

  const handleCopy = async () => {
    let ok = false
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation)
        ok = true
      }
    } catch {
      ok = false
    }
    if (!ok) ok = legacyCopy(citation)

    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    if (ok) {
      setCopied(true)
      setAnnouncement("Citation copied")
      resetTimer.current = window.setTimeout(() => {
        setCopied(false)
        setAnnouncement("")
      }, 2000)
    } else {
      setCopied(false)
      setAnnouncement("Copy failed. Select the citation text to copy it manually.")
    }
  }

  return (
    <div className="relative block">
      <pre className="overflow-x-auto whitespace-pre border bg-muted/40 px-4 pb-4 pt-12 font-mono text-xs leading-relaxed text-foreground sm:text-[13px] lg:pr-28 lg:pt-4">
        <code>{citation}</code>
      </pre>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute right-2 top-2 gap-1.5 rounded-sm text-xs"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy BibTeX"}
      </Button>
      <span className="sr-only" aria-live="polite" role="status">
        {announcement}
      </span>
    </div>
  )
}
