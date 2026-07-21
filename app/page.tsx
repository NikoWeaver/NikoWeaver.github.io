import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  Linkedin,
  Mail,
  Download,
  Bot,
  Printer,
  Cog,
  Wrench,
  Zap,
  Ruler,
  Cpu,
  CircuitBoard,
  Box,
  Flame,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubAnalytics } from "@/components/github-analytics"

const skillGroups = [
  {
    label: "CAD & Simulation",
    skills: [
      { name: "Fusion 360", detail: "CAD, CAM & FEA", logo: "/logos/fusion360.png" },
      { name: "SolidWorks", detail: "CAD", logo: "/logos/solidworks.svg" },
      { name: "Siemens NX", detail: "CAD", logo: "/logos/siemens-nx.png" },
      { name: "Ansys", detail: "Fluent CFD", logo: "/logos/ansys.png" },
      { name: "MATLAB", detail: "Simulink & kinematics", logo: "/logos/matlab.png" },
      { name: "MuJoCo", detail: "Physics simulation", icon: Box },
    ],
  },
  {
    label: "Manufacturing",
    skills: [
      { name: "3D Printing", detail: "FDM & SLA", icon: Printer },
      { name: "CNC Machining", detail: "CAM & G-code", icon: Cog },
      { name: "Manual Machining", detail: "Milling & turning", icon: Wrench },
      { name: "Laser Cutting", detail: "2D fabrication", icon: Zap },
      { name: "GD&T", detail: "Drawings & tolerancing", icon: Ruler },
    ],
  },
  {
    label: "Electronics & Embedded",
    skills: [
      { name: "KiCad", detail: "PCB & circuit design", logo: "/logos/kicad.svg" },
      { name: "STM32 & ESP32", detail: "Microcontrollers", icon: Cpu },
      { name: "Arduino C++", detail: "Embedded control", logo: "/logos/arduino.svg" },
      { name: "Comm Protocols", detail: "CAN, I2C, SPI, UART", icon: CircuitBoard },
    ],
  },
  {
    label: "Code & Controls",
    skills: [
      { name: "Python", detail: "RL & scripting", logo: "/logos/python.svg" },
      { name: "PyTorch", detail: "Reinforcement learning", icon: Flame },
      { name: "Java", detail: "General programming", logo: "/logos/java.svg" },
      { name: "Git", detail: "Version control", icon: GitBranch },
      { name: "Agentic Coding", detail: "AI-assisted dev", icon: Bot },
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

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>
  )
}

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
          <p className="mt-3 max-w-xl text-muted-foreground">
            I design, build, and fly things &mdash; UAVs, autonomous underwater robots, and guided rockets.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/NikoWeaverResume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
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
              Hello! I&apos;m Niko Weaver, a Mechanical Engineering student at Duke University pursuing an Aerospace
              Engineering certificate. My work centers on aerospace and robotics: I lead the 50-member Duke Robotics
              Club as president, do research on underwater robots in the Duke General Robotics Lab, and spent last
              summer designing a wind-tunnel robot arm at the University of Utah.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I learn best by building. Right now that means version 2 of my fully 3D-printed UAV &mdash; flight 1 is
              in the books, and flight 2 is coming this summer. When I&apos;m not in the shop, I play guitar, ski, and
              build rockets.
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
                  Fully 3D printed, $1100 Duke Colab grant, 400g airframe. V2 nearly doubles the thrust of V1
                  (1.3kg &rarr; 2.5kg) &mdash; flight 2 coming summer 2026.
                </p>
                <TechTags tags={["Fusion 360", "Ansys CFD", "ArduPilot"]} />
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
                  Designed key structural components and cut simulated drag by 29% with a redesigned buoyancy
                  system. Placed 7th overall at RoboSub 2025 with a 3rd-place design report.
                </p>
                <TechTags tags={["SolidWorks", "Ansys Fluent", "CNC Milling"]} />
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
                <TechTags tags={["MATLAB/Simulink", "Inverse Kinematics", "CAD"]} />
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
                <TechTags tags={["Team Leadership", "CAD", "Drivetrain Design"]} />
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
                <TechTags tags={["Arduino C++", "PID Control", "OpenRocket"]} />
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

      {/* GitHub Analytics Section */}
      <GitHubAnalytics />

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
            <a href="tel:+16178521905" className="text-primary hover:underline">
              +1 (617) 852-1905
            </a>
            <span className="mx-2">&middot;</span>
            <a href="mailto:niko.weaver@duke.edu" className="text-primary hover:underline">
              niko.weaver@duke.edu
            </a>
            <span className="mx-2">&middot;</span>
            <a
              href="https://linkedin.com/in/niko-weaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              linkedin.com/in/niko-weaver
            </a>
          </p>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Education
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Duke University, Durham NC</h3>
              <p className="text-sm text-muted-foreground">Expected May 2028</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>B.S.E. Mechanical Engineering; Aerospace Engineering Certificate</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Waterford School, Sandy UT</h3>
              <p className="text-sm text-muted-foreground">Aug. 2020 &ndash; June 2024</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>High School Diploma, Summa Cum Laude</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Experience
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">President</h3>
              <p className="text-sm text-muted-foreground">Sep. 2024 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke Robotics Club</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Leading a 50 member club to build autonomous underwater robots for the annual international RoboSub Competition. Coordinating mechanical, electrical, and software integration.</li>
              <li>Designed an AUV frame, hydrodynamic shell, and buoyancy system, reducing simulated drag by 29% in Ansys Fluent.</li>
              <li>Contributed to a 7th-place overall finish at RoboSub 2025 and a 3rd-place design report.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Researcher</h3>
              <p className="text-sm text-muted-foreground">Aug. 2025 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Duke University General Robotics Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Lead the electromechanical design of an underwater spherical robot and the preparation of a manuscript describing the platform.</li>
              <li>Designed a custom PCB in KiCad that cut electronics-enclosure volume by 55% and robot mass by 0.5 kg (17%).</li>
              <li>Develop locomotion and underwater communication methods for coordinated multi-robot operation.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Research Intern</h3>
              <p className="text-sm text-muted-foreground">May 2025 &ndash; Aug. 2025</p>
            </div>
            <p className="text-sm text-muted-foreground">University of Utah FPC Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed a custom 4-axis robotic arm to position test models within a constrained wind-tunnel workspace.</li>
              <li>Built a MATLAB/Simulink model to simulate real-time motion and automate torque and drag data acquisition and analysis.</li>
              <li>Optimized actuator selection and link lengths against workspace and torque constraints.</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Projects
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Fixed-Wing UAV</h3>
              <p className="text-sm text-muted-foreground">Summer 2025 &ndash; Present</p>
            </div>
            <p className="text-sm text-muted-foreground">Fusion 360, Ansys Fluent, ArduPilot</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Secured $1,100 in Duke Co-Lab grant funding; designed and built three airframe revisions, increasing simulated lift by 25%.</li>
              <li>Analyzed an initial flight test that exposed a thrust deficit; redesigned the airframe and propulsion system, raising predicted thrust-to-weight ratio from 0.6&ndash;0.7 to 1.4 and cutting estimated mass from 2.0 kg to 1.75 kg.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Underwater Robot Locomotion</h3>
              <p className="text-sm text-muted-foreground">Summer 2026</p>
            </div>
            <p className="text-sm text-muted-foreground">MuJoCo, PyTorch, Python</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Built a MuJoCo digital twin for controller iteration and sim-to-real development.</li>
              <li>Trained PyTorch reinforcement-learning policies and benchmarked locomotion performance against a heuristic controller.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Canard-Controlled Rocket</h3>
              <p className="text-sm text-muted-foreground">2023</p>
            </div>
            <p className="text-sm text-muted-foreground">Fusion 360, OpenRocket, Arduino C++</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed and manufactured a 1 m rocket with independently actuated canards and an Arduino-based 3-axis PID controller.</li>
              <li>Implemented a 1 kHz control loop with IMU-based state estimation, apogee detection, and parachute-deployment logic; traced partial engine ignition during flight testing to an ignition-wiring fault.</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 font-display text-sm font-semibold uppercase text-muted-foreground">
            Technical Skills
          </h2>
          <p className="mb-2 text-muted-foreground">
            <strong className="font-semibold text-foreground">CAD &amp; Simulation:</strong> Fusion 360, SolidWorks, Siemens NX, Ansys Fluent (CFD), FEA, MATLAB/Simulink, MuJoCo
          </p>
          <p className="mb-2 text-muted-foreground">
            <strong className="font-semibold text-foreground">Manufacturing:</strong> CNC machining, manual milling &amp; turning, FDM/SLA 3D printing, laser cutting, CAM, G-code, GD&amp;T
          </p>
          <p className="mb-2 text-muted-foreground">
            <strong className="font-semibold text-foreground">Electronics &amp; Embedded:</strong> KiCad, PCB &amp; circuit design, STM32, ESP32, Arduino, CAN, I2C, SPI, UART
          </p>
          <p className="mb-2 text-muted-foreground">
            <strong className="font-semibold text-foreground">Programming &amp; Robotics:</strong> Python, C++, PyTorch, ArduPilot, Git
          </p>
          <p className="text-muted-foreground">
            <strong className="font-semibold text-foreground">Other:</strong> Systems integration, technical writing, team leadership, Spanish biliteracy
          </p>
        </div>
      </section>
    </div>
  )
}
