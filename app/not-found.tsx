import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Page Not Found",
}

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-bold tracking-tight text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This page went the way of my first rocket launch. Head back home and try again.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
