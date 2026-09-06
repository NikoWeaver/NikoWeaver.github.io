import type { Theme } from "@/lib/themes"
import { Hero } from "./hero"
import { Projects } from "./projects"
import { Skills } from "./skills"
import { Resume } from "./resume"
import { Section } from "./section"

/**
 * The whole home page, once.
 *
 * All five renditions render this component; the only thing that differs is
 * the `theme` object handed in. Section order and anchor ids (#home,
 * #projects, #skills, #resume) are fixed, because the nav links to them and
 * because moving furniture between variants would make them impossible to
 * compare fairly.
 */
export function HomeView({ theme }: { theme: Theme }) {
  return (
    <div className="bg-background">
      <Hero theme={theme} />

      <Section theme={theme} id="projects" index={2} label="Projects" note="5 selected">
        <Projects theme={theme} />
      </Section>

      <Section theme={theme} id="skills" index={3} label="Skills" note="Tools & methods">
        <Skills theme={theme} />
      </Section>

      <Section theme={theme} id="resume" index={4} label="Resume" note="Updated 2026">
        <Resume theme={theme} />
      </Section>
    </div>
  )
}
