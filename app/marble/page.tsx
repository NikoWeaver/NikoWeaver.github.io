import type { Metadata } from "next"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, FileText, Github, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { MarbleViewer3D } from "@/components/marble-viewer-3d-lazy"
import { CopyBibtex, MarbleMediaProvider, MarbleMotionToggle, MarbleVideo, YouTubeFacade } from "@/components/marble-media"

const TITLE = "Omnidirectional Amphibious Locomotion via Internal Mass Actuation"
const ARXIV_ID = "2609.27358"
const YOUTUBE_ID = "N6Cl5gI0c0U"

export const metadata: Metadata = {
  metadataBase: new URL("https://nikoweaver.github.io"),
  title: "MARBLE: Amphibious Robot",
  description:
    "MARBLE is a sealed spherical robot that rolls on land and propels itself on water by shifting three internal masses. Co-first-author research at Duke University's General Robotics Lab.",
  openGraph: {
    title: `MARBLE: ${TITLE}`,
    description:
      "A sealed sphere that rolls on land and propels itself on water by shifting three internal masses. General Robotics Lab, Duke University.",
    images: [{ url: "/marble/posters/fig1a.jpg", width: 1056, height: 594, alt: "MARBLE rolling from land into a pond" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `MARBLE: ${TITLE}`,
    description:
      "A sealed sphere that rolls on land and propels itself on water by shifting three internal masses. General Robotics Lab, Duke University.",
  },
}

const links = [
  { label: "Paper", href: `https://arxiv.org/abs/${ARXIV_ID}`, Icon: FileText, primary: true },
  { label: "PDF", href: `https://arxiv.org/pdf/${ARXIV_ID}`, Icon: Download },
  { label: "Code", href: "https://github.com/generalroboticslab/MARBLE", Icon: Github },
  { label: "Video", href: `https://youtu.be/${YOUTUBE_ID}`, Icon: Play },
  { label: "GRL project page", href: "https://generalroboticslab.com/MARBLE", Icon: ExternalLink },
]

const team = [
  { name: "Niko Weaver", photo: "/marble/team/NikoWeaver.jpg", href: "/about", equal: true },
  { name: "Boxi Xia", photo: "/marble/team/BoxiXia.jpg", href: "https://boxixia.github.io/", equal: true },
  { name: "Li-Yu Lo", photo: "/marble/team/LiYuLo.jpg", href: "https://pattylo.github.io/", equal: true },
  { name: "Yuhao Huang", photo: "/marble/team/YuhaoHuang.jpg", href: "https://hyh2001.github.io/" },
  { name: "Boyuan Chen", photo: "/marble/team/BoyuanChen.jpg", href: "http://boyuanchen.com" },
]

const specs = [
  ["Outer diameter", "387 mm"],
  ["Shell mass", "1.05 kg"],
  ["Fin height", "8 mm"],
  ["Mass sliders", "3 × 700 g"],
  ["Slider stroke", "220 mm"],
  ["Motors", "CubeMars GL40 II"],
  ["Position control", "100 Hz"],
  ["Battery", "4S LiPo, 16 V"],
]

const trials = [
  {
    key: "terrestrial",
    label: "(a) Terrestrial",
    title: "Terrestrial locomotion trial",
    video: "/marble/videos/fig4a-terrestrial.mp4",
    poster: "/marble/posters/fig4a.jpg",
    traj: "/marble/figures/fig4a-traj.png",
    stats: [
      ["Traveled", "10.60 m"],
      ["Duration", "14.00 s"],
      ["Mean speed", "0.745 ± 0.163 m/s"],
      ["Peak speed", "1.025 m/s"],
    ],
  },
  {
    key: "aquatic",
    label: "(b) Aquatic",
    title: "Aquatic locomotion trial",
    video: "/marble/videos/fig4b-aquatic.mp4",
    poster: "/marble/posters/fig4b.jpg",
    traj: "/marble/figures/fig4b-traj.png",
    note: "14 s of data taken mid-trial",
    stats: [
      ["Traveled", "5.24 m"],
      ["Duration", "14.00 s"],
      ["Mean speed", "0.375 ± 0.059 m/s"],
      ["Peak speed", "0.488 m/s"],
    ],
  },
  {
    key: "transitional",
    label: "(c) Transitional",
    title: "Land-to-water transition trial",
    video: "/marble/videos/fig4c-transition.mp4",
    poster: "/marble/posters/fig4c.jpg",
    traj: "/marble/figures/fig4c-traj.png",
    stats: [
      ["Traveled", "5.21 m"],
      ["Duration", "23.93 s"],
      ["Mean speed", "0.215 ± 0.146 m/s"],
      ["Peak speed", "0.840 m/s"],
    ],
  },
]

const controllers = [
  {
    key: "learned",
    heading: "(a) Learned controller",
    title: "Learned controller under joystick commands (6× speed)",
    video: "/marble/videos/fig5a-learned.mp4",
    poster: "/marble/posters/fig5a-learned.jpg",
    figure: "/marble/figures/fig5a-learned.png",
    alt: "Measured velocity vectors for the learned controller, plotted from a common origin",
    stats: [
      ["Mean speed", "0.348 ± 0.114 m/s"],
      ["Peak speed", "0.592 m/s"],
      ["Distance", "94.10 m"],
      ["Duration", "270.37 s"],
    ],
  },
  {
    key: "geometric",
    heading: "(b) Geometric controller",
    title: "Geometric controller under joystick commands (6× speed)",
    video: "/marble/videos/fig5b-geometric.mp4",
    poster: "/marble/posters/fig5b-geometric.jpg",
    figure: "/marble/figures/fig5b-geometric.png",
    alt: "Measured velocity vectors for the geometric controller, plotted from a common origin",
    stats: [
      ["Mean speed", "0.252 ± 0.088 m/s"],
      ["Peak speed", "0.461 m/s"],
      ["Distance", "63.67 m"],
      ["Duration", "252.20 s"],
    ],
  },
]

const simulations = [
  { key: "ground-geometric", medium: "Ground", controller: "geometric" },
  { key: "ground-learned", medium: "Ground", controller: "learned" },
  { key: "water-geometric", medium: "Water", controller: "geometric" },
  { key: "water-learned", medium: "Water", controller: "learned" },
]

const gallery = [
  { src: "/marble/photos/land-water-transition.jpg", alt: "MARBLE at the edge of a pond during a land-water transition test", caption: "Land-water boundary transition" },
  { src: "/marble/photos/obstacle-collision.jpg", alt: "MARBLE floating near two red buoys during an obstacle test", caption: "Aquatic buoy interaction" },
  { src: "/marble/photos/close-shot.jpg", alt: "Close shot of MARBLE's white shell and passive fins on a wooden dock by the pond", caption: "Shell and fin close-up" },
  { src: "/marble/photos/location-boardwalk.jpg", alt: "Pond and boardwalk at the testing location", caption: "Pond test site: boardwalk" },
  { src: "/marble/photos/location-pavilion.jpg", alt: "Pond and viewing platform at the testing location", caption: "Pond test site: viewing platform" },
]

const citation = `@misc{weaver2026omnidirectionalamphibiouslocomotion,
  title         = {Omnidirectional Amphibious Locomotion via Internal Mass Actuation},
  author        = {Niko Weaver and Boxi Xia and Li-Yu Lo and Yuhao Huang and Boyuan Chen},
  year          = {2026},
  eprint        = {${ARXIV_ID}},
  archivePrefix = {arXiv},
  primaryClass  = {cs.RO},
  url           = {https://arxiv.org/abs/${ARXIV_ID}},
}`

const sections = [
  ["video", "Video"],
  ["abstract", "Abstract"],
  ["design", "Design"],
  ["experiments", "Experiments"],
  ["team", "Team"],
  ["citation", "Citation"],
]

/* Same look as CardTitle, but an h2 so the page outline runs h1 > h2 > h3. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold leading-snug tracking-tight">{children}</h2>
}

function Caption({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figcaption className="mt-4 max-w-[80ch] border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-muted-foreground">
      <strong className="font-semibold text-foreground">{label}</strong> {children}
    </figcaption>
  )
}

function Stats({ items, className = "" }: { items: string[][]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-4 gap-y-3 border-t-2 border-primary pt-3 ${className}`}>
      {items.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <dt className="eyebrow text-[11px] font-semibold uppercase text-muted-foreground">{label}</dt>
          <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* Paper figures have white backgrounds, so they sit on a light panel in both themes. */
function FigurePanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border bg-white p-2 dark:border-transparent dark:bg-[#f4f3ef] sm:p-3 ${className}`}>{children}</div>
}

export default function MarbleProject() {
  return (
    <div className="min-h-screen bg-background">
      <MarbleMediaProvider>
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
          <header className="mb-10">
            <p className="eyebrow text-xs font-semibold uppercase text-primary">
              MARBLE &middot; Research &middot; arXiv preprint 2026
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{TITLE}</h1>
            <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
              A sealed sphere that rolls on land and propels itself on water by shifting three internal masses.
            </p>

            <p className="mt-6 text-base">
              {team.map((member, i) => (
                <span key={member.name}>
                  {member.href.startsWith("/") ? (
                    <Link href={member.href} className="font-medium text-primary underline-offset-4 hover:underline">
                      {member.name}
                    </Link>
                  ) : (
                    <a
                      href={member.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {member.name}
                    </a>
                  )}
                  {member.equal && <sup aria-label="equal contribution">*</sup>}
                  {i < team.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              General Robotics Lab, Duke University &middot; <sup>*</sup>Equal contribution &middot; September 2026
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {links.map(({ label, href, Icon, primary }) => (
                <Button
                  key={label}
                  asChild
                  variant={primary ? "default" : "outline"}
                  className={primary ? "rounded-sm text-[0.8125rem]" : "contact-link rounded-sm"}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {label}
                  </a>
                </Button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-t pt-2">
              <nav aria-label="On this page" className="site-nav flex-wrap gap-x-5 gap-y-0">
                {sections.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
              <MarbleMotionToggle />
            </div>
          </header>

          {/* Personal note */}
          <p className="mb-10 max-w-3xl border-l-2 border-primary pl-4 text-lg leading-relaxed">
            This is MARBLE! I spent the Summer of 2026 working on it full-time, and am so proud to finally publish it!
            Please take a look at our work,{" "}
            <a href="#video" className="text-primary underline underline-offset-4 hover:no-underline">
              watch the video
            </a>
            , and maybe even{" "}
            <a
              href={`https://arxiv.org/abs/${ARXIV_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:no-underline"
            >
              read the paper
            </a>
            !
          </p>

          {/* Video */}
          <section id="video" aria-label="Project video" className="mb-12">
            <YouTubeFacade id={YOUTUBE_ID} title={`MARBLE: ${TITLE}`} poster="/marble/posters/fig1a.jpg" />
          </section>

          {/* Abstract */}
          <Card id="abstract" className="mb-8">
            <CardHeader>
              <SectionTitle>Abstract</SectionTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Field robots must traverse varied terrain and obstacles while remaining robust to water, debris,
                  vegetation, and physical contact. We present MARBLE, a fully enclosed omnidirectional amphibious rolling
                  robot driven entirely by internal mass redistribution.
                </p>
                <p>
                  Three mutually orthogonal linear sliders shift internal masses to generate body rotation, while an
                  orientation-aware controller maps planar velocity commands into slider positions. A rigid spherical shell
                  encloses all active mechanisms and simultaneously serves as the terrestrial contact surface, buoyant
                  enclosure, and mounting structure for passive fins that enable water-surface propulsion. Rotation of the
                  same shell architecture hence produces rolling on land and surface propulsion in water without mechanical
                  reconfiguration or separate locomotion actuators.
                </p>
                <p>
                  The spherical morphology further allows the robot to accommodate changes in body orientation and contact
                  location during direct interactions with terrain and obstacles. We evaluate MARBLE through
                  omnidirectional locomotion characterization, traversal across heterogeneous terrestrial environments,
                  aquatic surface locomotion, land-water transitions, and deliberate obstacle interactions. These
                  experiments demonstrate how a single enclosed mechanical architecture can combine omnidirectional
                  mobility, cross-medium locomotion, and tolerance to environmental contact. MARBLE provides a compact
                  design for field mobility across heterogeneous terrain, obstacles, and land-water transitions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fig. 1: Cross-medium locomotion */}
          <Card className="mb-8">
            <CardHeader>
              <SectionTitle>Cross-Medium Amphibious Locomotion</SectionTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                MARBLE navigates amphibious environments without hardware reconfiguration, using one locomotion system.
              </p>
              <figure>
                <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
                  <div className="md:col-span-2 md:row-span-2">
                    <MarbleVideo
                      src="/marble/videos/fig1a-land-to-water.mp4"
                      poster="/marble/posters/fig1a.jpg"
                      title="Land-to-water entry"
                      label="(a) Land-to-water entry"
                      fill
                      className="aspect-video md:aspect-auto"
                    />
                  </div>
                  <MarbleVideo
                    src="/marble/videos/fig1b-terrestrial.mp4"
                    poster="/marble/posters/fig1b.jpg"
                    title="Terrestrial rolling"
                    label="(b) Terrestrial rolling"
                  />
                  <MarbleVideo
                    src="/marble/videos/fig1c-water.mp4"
                    poster="/marble/posters/fig1c.jpg"
                    title="Water-surface propulsion"
                    label="(c) Water propulsion"
                  />
                </div>
                <Caption label="Fig. 1.">
                  Videos of MARBLE showing (a) land-to-water entry, (b) terrestrial rolling, and (c) water-surface
                  propulsion. The same internal mass-actuation mechanism produces motion on land and water without
                  mechanical reconfiguration.
                </Caption>
              </figure>
            </CardContent>
          </Card>

          {/* Fig. 2: Mechanical design */}
          <Card id="design" className="mb-8">
            <CardHeader>
              <SectionTitle>Mechanical Design and Locomotion</SectionTitle>
            </CardHeader>
            <CardContent>
              <figure>
                <FigurePanel>
                  <Image
                    src="/marble/figures/fig2-mechanical.png"
                    width={2400}
                    height={708}
                    alt="(a) Linear mass-slider module. (b) Internal configuration with three orthogonal sliders and the electronics capsule. (c) Internal frame without the outer shell. (d) Complete robot with the sealed shell and passive fins."
                    className="h-auto w-full"
                  />
                </FigurePanel>
                <Caption label="Fig. 2.">
                  Mechanical design of MARBLE. (a) Linear mass-slider module. (b) Internal configuration with three
                  orthogonal sliders and the electronics capsule. (c) Internal frame without the outer shell. (d) Complete
                  robot with the sealed shell and passive fins.
                </Caption>
              </figure>

              <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Internal Mass Redistribution</h3>
                  <p className="text-muted-foreground">
                    Three orthogonal mass sliders change MARBLE&apos;s center of mass dynamically to induce rolling. All
                    active actuation mechanisms are fully enclosed within a sealed spherical shell.
                  </p>
                  <p className="mt-3 text-muted-foreground">
                    The shell acts as a buoyancy device on water, while symmetrically distributed exterior fins act as
                    passive paddles to propel the robot when operating on the water surface.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Robot Specifications</h3>
                  <Table>
                    <TableBody>
                      {specs.map(([label, value]) => (
                        <TableRow key={label}>
                          <TableCell className="px-0 py-2.5 text-muted-foreground">{label}</TableCell>
                          <TableCell className="px-0 py-2.5 text-right font-medium tabular-nums">{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <figure className="mt-10">
                <h3 className="mb-3 font-semibold">Interactive CAD Model</h3>
                <MarbleViewer3D />
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  Interactive 3D mechanical model showing slider movement and hardware configuration.
                </figcaption>
              </figure>
            </CardContent>
          </Card>

          {/* Fig. 3: Locomotion principle */}
          <Card className="mb-8">
            <CardHeader>
              <SectionTitle>Locomotion Principle &amp; Simulation</SectionTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Displacing the internal slider masses offsets the robot&apos;s center of gravity from the geometric shell
                center, creating a gravitational moment about the ground contact that rolls the shell.
              </p>
              <figure>
                <FigurePanel>
                  <Image
                    src="/marble/figures/fig3-principle.svg"
                    width={894}
                    height={174}
                    alt="Displacing the internal slider masses offsets the center of gravity from the shell center, and the resulting moment about the ground contact rolls the shell"
                    className="mx-auto h-auto w-full max-w-4xl"
                  />
                </FigurePanel>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {simulations.map((sim) => (
                    <div key={sim.key}>
                      <MarbleVideo
                        src={`/marble/videos/fig3-${sim.key}.mp4`}
                        poster={`/marble/posters/fig3-${sim.key}.jpg`}
                        title={`Simulation: ${sim.medium.toLowerCase()}, ${sim.controller} controller`}
                        aspect="1/1"
                      />
                      <p className="mt-2 text-center text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{sim.medium}</span> &middot; {sim.controller}
                      </p>
                    </div>
                  ))}
                </div>
                <Caption label="Fig. 3.">
                  Top: displacing the internal slider masses offsets the center of gravity from the shell center, and the
                  resulting moment about the ground contact rolls the shell. Below: simulation of ground and water-surface
                  locomotion at a commanded 0.5 m/s using geometric and learned controllers, sampled at the same instants.
                  The transparent shell shows the three sliding masses, colored one per rail. The quartered circle denotes
                  their center of gravity, the red dot the shell center, and the blue arrow the heading direction.
                </Caption>
              </figure>
            </CardContent>
          </Card>

          {/* Fig. 4: Field experiments */}
          <Card id="experiments" className="mb-8">
            <CardHeader>
              <SectionTitle>Field Experiments &amp; Quantitative Characterization</SectionTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Real-world trials characterising speed, range, and stability across land, water, and transition
                boundaries.
              </p>
              <figure>
                <div className="grid gap-8 md:grid-cols-3 md:gap-5">
                  {trials.map((trial) => (
                    <div key={trial.key} className="flex flex-col gap-3">
                      <MarbleVideo
                        src={trial.video}
                        poster={trial.poster}
                        title={trial.title}
                        label={trial.label}
                        note={trial.note}
                      />
                      <FigurePanel className="p-1 sm:p-1.5">
                        <Image
                          src={trial.traj}
                          width={1300}
                          height={867}
                          alt={`Planar position trajectory, ${trial.key} locomotion`}
                          className="h-auto w-full"
                        />
                      </FigurePanel>
                      <Stats items={trial.stats} className="mt-auto" />
                    </div>
                  ))}
                </div>
                <Caption label="Fig. 4.">
                  Terrestrial, aquatic, and transitional locomotion of MARBLE. Top row: representative trial videos. Middle
                  row: planar position trajectories for (a) terrestrial, (b) aquatic, and (c) transitional locomotion.
                  Trajectory color indicates temporal progression, while the circle and cross mark the start and end
                  positions, respectively.
                </Caption>
              </figure>

              {/* Fig. 5 */}
              <h3 className="mb-2 mt-12 font-semibold">Omnidirectional Velocity Characterization</h3>
              <p className="mb-6 text-muted-foreground">
                Comparing the learned reinforcement learning policy versus the baseline geometric controller under joystick
                velocity tracking.
              </p>
              <figure>
                <div className="grid gap-8 md:grid-cols-2 md:gap-5">
                  {controllers.map((c) => (
                    <div key={c.key} className="flex flex-col gap-3">
                      <h4 className="text-sm font-semibold">{c.heading}</h4>
                      <MarbleVideo src={c.video} poster={c.poster} title={c.title} badge="6×" />
                      <FigurePanel>
                        <Image src={c.figure} width={1400} height={997} alt={c.alt} className="h-auto w-full" />
                      </FigurePanel>
                      <Stats items={c.stats} className="mt-auto" />
                    </div>
                  ))}
                </div>
                <Caption label="Fig. 5.">
                  Measured velocity vectors under joystick commands for (a) the learned controller and (b) the geometric
                  controller. Velocities are estimated by numerical differentiation of camera-relative trajectories and
                  plotted from a common origin. Each panel contains 7,568 samples with identical axis and color scales.
                </Caption>
              </figure>

              {/* Fig. 6 */}
              <h3 className="mb-2 mt-12 font-semibold">Obstacle Interaction with Direct Shell Contact</h3>
              <p className="mb-6 text-muted-foreground">
                MARBLE&apos;s enclosed actuation architecture creates an inherently contact-tolerant design that can
                negotiate obstacle contact without external mechanism exposure or damage.
              </p>
              <figure>
                <MarbleVideo
                  src="/marble/videos/fig6-buoy-push.mp4"
                  poster="/marble/posters/fig6-buoy-push.jpg"
                  title="Obstacle interaction with a floating buoy"
                />
                <FigurePanel className="mt-3">
                  <Image
                    src="/marble/figures/fig6-sequence.jpg"
                    width={2400}
                    height={670}
                    alt="Time-lapse of MARBLE approaching, contacting, and pushing a red buoy"
                    className="h-auto w-full"
                  />
                </FigurePanel>
                <Caption label="Fig. 6.">
                  Representative time-lapse sequence of obstacle interaction showing approach, direct shell contact, and
                  continuous interaction with the buoy (red).
                </Caption>
              </figure>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card className="mb-8">
            <CardHeader>
              <SectionTitle>Additional Trials &amp; Field Photography</SectionTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <figure>
                  <MarbleVideo
                    src="/marble/videos/early-indoor-no-shell.mp4"
                    poster="/marble/posters/early-indoor-no-shell.jpg"
                    title="Early indoor tests without the shell"
                    aspect="4/3"
                  />
                  <figcaption className="mt-2 text-sm text-muted-foreground">Early indoor trials (no shell)</figcaption>
                </figure>
                {gallery.map((photo) => (
                  <figure key={photo.src}>
                    <div className="relative aspect-[4/3] overflow-hidden border bg-muted">
                      <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                    </div>
                    <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card id="team" className="mb-8">
            <CardHeader>
              <SectionTitle>Project Team</SectionTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => {
                  const inner = (
                    <>
                      <Image
                        src={member.photo}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 flex-shrink-0 border object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block font-semibold group-hover:text-primary">
                          {member.name}
                          {member.equal && <span className="ml-0.5 font-normal text-muted-foreground">*</span>}
                        </span>
                        <span className="block text-sm text-muted-foreground">Duke University</span>
                      </span>
                    </>
                  )
                  const cls = "group flex items-center gap-4 border p-3 transition-colors hover:border-primary"
                  return (
                    <li key={member.name}>
                      {member.href.startsWith("/") ? (
                        <Link href={member.href} className={cls}>
                          {inner}
                        </Link>
                      ) : (
                        <a href={member.href} target="_blank" rel="noopener noreferrer" className={cls}>
                          {inner}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">* These authors contributed equally to this work.</p>
            </CardContent>
          </Card>

          {/* Citation */}
          <Card id="citation" className="mb-8">
            <CardHeader>
              <SectionTitle>Citation</SectionTitle>
            </CardHeader>
            <CardContent>
              <CopyBibtex citation={citation} />
            </CardContent>
          </Card>

          {/* Acknowledgment */}
          <Card>
            <CardHeader>
              <SectionTitle>Acknowledgment</SectionTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This work was conducted at the General Robotics Lab, Duke University. This work is supported by DARPA
                TIAMAT program under award HR00112490419, and ARO under award W911NF2410405.
              </p>
            </CardContent>
          </Card>
        </div>
      </MarbleMediaProvider>
    </div>
  )
}
