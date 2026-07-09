import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModelRocketProject() {
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
          <h1 className="font-display text-4xl font-bold tracking-tight">Model Rocket Project</h1>
          <p className="mt-4 text-xl text-muted-foreground">Failure! (as seen below)</p>
        </div>

        {/* Main Project Image */}
        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rocket222.JPG-N3wP2cxQa8plmhbBLOSYVxsaEBE6tg.jpeg"
            alt="Model Rocket"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>Custom Model Rocket Development</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              I designed and flew a guided rocket in the summer of 2023. Launch 1 failed, but I learned a lot! See
              technical info below.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Design Features</CardTitle>
            <CardDescription>Cool Things I designed!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">Notable features of the rocket include:</p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Arduino Uno microcontroller</li>
                <li>Accelerometer and Gyro for sensing orientation</li>
                <li>Individual fin control for pitch, yaw, and roll stability</li>
                <li>Custom PID control of all axes</li>
                <li>Custom explosive charge for parachute deployment</li>
                <li>3&quot; cardboard tube based design to be easily upgradable, lightweight, and robust</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Control Loop</CardTitle>
            <CardDescription>How I coded the rocket</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>The Arduino Uno uses I2C to communicate with a gyroscope and accelerometer</li>
                <li>
                  The gyroscope data feeds 3 separate PID loops to keep the rocket stable in pitch, yaw, and
                  roll. The PID loops can also be used to maintain a set direction or path.
                </li>
                <li>
                  Each fin is independently controlled, so pitch, yaw, and roll commands can be executed in
                  parallel.
                </li>
                <li>
                  Once the rocket stops accelerating, the accelerometer detects apogee and fires the parachute
                  charge
                </li>
                <li>
                  When the parachute is deployed the fins rotate 90˚ to provide maximum drag to the rocket on its way
                  down
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Flight Test 1</CardTitle>
            <CardDescription>Initial Launch and Lessons Learned</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Only three of the engines ignited on launch, and the rocket came down hard &mdash; a Rapid Unscheduled
              Disassembly (RUD). The failure traced back to the ignition wiring, which is the first thing getting
              redesigned for V2.
            </p>
          </CardContent>
        </Card>

        {/* Future Plans */}
        <Card>
          <CardHeader>
            <CardTitle>What&apos;s Next</CardTitle>
            <CardDescription>Plans for V2</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Before the next launch I plan to:</p>
            <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
              <li>Build an improved V2 of the rocket</li>
              <li>Redesign the ignition wiring to be more robust</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
