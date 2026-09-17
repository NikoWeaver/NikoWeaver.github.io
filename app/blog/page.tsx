import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

import { posts } from "@/lib/posts"

export const metadata = {
  title: "Blog",
  description: "Build logs, flight tests, and project updates from Niko Weaver.",
}

export default function BlogPage() {
  return (
    <div className="detail-page container mx-auto py-16">
      <h1 className="mb-2 display-title text-center font-display text-4xl sm:text-5xl">Blog</h1>
      <p className="mb-10 text-center text-sm text-muted-foreground">Build logs, flight tests, and the occasional heartbreak.</p>

      {posts.map((post) => {
        const image = post.image && (
          <div
            className={`relative aspect-video w-full overflow-hidden rounded-none ${
              post.image.position === "bottom" ? "mt-6 mb-4" : "mb-4"
            }`}
          >
            <Image src={post.image.src} alt={post.image.alt} fill className="object-contain bg-background" />
          </div>
        )

        return (
          <Card key={post.title} className="mb-8">
            <CardHeader>
              <div className="blog-heading">
                <div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.subtitle}</CardDescription>
                </div>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              {post.image?.position !== "bottom" && image}
              {post.paragraphs.map((text, i) => (
                <p key={i} className="reading-copy text-muted-foreground mb-4 leading-relaxed">
                  {text}
                </p>
              ))}
              {post.image?.position === "bottom" && image}
            </CardContent>
          </Card>
        )
      })}

      <p className="text-center text-sm text-muted-foreground">
        That&apos;s everything so far &mdash; next post lands after Flight 2.
      </p>
    </div>
  )
}
