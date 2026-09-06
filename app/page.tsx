import { HomeView } from "@/components/home/home-view"
import { DEFAULT_THEME, THEMES } from "@/lib/themes"

/**
 * The live home page.
 *
 * It renders whichever rendition DEFAULT_THEME in lib/themes.ts names. To ship
 * a different one, change that constant — nothing here needs to move. To
 * compare all five side by side, run the site and visit /preview.
 */
export default function Home() {
  return <HomeView theme={THEMES[DEFAULT_THEME]} />
}
