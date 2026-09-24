import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About",
  description:
    "Niko Weaver — Mechanical Engineering student at Duke University, pursuing an Aerospace Engineering certificate.",
}

export default function About() {
  return (
    <div className="container mx-auto px-6 py-16 sm:px-8 md:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 display-title font-display text-4xl sm:text-5xl">About Me</h1>

        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="about-copy flex-1">
            <p className="text-lg text-muted-foreground">
              Hello! I&apos;m Niko Weaver, a Mechanical Engineering student at Duke University pursuing an Aerospace
              Engineering certificate. My work centers on aerospace and robotics: I lead the 50-member Duke Robotics
              Club as president, build my own UAVS and AUVs, and spent last summer working on research in the Duke General Robotics Lab.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I learn best by building. Right now that means version 2 of my fully 3D-printed UAV &mdash; flight 1 is
              in the books, and flight 2 is coming in 2027! When I&apos;m not building trinkets and doodads, I play guitar, ski, and 
              bike.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/#projects">View My Projects</Link>
              </Button>
            </div>
          </div>

          <div className="w-full flex-shrink-0 md:w-[280px]">
            <figure>
              <Image
                src="https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_0171.JPG"
                alt="Niko Weaver"
                width={280}
                height={350}
                className="h-auto w-full object-cover ring-1 ring-border"
              />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                Somewhere with better weather than the machine shop
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}
