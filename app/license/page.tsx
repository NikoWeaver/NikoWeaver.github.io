import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "License",
  description: "Licensing and copyright information for this website.",
}

export default function LicensePage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">License &amp; Copyright</h1>
          <p className="mt-4 text-xl text-muted-foreground">How this site and its code may be used.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Source Code &mdash; MIT License</CardTitle>
            <CardDescription>Copyright &copy; {year} Niko Weaver</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The original source code for this website is released under the MIT License. You are free to use, copy,
              modify, and distribute it, provided the copyright notice and permission notice are included. The software
              is provided &ldquo;as is&rdquo;, without warranty of any kind.
            </p>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs leading-relaxed font-mono">
{`MIT License

Copyright (c) ${year} Niko Weaver

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Trademarks &amp; Images</CardTitle>
            <CardDescription>Not covered by the MIT License</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The MIT License covers only the source code. It does not grant any rights to third-party trademarks,
              brand names, logos, or images displayed on this site &mdash; including the software and company logos in
              the Skills section and photographs hosted on external services. These remain the property of their
              respective owners and are shown for identification and informational purposes only. No affiliation or
              endorsement is implied.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open-Source Software</CardTitle>
            <CardDescription>Built on the shoulders of others</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This site is built with open-source software including Next.js, React, Tailwind CSS, Radix UI /
              shadcn/ui, and lucide-react, each distributed under its own license (predominantly MIT). Full license
              texts ship with each package.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
