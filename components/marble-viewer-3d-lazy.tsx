"use client"

import dynamic from "next/dynamic"

/* three.js is large and the viewer sits far below the fold, so it loads in its own chunk. */
export const MarbleViewer3D = dynamic(() => import("@/components/marble-viewer-3d").then((m) => m.MarbleViewer3D), {
  ssr: false,
  loading: () => (
    <div aria-hidden="true">
      <div className="aspect-[4/3] w-full border bg-gradient-to-b from-muted/30 to-muted/80 sm:aspect-[16/10]" />
      <div className="mt-3 h-9" />
    </div>
  ),
})
