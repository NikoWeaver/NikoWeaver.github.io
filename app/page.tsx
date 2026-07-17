import Link from "next/link"
import Image from "next/image"
import { Phone, Linkedin, Mail, Download, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const skillGroups = [
  {
    label: "CAD & Simulation",
    skills: [
      { name: "Fusion 360", detail: "CAD, CAM & FEA", logo: "/logos/fusion360.png" },
      { name: "SolidWorks", detail: "CAD", logo: "/logos/solidworks.svg" },
      { name: "Siemens NX", detail: "CAD", logo: "/logos/siemens-nx.png" },
      { name: "Ansys", detail: "Fluent CFD", logo: "/logos/ansys.png" },
      { name: "KiCad", detail: "PCB design", logo: "/logos/kicad.svg" },
    ],
  },
  {
    label: "Code & Controls",
    skills: [
      { name: "MATLAB", detail: "Simulation & kinematics", logo: "/logos/matlab.png" },
      { name: "Python", detail: "RL & scripting", logo: "/logos/python.svg" },
      { name: "Java", detail: "General programming", logo: "/logos/java.svg" },
      { name: "Arduino C++", detail: "Embedded control", logo: "/logos/arduino.svg" },
      { name: "Agentic Coding", detail: "AI-assisted development", icon: Bot },
    ],
  },
  {
    label: "Design",
    skills: [
      { name: "Photoshop", detail: "Photo editing", logo: "/logos/photoshop.svg" },
      { name: "Illustrator", detail: "Vector graphics", logo: "/logos/illustrator.svg" },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section id="home" className="relative">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Niko Weaver
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Mechanical Engineering Student at{" "}
            <span className="font-medium text-[#00539B] dark:text-[#4ea3e0]">Duke University</span>
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { href: "tel:+16178521905", label: "617-852-1905", sr: "Phone", Icon: Phone, external: false },
              {
                href: "https://www.linkedin.com/in/niko-weaver/",
                label: "linkedin.com/in/niko-weaver",
                sr: "LinkedIn",
                Icon: Linkedin,
                external: true,
              },
              { href: "mailto:nikoweaver@gmail.com", label: "nikoweaver@gmail.com", sr: "Email", Icon: Mail, external: false },
            ].map(({ href, label, sr, Icon, external }) => (
              <div key={sr} className="group relative">
                <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <Button variant="outline" size="icon">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{sr}</span>
                  </Button>
                </a>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border bg-popover px-2.5 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-all duration-150 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <p className="text-lg text-muted-foreground">
              Hello! I&apos;m Niko Weaver, a Mechanical Engineering student at Duke University. I am really interested in
              Aerospace and Robotics! I love to play Guitar, Ski and build Rockets
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I&apos;m a very curious person, and I always love to learn new things. Right now I&apos;m working on my UAV project
              and have one flight in the books!
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="#projects">View My Projects</Link>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <figure>
              <Image
                src="https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_0171.JPG"
                alt="Niko Weaver"
                width={280}
                height={350}
                className="rounded-md object-cover shadow-md ring-1 ring-border"
              />
              <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                Somewhere with better weather than the machine shop
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Engineering Projects</h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Some flew, one swam, one exploded. Every one of them taught me something.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* UAV Project */}
          <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <Link href="/uav-project" className="block">
              <div className="relative aspect-video">
                <Image
                  src="https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_1814.JPG"
                  alt="UAV Design"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>UAV Design Project</CardTitle>
                <CardDescription>Aerodynamic UAV Design and Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fully 3D printed, $1050 Duke Colab grant, 400g airframe. V2 nearly doubles the thrust of V1
                  (1.3kg &rarr; 2.5kg) &mdash; flight 2 coming summer 2026.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* Underwater AUV Project */}
          <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <Link href="/underwater-rov" className="block">
              <div className="relative aspect-video">
                <Image
                  src="/images/minibot-20render.png"
                  alt="Underwater ROV"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Underwater AUV</CardTitle>
                <CardDescription>Duke Robotics Club - RoboSub Competition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed key structural components and cut drag by 30% with a redesigned buoyancy system. Placed
                  7th overall at RoboSub 2025.
                </p>
                <div className="mt-3 inline-block rounded-md bg-neutral-900 px-3 py-2 dark:bg-transparent dark:px-0 dark:py-0">
                  <Image
                    src="https://duke-robotics.com/wp-content/uploads/2024/03/cropped-retro-logo-fullwhite-1-1-1.png"
                    alt="Duke Robotics Club Logo"
                    width={280}
                    height={40}
                  />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Wind Tunnel Translation Project */}
          <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <Link href="/wind-tunnel-translation" className="block">
              <div className="relative aspect-video bg-muted">
                <Image
                  src="https://fpc.mech.utah.edu/wp-content/uploads/2024/03/logo_fpc.png"
                  alt="Wind Tunnel Robot Arm"
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Wind Tunnel Translation Project</CardTitle>
                <CardDescription>University of Utah - 4-Axis Robot Arm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed and optimized a 4-axis robot arm to translate models in a wind tunnel. Used MATLAB for
                  inverse kinematics and real-time control simulation.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* FRC Robot Project */}
          <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <Link href="/frc-robot" className="block">
              <div className="relative aspect-video">
                <Image
                  src="/images/3245bot.jpeg"
                  alt="FRC Robot"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>FRC Robotics Competition</CardTitle>
                <CardDescription>Team 3245 Competition Robot</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Led the mechanical design of Team 3245&apos;s 2024 robot: shooter, pivot, and a 26&quot;&times;26&quot; swerve
                  drivebase. Took home two regional awards.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* Model Rocket Project */}
          <Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
            <Link href="/model-rocket" className="block">
              <div className="relative aspect-video">
                <Image
                  src="/images/rocket111.jpeg"
                  alt="Model Rocket"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Model Rocket Development</CardTitle>
                <CardDescription>Custom Rocket Design and Construction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  1-meter canard-guided rocket with 3-axis PID control. Flown in the Bonneville Salt Flats, December
                  2023 &mdash; half the engines ignited, resulting in an RUD (Rapid Unscheduled Disassembly).
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Skills</h2>

          <div className="mx-auto max-w-4xl space-y-10">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="eyebrow mb-4 text-center text-xs font-semibold uppercase text-muted-foreground">
                  {group.label}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex w-56 items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:border-primary/50"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-background p-2 ring-1 ring-border dark:bg-white/90">
                        {"logo" in skill ? (
                          <img src={skill.logo} alt="" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <skill.icon className="h-6 w-6 text-neutral-700" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{skill.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{skill.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Resume</h2>
        <div className="max-w-3xl mx-auto bg-card text-card-foreground p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="font-display text-3xl font-bold">Niko Weaver</p>
            <Button asChild className="flex items-center gap-2">
              <a href="/NikoWeaverResume.pdf" target="_blank" rel="noopener noreferrer" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          <p className="mb-8 text-sm text-muted-foreground">
            <a
              href="https://linkedin.com/in/niko-weaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              linkedin.com/in/niko-weaver
            </a>
            <span className="mx-2">&middot;</span>
            <a href="tel:+16178521905" className="text-primary hover:underline">
              +1 (617) 852-1905
            </a>
            <span className="mx-2">&middot;</span>
            <a href="mailto:nikoweaver@gmail.com" className="text-primary hover:underline">
              nikoweaver@gmail.com
            </a>
          </p>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Education
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Duke University, Durham NC</h3>
              <p className="text-sm text-muted-foreground">Expected Spring 2028</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Bachelor of Science in Engineering</li>
              <li>Major in Mechanical Engineering, Aerospace Certificate, Minor in Math</li>
              <li>Relevant coursework: Space Systems Design, Thermodynamics, Mechatronics, Dynamics</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Waterford School, Sandy UT</h3>
              <p className="text-sm text-muted-foreground">August 2020 &ndash; June 2024</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>High school diploma, Summa Cum Laude</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Technical Skills
          </h2>
          <p className="mb-2 text-muted-foreground">
            <strong className="font-semibold text-foreground">Software:</strong> Autodesk Fusion CAD, CAM, FEA; Siemens NX CAD; Solidworks CAD; Ansys Fluent CFD; Adobe Photoshop, Illustrator; Microsoft Office suite; Agentic coding
          </p>
          <p className="mb-8 text-muted-foreground">
            <strong className="font-semibold text-foreground">Languages:</strong> MATLAB, Python, Java, Arduino C++
          </p>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Projects
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Reinforcement Learning with MuJoCo</h3>
              <p className="text-sm text-muted-foreground">Summer 2026</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke General Robotics Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Developed a digital twin of my robot in MuJoCo to enable iterative control strategy testing and bridge the sim-to-real gap.</li>
              <li>Trained RL policies to automate and improve locomotion over a heuristic policy.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Autonomous UAV</h3>
              <p className="text-sm text-muted-foreground">Summer 2025 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke Co-Lab grant project</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Engineered an autonomous UAV through three design iterations, leveraging CFD analysis to optimize wing geometry and enhance flight endurance.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">RoboSub AUV &mdash; Duke Robotics Club</h3>
              <p className="text-sm text-muted-foreground">Fall 2024 &ndash; Present</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Led design for primary structural components; redesigned the buoyancy system using CAD/FEA simulation, reducing drag by 30% and improving control.</li>
              <li>7th Place Overall at RoboSub 2025 and 3rd Best Design Report.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Self-Guided Rocket</h3>
              <p className="text-sm text-muted-foreground">Summer 2023</p>
            </div>
            <p className="text-sm text-muted-foreground">Independent project</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed, manufactured, and test-flew a 1-meter canard-guided rocket.</li>
              <li>Implemented a closed-loop control system using IMU sensors and Arduino to maintain stable flight trajectories during high-velocity maneuvers.</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Experience
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Researcher</h3>
              <p className="text-sm text-muted-foreground">Fall 2025 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke University General Robotics Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Leading the design of an underwater rolling robot, in preparation for publication.</li>
              <li>Developing novel locomotion and communication methods for swarm robotics.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">President</h3>
              <p className="text-sm text-muted-foreground">Fall 2024 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke Robotics Club</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Leading a 50-member club building autonomous underwater robots for the international RoboSub competition.</li>
              <li>Leading new AUV development for the RoboSub 2027 competition, managing systems integration and performance testing.</li>
              <li>Coordinating cross-functional teams across mechanical, electrical, and software disciplines to ensure cohesive architecture.</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Intern</h3>
              <p className="text-sm text-muted-foreground">Summer 2025</p>
            </div>
            <p className="text-sm text-muted-foreground">University of Utah FPC Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed a custom 4-axis robot arm for wind tunnel model manipulation.</li>
              <li>Developed MATLAB scripts to simulate real-time operation and automate the collection/analysis of torque and drag data, accelerating testing cycles.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
