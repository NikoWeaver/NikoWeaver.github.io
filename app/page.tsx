import Link from "next/link"
import Image from "next/image"
import { Phone, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillGroups = [
  {
    label: "CAD & Simulation",
    skills: [
      { name: "Fusion 360", detail: "CAD, CAM & FEA", logo: "/logos/fusion360.png" },
      { name: "SolidWorks", detail: "CAD", logo: "/logos/solidworks.svg" },
      { name: "Siemens NX", detail: "CAD", logo: "/logos/siemens-nx.png" },
      { name: "Ansys", detail: "Fluent CFD", logo: "/logos/ansys.png" },
      { name: "MATLAB", detail: "Simulink & kinematics", logo: "/logos/matlab.png" },
      { name: "MuJoCo", detail: "Physics simulation", logo: "/logos/mujoco.png" },
    ],
  },
  {
    label: "Manufacturing",
    skills: [
      { name: "3D Printing", detail: "FDM & SLA" },
      { name: "CNC Machining", detail: "CAM & G-code" },
      { name: "Manual Machining", detail: "Milling & turning" },
      { name: "Laser Cutting", detail: "2D fabrication" },
      { name: "GD&T", detail: "Drawings & tolerancing" },
    ],
  },
  {
    label: "Electronics & Embedded",
    skills: [
      { name: "KiCad", detail: "PCB & circuit design", logo: "/logos/kicad.svg" },
      { name: "STM32", detail: "ARM microcontrollers", logo: "/logos/stm32.svg" },
      { name: "ESP32", detail: "Wi-Fi microcontrollers", logo: "/logos/esp32.svg" },
      { name: "Arduino C++", detail: "Embedded control", logo: "/logos/arduino.svg" },
      { name: "Comm Protocols", detail: "CAN, I2C, SPI, UART" },
    ],
  },
  {
    label: "Code & Controls",
    skills: [
      { name: "Python", detail: "RL & scripting", logo: "/logos/python.svg" },
      { name: "PyTorch", detail: "Reinforcement learning", logo: "/logos/pytorch.svg" },
      { name: "Java", detail: "General programming", logo: "/logos/java.svg" },
      { name: "Git", detail: "Version control", logo: "/logos/git.svg" },
      { name: "Agentic Coding", detail: "AI-assisted dev" },
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
      {/* Intro */}
      <section id="home" className="container mx-auto px-6 pb-10 pt-16 sm:px-8 md:pb-12 md:pt-20 lg:px-8">
        <h1 className="intro-title display-title font-display text-foreground">
          Niko Weaver
        </h1>
        <p className="intro-role mt-4 text-lg sm:text-xl">
          Mechanical Engineering Student at{" "}
          <span className="font-medium text-primary">Duke University</span>
        </p>
        <p className="intro-summary mt-3 max-w-xl text-muted-foreground">
          I design, build, and fly things &mdash; UAVs, autonomous underwater robots, and guided rockets.
        </p>
        <div className="mt-7 max-w-2xl">
          <h2 className="text-base font-semibold">What I&apos;m up to right now</h2>
          <p className="mt-2 text-muted-foreground">
            I&apos;m studying abroad in Madrid right now! I&apos;m taking classes at IES Madrid and UC3M,
            and working on DRC and GRL projects remotely!
          </p>
          <p lang="es" className="mt-3 italic text-muted-foreground">
            Me gusta España, ¡pero me hace mucha ilusión volver a Duke en primavera para seguir con mis proyectos de ingeniería!
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {[
            { href: "tel:+16178521905", label: "617-852-1905", Icon: Phone, external: false },
            {
              href: "https://www.linkedin.com/in/niko-weaver/",
              label: "LinkedIn",
              Icon: Linkedin,
              external: true,
            },
            { href: "mailto:nikoweaver@gmail.com", label: "nikoweaver@gmail.com", Icon: Mail, external: false },
          ].map(({ href, label, Icon, external }) => (
            <Button
              key={label}
              asChild
              variant="outline"
              className="contact-link rounded-sm"
            >
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {label}
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto px-6 pb-16 sm:px-8 lg:px-8">
        <div className="section-rule">
          <h2>see my projects!</h2>
        </div>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {/* UAV Project */}
          <Card className="project-card group border-0 border-b bg-transparent shadow-none">
            <Link href="/uav-project" aria-labelledby="project-uav" className="project-link">
              <div className="project-image relative aspect-video">
                <Image
                  src="https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_1814.JPG"
                  alt="Niko’s fixed-wing UAV on the grass at its first flight test"
                  priority
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="project-header p-0 pb-2.5 pt-5">
                <CardTitle id="project-uav" className="project-title">UAV Design Project</CardTitle>
              </CardHeader>
              <CardContent className="project-content p-0 pb-5">
                <p className="project-description text-muted-foreground">
                  Fully 3D printed, $1100 Duke Colab grant, 400g airframe. V2 nearly doubles the thrust of V1
                  (1.3kg &rarr; 2.5kg) &mdash; flight 2 coming summer 2026.
                </p>
                <span className="project-action">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </CardContent>
            </Link>
          </Card>

          {/* Underwater AUV Project */}
          <Card className="project-card group border-0 border-b bg-transparent shadow-none">
            <Link href="/underwater-rov" aria-labelledby="project-auv" className="project-link">
              <div className="project-image relative aspect-video">
                <Image
                  src="/images/minibot-20render.png"
                  alt="CAD rendering of the RoboSub autonomous underwater vehicle"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="project-header p-0 pb-2.5 pt-5">
                <CardTitle id="project-auv" className="project-title">Underwater AUV</CardTitle>
              </CardHeader>
              <CardContent className="project-content p-0 pb-5">
                <p className="project-description text-muted-foreground">
                  Designed key structural components and cut simulated drag by 29% with a redesigned buoyancy
                  system. Placed 7th overall at RoboSub 2025 with a 3rd-place design report.
                </p>
                <span className="project-action">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </CardContent>
            </Link>
          </Card>

          {/* Wind Tunnel Translation Project */}
          <Card className="project-card group border-0 border-b bg-transparent shadow-none">
            <Link href="/wind-tunnel-translation" aria-labelledby="project-wind-tunnel" className="project-link">
              <div className="project-image project-image--logo relative aspect-video">
                <Image
                  src="https://fpc.mech.utah.edu/wp-content/uploads/2024/03/logo_fpc.png"
                  alt="University of Utah Flow Physics and Control Lab logo"
                  fill
                  className="object-contain p-8"
                />
              </div>
              <CardHeader className="project-header p-0 pb-2.5 pt-5">
                <CardTitle id="project-wind-tunnel" className="project-title">Wind Tunnel Translation Project</CardTitle>
              </CardHeader>
              <CardContent className="project-content p-0 pb-5">
                <p className="project-description text-muted-foreground">
                  Designed and optimized a 4-axis robot arm to translate models in a wind tunnel. Used MATLAB for
                  inverse kinematics and real-time control simulation.
                </p>
                <span className="project-action">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </CardContent>
            </Link>
          </Card>

          {/* FRC Robot Project */}
          <Card className="project-card group border-0 border-b bg-transparent shadow-none">
            <Link href="/frc-robot" aria-labelledby="project-frc" className="project-link">
              <div className="project-image relative aspect-video">
                <Image
                  src="/images/3245bot.jpeg"
                  alt="FRC Robot"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="project-header p-0 pb-2.5 pt-5">
                <CardTitle id="project-frc" className="project-title">First Robotics Competition</CardTitle>
              </CardHeader>
              <CardContent className="project-content p-0 pb-5">
                <p className="project-description text-muted-foreground">
                  Led the mechanical design of Team 3245&apos;s 2024 robot: shooter, pivot, and a 26&quot;&times;26&quot; swerve
                  drivebase. Took home two regional awards.
                </p>
                <span className="project-action">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </CardContent>
            </Link>
          </Card>

          {/* Model Rocket Project */}
          <Card className="project-card group border-0 border-b bg-transparent shadow-none">
            <Link href="/model-rocket" aria-labelledby="project-rocket" className="project-link">
              <div className="project-image relative aspect-video">
                <Image
                  src="/images/rocket111.jpeg"
                  alt="Model Rocket"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="project-header p-0 pb-2.5 pt-5">
                <CardTitle id="project-rocket" className="project-title">Model Rocket Development</CardTitle>
              </CardHeader>
              <CardContent className="project-content p-0 pb-5">
                <p className="project-description text-muted-foreground">
                  1-meter canard-guided rocket with 3-axis PID control. Flown in the Bonneville Salt Flats, December
                  2023 &mdash; half the engines ignited, resulting in an RUD (Rapid Unscheduled Disassembly).
                </p>
                <span className="project-action">View project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </CardContent>
            </Link>
          </Card>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-8">
          <h2 className="mb-12 text-center section-title display-title font-display">Skills</h2>

          <div className="mx-auto max-w-4xl space-y-10">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="skill-group-title eyebrow mb-4 text-center text-xs font-semibold uppercase">
                  {group.label}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skill-item flex w-56 max-w-full items-center gap-3 p-3"
                    >
                      {"logo" in skill && (
                        <div className="skill-logo flex h-10 w-10 flex-shrink-0 items-center justify-center p-1.5 dark:bg-white/90">
                          <img src={skill.logo} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                      )}
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
      <section id="resume" className="container mx-auto px-6 sm:px-8 lg:px-8 py-16">
        <h2 className="mb-12 text-center section-title display-title font-display">Resume</h2>
        <div className="resume-sheet max-w-3xl mx-auto border border-t-2 bg-card text-card-foreground">
          <div className="resume-heading mb-4">
            <p className="font-display text-3xl font-normal tracking-tight">Niko Weaver</p>
            <Button asChild className="flex items-center gap-2">
              <a href="/NikoWeaverResume.pdf" target="_blank" rel="noopener noreferrer" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          <p className="resume-contact mb-8 text-sm text-muted-foreground">
            <a href="tel:+16178521905" className="text-primary hover:underline">
              +1 (617) 852-1905
            </a>
            <span aria-hidden="true">&middot;</span>
            <a href="mailto:niko.weaver@duke.edu" className="text-primary hover:underline">
              niko.weaver@duke.edu
            </a>
            <span aria-hidden="true">&middot;</span>
            <a
              href="https://linkedin.com/in/niko-weaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              linkedin.com/in/niko-weaver
            </a>
          </p>

          <h2 className="eyebrow mb-4 border-b pb-2 text-xs font-semibold uppercase text-muted-foreground">
            Education
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Duke University, Durham NC</h3>
              <p className="project-description text-muted-foreground">Expected May 2028</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>B.S.E. Mechanical Engineering; Aerospace Engineering Certificate</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Waterford School, Sandy UT</h3>
              <p className="project-description text-muted-foreground">Aug. 2020 &ndash; June 2024</p>
            </div>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>High School Diploma, Summa Cum Laude</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 text-xs font-semibold uppercase text-muted-foreground">
            Experience
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">President</h3>
              <p className="project-description text-muted-foreground">Sep. 2024 &ndash; Present</p>
            </div>
            <p className="project-description text-muted-foreground">Duke Robotics Club</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Leading a 50 member club to build autonomous underwater robots for the annual international RoboSub Competition. Coordinating mechanical, electrical, and software integration.</li>
              <li>Designed an AUV frame, hydrodynamic shell, and buoyancy system, reducing simulated drag by 29% in Ansys Fluent.</li>
              <li>Contributed to a 7th-place overall finish at RoboSub 2025 and a 3rd-place design report.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Researcher</h3>
              <p className="project-description text-muted-foreground">Aug. 2025 &ndash; Present</p>
            </div>
            <p className="project-description text-muted-foreground">Duke University General Robotics Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Lead the electromechanical design of an underwater spherical robot and the preparation of a manuscript describing the platform.</li>
              <li>Designed a custom PCB in KiCad that cut electronics-enclosure volume by 55% and robot mass by 0.5 kg (17%).</li>
              <li>Develop locomotion and underwater communication methods for coordinated multi-robot operation.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Undergraduate Research Intern</h3>
              <p className="project-description text-muted-foreground">May 2025 &ndash; Aug. 2025</p>
            </div>
            <p className="project-description text-muted-foreground">University of Utah FPC Lab</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed a custom 4-axis robotic arm to position test models within a constrained wind-tunnel workspace.</li>
              <li>Built a MATLAB/Simulink model to simulate real-time motion and automate torque and drag data acquisition and analysis.</li>
              <li>Optimized actuator selection and link lengths against workspace and torque constraints.</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 text-xs font-semibold uppercase text-muted-foreground">
            Projects
          </h2>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Fixed-Wing UAV</h3>
              <p className="project-description text-muted-foreground">Summer 2025 &ndash; Present</p>
            </div>
            <p className="project-description text-muted-foreground">Fusion 360, Ansys Fluent, ArduPilot</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Secured $1,100 in Duke Co-Lab grant funding; designed and built three airframe revisions, increasing simulated lift by 25%.</li>
              <li>Analyzed an initial flight test that exposed a thrust deficit; redesigned the airframe and propulsion system, raising predicted thrust-to-weight ratio from 0.6&ndash;0.7 to 1.4 and cutting estimated mass from 2.0 kg to 1.75 kg.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Underwater Robot Locomotion</h3>
              <p className="project-description text-muted-foreground">Summer 2026</p>
            </div>
            <p className="project-description text-muted-foreground">MuJoCo, PyTorch, Python</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Built a MuJoCo digital twin for controller iteration and sim-to-real development.</li>
              <li>Trained PyTorch reinforcement-learning policies and benchmarked locomotion performance against a heuristic controller.</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Canard-Controlled Rocket</h3>
              <p className="project-description text-muted-foreground">2023</p>
            </div>
            <p className="project-description text-muted-foreground">Fusion 360, OpenRocket, Arduino C++</p>
            <ul className="mt-1 list-disc pl-5 text-muted-foreground marker:text-border">
              <li>Designed and manufactured a 1 m rocket with independently actuated canards and an Arduino-based 3-axis PID controller.</li>
              <li>Implemented a 1 kHz control loop with IMU-based state estimation, apogee detection, and parachute-deployment logic; traced partial engine ignition during flight testing to an ignition-wiring fault.</li>
            </ul>
          </div>

          <h2 className="eyebrow mb-4 border-b pb-2 text-xs font-semibold uppercase text-muted-foreground">
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
