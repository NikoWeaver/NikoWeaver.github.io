import { ThemeLab } from "@/components/theme-lab"

export const metadata = {
  title: "Layout renditions",
  description: "Side-by-side comparison of the five home-page layout renditions.",
  robots: { index: false, follow: false },
}

/**
 * /preview — the comparison harness. Not linked from the site navigation and
 * marked noindex; it exists so the five renditions can be judged against each
 * other on real content rather than in the abstract.
 */
export default function PreviewPage() {
  return <ThemeLab />
}
