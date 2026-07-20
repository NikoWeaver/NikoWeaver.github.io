import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Underwater AUV",
  description:
    "Crush, the Duke Robotics Club autonomous underwater vehicle. 7th overall at RoboSub 2025 with a 3rd-place design report.",
}

export default function UnderwaterROVProject() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold tracking-tight">Underwater AUV | Meet Crush!</h1>
          <p className="mt-4 text-xl text-muted-foreground">{"Duke Robotics Club - 2025 RoboSub Competition Finalists!"}</p>
        </div>

        {/* Main Project Image */}
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Minibot%20render-8VNVx5cU7OnkLV89ePrNVPWApd0ElG.png"
            alt="Underwater ROV"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Crush Development!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              I contributed to the development of Crush, an autonomous underwater vehicle (AUV) built for the 2025
              RoboSub competition. Crush operates fully independently underwater, navigating and completing
              competition tasks with no human input.
            </p>
            <p className="mt-3 text-muted-foreground">
              We placed 7th overall at RoboSub 2025 and took 3rd for our design report.
            </p>
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Robosub 2026 Developments</h3>
              <p className="text-muted-foreground">
                As the Chief Engineer in the 2025&ndash;26 year, I led the upgrade process of Crush. We added two more
                vertical thrusters to enable pitch control and reworked the buoyancy system to be far more
                hydrodynamic. I also designed a case that fits over the robot to further improve its hydrodynamics.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Robosub 2027 plans</h3>
              <p className="text-muted-foreground">
                After competing in RoboSub 2026, I was elected Co-President of the club and will continue upgrading
                Crush. The largest action item is improving Crush&apos;s reliability &mdash; especially its cable
                connections, which were easily damaged during shipping and packing. As of writing, RoboSub just
                ended, so more information is to come!
              </p>
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
                <h3 className="mb-2 font-semibold">Milled Buoyancy foam</h3>
                <p className="text-muted-foreground">
                  I designed custom buoyancy blocks for Crush. Some improvements were:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Hydrodynamic geometries that mirrored the outer frame.</li>
                  <li>
                    3-Axis CNC milled the blocks to have high accuracy, and more complex shapes than the previous 2D-cut parts.
                  </li>
                  <li>Easily removable blocks to allow for easier maintenance and repairs.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Hydrodynamic outer case</h3>
                <p className="text-muted-foreground">
                  Over top of the new buoyancy blocks and capsules, I created a custom case that fit over the robot to further improve the robot's hydrodynamics.
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
                  <li>SLS 3D printed Nylon 12 to be lightweight with high strength.</li>
                  <li>
                    Hydrodynamic analysis in Ansys Fluent showed a 29% drag reduction compared to the previous
                    buoyancy system.
                  </li>
                  <li>Magnetically mounted camera to allow for easy removal and installation of the case</li>
                </ul>
              </div>

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
                    Assisted in modeling other components of the minibot so the robot&apos;s dimensions could be changed
                    easily via parameterization
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 font-semibold">Hydrodynamic Analysis</h3>
                <p className="text-muted-foreground">
                  Conducted Computational Fluid Dynamics (CFD) analysis on the frame design to:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Optimize hydrodynamic performance</li>
                  <li>Reduce drag &mdash; the redesigned buoyancy system cut simulated drag by 29%</li>
                  <li>Improve overall efficiency of thrusters underwater</li>
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
                  <li>Eight thrusters for 6-DOF translation</li>
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
