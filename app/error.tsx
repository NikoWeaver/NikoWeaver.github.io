"use client"

import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Rapid unscheduled disassembly. You can try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
