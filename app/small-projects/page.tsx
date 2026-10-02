import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SmallProjectGallery, type GallerySlide } from "@/components/small-project-gallery"

export const metadata = {
  title: "Small Projects",
  description: "Quick builds, experiments, and side projects.",
}

const smallProjects: { id?: string; title: string; date: string; description: string; slides: GallerySlide[] }[] = [
  {
    title: "CubeSat Attitude Control",
    date: "2026",
    description:
      "A hybrid reaction wheel and control moment gyro that is highly space- and mass-efficient for a CubeSat. Instead of three spinning masses for attitude control, only one heavy mass spins to act as a reaction wheel, and two rotating degrees of freedom provide the gyro capabilities. Two of these units can give a satellite full 6-DOF control! I developed this as part of a proposal for DukeSat, Duke University's first CubeSat.",
    slides: [
      {
        type: "video",
        src: "/small-projects/cubesat-acs.mp4",
        poster: "/small-projects/cubesat-acs-poster.jpg",
        alt: "CAD animation of the hybrid reaction wheel and gyro attitude control unit",
      },
    ],
  },
  {
    title: "Voron 0.2 3D Printer",
    date: "2023",
    description:
      "I built and modded this Voron 0.2 printer from an LDO kit. I added beefy cooling fans to the sides of the bed and fans to cool the stepper motors. My fastest Benchy is sub-6 minutes!",
    slides: [
      {
        type: "video",
        src: "/small-projects/voron02-a.mp4",
        poster: "/small-projects/voron02-a-poster.jpg",
        alt: "Voron 0.2 printing at high speed, video 1",
      },
      {
        type: "video",
        src: "/small-projects/voron02-b.mp4",
        poster: "/small-projects/voron02-b-poster.jpg",
        alt: "Voron 0.2 printing at high speed, video 2",
      },
    ],
  },
  {
    title: "Voron 2.4 3D Printer",
    date: "2022",
    description:
      "My first Voron printer, originally a Formbot kit. I swapped the toolhead for a Stealthburner and later added a filament cutter. I then added a BoxTurtle filament changer so I could do multi-material prints. Other mods: a Nevermore filter, a toolhead umbilical, CAN bus, and a purge bucket. I somehow got a 10-minute Benchy on this printer!",
    slides: [
      {
        type: "video",
        src: "/small-projects/voron24.mp4",
        poster: "/small-projects/voron24-poster.jpg",
        alt: "Voron 2.4 with the BoxTurtle filament changer mounted on top",
      },
    ],
  },
]

export default function SmallProjects() {
  return (
    <div className="min-h-screen bg-background">
      <div className="detail-page container mx-auto py-8">
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight">Small Projects</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Quick builds, experiments, and side projects.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-16">
          {smallProjects.map((project) => (
            <article key={project.title} id={project.id} className="scroll-mt-24 border-b pb-12 last:border-b-0">
              <SmallProjectGallery slides={project.slides} label={project.title} />
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-sm text-muted-foreground">{project.date}</p>
              </div>
              <p className="mt-2 text-muted-foreground">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
