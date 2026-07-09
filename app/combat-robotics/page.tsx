import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CombatRoboticsProject() {
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
          <h1 className="font-display text-4xl font-bold tracking-tight">Combat Robotics Project</h1>
          <p className="mt-4 text-xl text-muted-foreground">Spin n out!</p>
        </div>

        {/* Project Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Antiweight robots!</CardTitle>
            <CardDescription>Why Combat Robotics?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                In the Duke combat robotics club I have designed and competed with multiple robots.
              </p>
              <p className="text-muted-foreground">
                I love building these little robots! With each one I&apos;m getting better at making them compact but
                still good fighters.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Design Inspiration for Spin-n-out */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Spin-n-out</CardTitle>
            <CardDescription>burger!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 space-y-4">
              <p className="text-muted-foreground">
                This is my first melty-brain robot: Spin-N-Out. It spins really fast and uses the whole robot as a
                weapon. It is going to destroy other robots or itself...
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Primary Influences</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>NC State melty brain I saw in person</li>
                  <li>In-N-Out Burger</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Design Goals</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Spin really fast</li>
                  <li>Be controllable at high rotational speeds</li>
                  <li>High damage output</li>
                  <li>Beautiful In-N-Out aesthetics</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="mb-2 font-semibold">CAD Prototype</h4>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%201.53.02%E2%80%AFPM-8in5uhFdWVSg6MwfOb4OWQhSUhgjyh.png"
                  alt="Combat Robot CAD Model"
                  fill
                  className="object-contain bg-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design Inspiration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Beta Freak</CardTitle>
            <CardDescription>Vertical spinner</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 space-y-4">
              <p className="text-muted-foreground">
                This is my second vertical spinner robot. Beta&apos;s predecessor, Alpha Freak, was similar but had a poorly
                designed drive system. Beta Freak fixed that with four-wheel drive, and in the process also
                gained a grade 5 titanium wedge to protect against horizontal spinners.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Competition Results</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>4th place finish: 3-2 record</li>
                  <li>Ended up losing when bad N20 motors failed and essentially disabled the drive system</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Design Goals</h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Maximum weapon energy storage</li>
                  <li>Fast driving speed</li>
                  <li>Reliable drive system</li>
                  <li>Aggressive visuals</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="mb-2 font-semibold">CAD Prototype</h4>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%201.47.43%E2%80%AFPM-KgEa1Z6NZzbMbLwLsqQRDKYwMGw6u7.png"
                  alt="Combat Robot CAD Model"
                  fill
                  className="object-contain bg-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More specs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Component Specifications</CardTitle>
            <CardDescription>Current design features</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Specification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Drive Motors</TableCell>
                  <TableCell>4x 1000rpm 6V N20 motors</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weapon Motor</TableCell>
                  <TableCell>2600KV brushless outrunner with direct drive</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Battery</TableCell>
                  <TableCell>2S 300mAh LiPo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Chassis Material</TableCell>
                  <TableCell>3D printed TPU</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* First Drive Video */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>First Drive</CardTitle>
            <CardDescription>Initial Testing and Performance Evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/xaxCcigFOhU"
                title="First Drive"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="mt-4 text-muted-foreground">First drive test of the combat robot!</p>
          </CardContent>
        </Card>

        {/* Design Considerations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Antweight Design Considerations</CardTitle>
            <CardDescription>Key Factors Influencing the Design Process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Weapon System Optimization</h3>
                <p className="text-muted-foreground">
                  I have made all my weapons from AR500 steel, ordered from SendCutSend. AR500 is an exceptional
                  weapon material because of its strength, hardness, and high weight. AR500 hits hard!
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 font-semibold">Drive System Reliability</h3>
                <p className="text-muted-foreground">
                  All of my wheels are O-rings on PLA hubs. PLA is easy to print, and the O-rings provide plenty
                  of grip for fast driving.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="mb-2 font-semibold">Manufacturing Method</h3>
                <p className="text-muted-foreground">
                  The robot is primarily constructed from 3D printed TPU, with PLA prints for parts that
                  won&apos;t get damaged easily. The TPU frame makes the robot rigid enough to be functional, but soft
                  enough to absorb impacts. My robots were printed on my Bambu P1S.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">Project Gallery</h2>
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%201.47.43%E2%80%AFPM-KgEa1Z6NZzbMbLwLsqQRDKYwMGw6u7.png"
              alt="Beta Freak"
              fill
              className="object-contain bg-background"
            />
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">Beta Freak, titanium wedge and all.</p>
        </div>
      </section>
    </div>
  )
}
