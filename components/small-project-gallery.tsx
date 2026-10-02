"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

import { cn } from "@/lib/utils"

export type GallerySlide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string }
  | { type: "youtube"; id: string; alt: string }

export function SmallProjectGallery({ slides, label }: { slides: GallerySlide[]; label: string }) {
  const [index, setIndex] = React.useState(0)
  const [playing, setPlaying] = React.useState<number | null>(null)
  const count = slides.length
  const slide = slides[index]

  const go = (delta: number) => {
    setPlaying(null)
    setIndex((i) => (i + delta + count) % count)
  }

  return (
    <div
      className="group/gallery relative aspect-video w-full overflow-hidden bg-muted"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} media`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1)
        if (e.key === "ArrowRight") go(1)
      }}
    >
      {(() => {
        if (slide.type === "image") {
          return (
            <>
              <Image src={slide.src} alt="" aria-hidden="true" fill className="scale-110 object-cover blur-2xl" />
              <Image src={slide.src} alt={slide.alt} fill className="object-contain" />
            </>
          )
        }
        const poster = slide.type === "youtube" ? `https://i.ytimg.com/vi/${slide.id}/hqdefault.jpg` : slide.poster
        return (
          <>
            {/* Blurred copy of the poster fills the frame behind portrait or non-16:9 media. */}
            <Image src={poster} alt="" aria-hidden="true" fill className="scale-110 object-cover blur-2xl" />
            {playing !== index ? (
              <button
                type="button"
                onClick={() => setPlaying(index)}
                className="absolute inset-0 h-full w-full"
                aria-label={`Play video: ${slide.alt}`}
              >
                <Image src={poster} alt={slide.alt} fill className="object-contain" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                    <Play className="ml-1 h-7 w-7" aria-hidden="true" />
                  </span>
                </span>
              </button>
            ) : slide.type === "youtube" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${slide.id}?autoplay=1&rel=0`}
                title={slide.alt}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <video
                key={slide.src}
                src={slide.src}
                poster={slide.poster}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </>
        )
      })()}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow backdrop-blur transition hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPlaying(null)
                  setIndex(i)
                }}
                aria-label={`Show ${s.type === "image" ? "image" : "video"} ${i + 1} of ${count}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full bg-white/70 shadow ring-1 ring-black/30 transition-all",
                  i === index ? "w-5 bg-white" : "w-2",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
