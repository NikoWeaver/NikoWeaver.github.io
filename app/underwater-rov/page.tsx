import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Underwater AUV",
  description:
    "Crush, the Duke Robotics Club autonomous underwater vehicle. 7th overall at RoboSub 2025 with a 3rd-place design report, and 11th at RoboSub 2026.",
}

function Photo({
  src,
  alt,
  caption,
  aspect = "aspect-[4/3]",
  position = "object-center",
}: {
  src: string
  alt: string
  caption?: string
  aspect?: string
  position?: string
}) {
  return (
    <figure>
      <div className={`relative w-full overflow-hidden bg-muted ${aspect}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover ${position}`} />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

export default function UnderwaterROVProject() {
  return (
    <div className="min-h-screen bg-background">
      <div className="detail-page container mx-auto py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight">Underwater AUV | Meet Crush!</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Duke Robotics Club - RoboSub 2025 Finalists &amp; 11th at RoboSub 2026
          </p>
        </div>

        {/* Two renders (transparent backgrounds) showing how Crush's design changed */}
        <figure className="mb-12">
          <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2">
            <Image
              src="/auv/crush-render-v1.webp"
              alt="Earlier render of Crush"
              width={1350}
              height={1080}
              className="h-auto w-full"
              priority
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <Image
              src="/auv/crush-render-v2.webp"
              alt="Later render of Crush"
              width={1398}
              height={1080}
              className="h-auto w-full"
              priority
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">Crush&apos;s design evolution</figcaption>
        </figure>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Crush Development!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-muted-foreground">
              <p>
                This is Crush, DRC&apos;s newest AUV, which competed in RoboSub 2025 and 2026! Crush is fully autonomous and
                works alongside Oogway, our larger and older AUV. In 2026 we placed 11th overall, and in 2025 we placed 7th.
              </p>
              <p>
                After joining DRC in 2024, I was elected Chief Engineer in 2025. In 2026 I was elected as Co-President, which
                is where I am serving now!
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Photo
                src="/auv/crush-oogway-deck-2025.jpg"
                alt="Crush and Oogway on the pool deck at RoboSub 2025"
                aspect="aspect-video"
                position="object-[50%_88%]"
                caption="RoboSub 2025: Crush (left) and Oogway"
              />
              <Photo
                src="/auv/crush-oogway-deck.jpg"
                alt="Crush and Oogway on the pool deck at RoboSub 2026"
                aspect="aspect-video"
                position="object-[50%_88%]"
                caption="RoboSub 2026: Crush (left) and Oogway"
              />
            </div>

            <div className="mt-8">
              <h3 className="mb-2 font-semibold">RoboSub 2026 Developments</h3>
              <p className="text-muted-foreground">
                For RoboSub 2026, I led the upgrades of Crush! We added two more vertical thrusters, and I designed a
                hydrodynamic buoyancy system and case that reduced drag by ~30%.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="mb-2 font-semibold">RoboSub 2026 Competition</h3>
              <figure>
                <video
                  className="aspect-video w-full bg-muted"
                  src="/auv/crush-dive.mp4"
                  poster="/auv/crush-dive-poster.jpg"
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                />
                <figcaption className="mt-2 text-sm text-muted-foreground">Watch Crush submerge!</figcaption>
              </figure>
            </div>

            <div className="mt-8">
              <h3 className="mb-2 font-semibold">RoboSub 2027 Plans</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  For RoboSub 2027, we are working on a new AUV. We are building a custom PCB-based electrical stack and our
                  first custom capsule. I am designing the capsule to be a billet aluminum piece that also serves as the frame,
                  which will dramatically reduce the robot&apos;s weight. This new robot would mean decommissioning Oogway!
                </p>
                <p>
                  While the new robot will take a lot of effort, we aren&apos;t forgetting about Crush! Crush will be receiving
                  reliability improvements, and tweaks to the buoyancy system to further improve controls from last year.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Contributions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Technical Contributions</CardTitle>
            <CardDescription>Key Design Elements and Systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Billet Aluminum Capsule-Frame (RoboSub 2027, in progress)</h3>
                <p className="text-muted-foreground">
                  Instead of having separate capsules and frames like Crush and Oogway, I decided to make them into one piece.
                  I&apos;m currently in the process of designing this part, and have some exciting plans for mounting PCBs!
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Milled Buoyancy Foam</h3>
                <p className="text-muted-foreground">
                  I used a 3-axis CNC mill to create the foam blocks on Crush. We had previously only done 2D operations, so
                  this was a new skill for the team! The 3D profiles allowed for better hydrodynamics, and more complex parts
                  that were far more intentionally designed than previous buoyancy systems on both Crush and Oogway.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Photo
                    src="/auv/crush-before-buoyancy.jpg"
                    alt="Crush before the new buoyancy system"
                    caption="Before: Crush with its old buoyancy"
                  />
                  <Photo
                    src="/auv/crush.jpg"
                    alt="Crush with the new milled buoyancy system"
                    caption="After: Crush with the new milled buoyancy (isn't it so pretty)"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Hydrodynamic Analysis</h3>
                <p className="text-muted-foreground">
                  CFD analysis in Ansys Fluent showed that the new buoyancy system and case have ~30% less drag than
                  Crush&apos;s previous buoyancy system.
                </p>
                {/* The plot has a white background, so it reads as a figure in both themes */}
                <figure className="mt-4 max-w-3xl">
                  <Image
                    src="/auv/crush-cfd.jpg"
                    alt="Ansys Fluent velocity pathlines around Crush with the hydrodynamic case"
                    width={2000}
                    height={1125}
                    className="h-auto w-full"
                  />
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    Ansys Fluent velocity pathlines around Crush with the case
                  </figcaption>
                </figure>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Capsule Mounting System</h3>
                <p className="text-muted-foreground">
                  Designed the mounting system for the dual capsule configuration, incorporating:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
                  <li>SLS-Nylon prints to achieve complex geometries</li>
                  <li>
                    3-part design that constrains the capsules&apos; side-to-side movement while still letting them be
                    easily removed
                  </li>
                  <li>Hexagonal profile for easy mounting to modular bars</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 font-semibold">Structural Design</h3>
                <p className="text-muted-foreground">Developed the primary structural components:</p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Side plates: Large enclosure panels providing structural integrity and protection</li>
                  <li>
                    Mounting bars: Cross-vehicle support with hexagon and bolt pattern for flexible component mounting
                  </li>
                  <li>
                    Assisted in modeling other components of the robot so the robot&apos;s dimensions could be changed
                    easily via parameterization
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design Features */}
        <Card>
          <CardHeader>
            <CardTitle>Design Features</CardTitle>
            <CardDescription>Key Characteristics and Innovations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Structural Innovation</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Dual capsule design for separated systems</li>
                  <li>Modular mounting system for easy maintenance</li>
                  <li>Optimized weight distribution</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">General Performance Features of Crush</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Hydrodynamically optimized buoyancy, case, and frame</li>
                  <li>Eight thrusters for 6-DOF control</li>
                  <li>Robust waterproof enclosure system</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
