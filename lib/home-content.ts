/**
 * Single source of truth for everything the home page says.
 *
 * The five layout renditions in `lib/themes.ts` all render THIS data — no
 * variant owns its own copy of the content. Edit a project description here
 * and it changes in all five at once.
 */

export interface Project {
  /** Route the card/row links to. */
  href: string
  title: string
  /** Full prose description — used by the card and index layouts. */
  blurb: string
  /** One-line quantified outcome — used by the table layout, where the
   *  result is the column that carries the information. */
  result: string
  /** Short domain label (table + index layouts). */
  domain: string
  /** Year or span, right-aligned in list/table layouts. */
  period: string
  tags: string[]
  image: string
  imageAlt: string
  /** true when the asset is a logo that must not be cropped. */
  containImage?: boolean
}

export interface Skill {
  name: string
  detail: string
  logo?: string
}

export interface SkillGroup {
  label: string
  skills: Skill[]
}

export interface ResumeEntry {
  title: string
  org?: string
  period: string
  bullets: string[]
}

export interface ResumeSection {
  label: string
  entries: ResumeEntry[]
}

export const hero = {
  name: "Niko Weaver",
  role: "Mechanical Engineering Student",
  school: "Duke University",
  /** Short line — the one thing a recruiter should retain. */
  summary: "I design, build, and fly things — UAVs, autonomous underwater robots, and guided rockets.",
  /** Longer lede, used by layouts that give the hero a real measure of prose. */
  lede:
    "Mechanical engineering undergraduate at Duke, president of the Duke Robotics Club, and a researcher in the General Robotics Lab. My work runs from CAD and CFD through PCB layout and embedded control to the flight or dive test that tells me what I got wrong.",
  resumeHref: "/NikoWeaverResume.pdf",
} as const

export const contacts = [
  { kind: "phone", href: "tel:+16178521905", label: "617-852-1905", external: false },
  { kind: "linkedin", href: "https://www.linkedin.com/in/niko-weaver/", label: "LinkedIn", external: true },
  { kind: "mail", href: "mailto:nikoweaver@gmail.com", label: "nikoweaver@gmail.com", external: false },
] as const

/** Headline numbers. Used by layouts that lead with figures instead of prose. */
export const metrics = [
  { value: "29%", label: "AUV drag reduction, Ansys Fluent" },
  { value: "1.4", label: "UAV thrust-to-weight, up from 0.6" },
  { value: "55%", label: "Enclosure volume cut by custom PCB" },
  { value: "7th", label: "RoboSub 2025, of 39 teams" },
] as const

export const projects: Project[] = [
  {
    href: "/uav-project",
    title: "UAV Design Project",
    blurb:
      "Fully 3D printed, $1100 Duke Colab grant, 400g airframe. V2 nearly doubles the thrust of V1 (1.3kg → 2.5kg) — flight 2 coming summer 2026.",
    result: "Thrust-to-weight 0.6 → 1.4",
    domain: "Aerospace",
    period: "2025 –",
    tags: ["Fusion 360", "Ansys CFD", "ArduPilot"],
    image: "https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_1814.JPG",
    imageAlt: "UAV Design",
  },
  {
    href: "/underwater-rov",
    title: "Underwater AUV",
    blurb:
      "Designed key structural components and cut simulated drag by 29% with a redesigned buoyancy system. Placed 7th overall at RoboSub 2025 with a 3rd-place design report.",
    result: "Simulated drag −29%",
    domain: "Marine robotics",
    period: "2024 –",
    tags: ["SolidWorks", "Ansys Fluent", "CNC Milling"],
    image: "/images/minibot-20render.png",
    imageAlt: "Underwater ROV",
  },
  {
    href: "/wind-tunnel-translation",
    title: "Wind Tunnel Translation Project",
    blurb:
      "Designed and optimized a 4-axis robot arm to translate models in a wind tunnel. Used MATLAB for inverse kinematics and real-time control simulation.",
    result: "4-axis arm, constrained workspace",
    domain: "Controls",
    period: "2025",
    tags: ["MATLAB/Simulink", "Inverse Kinematics", "CAD"],
    image: "https://fpc.mech.utah.edu/wp-content/uploads/2024/03/logo_fpc.png",
    imageAlt: "Wind Tunnel Robot Arm",
    containImage: true,
  },
  {
    href: "/frc-robot",
    title: "FRC Robotics Competition",
    blurb:
      "Led the mechanical design of Team 3245's 2024 robot: shooter, pivot, and a 26\"×26\" swerve drivebase. Took home two regional awards.",
    result: "Two regional awards",
    domain: "Competition robotics",
    period: "2024",
    tags: ["Team Leadership", "CAD", "Drivetrain Design"],
    image: "/images/3245bot.jpeg",
    imageAlt: "FRC Robot",
  },
  {
    href: "/model-rocket",
    title: "Model Rocket Development",
    blurb:
      "1-meter canard-guided rocket with 3-axis PID control. Flown in the Bonneville Salt Flats, December 2023 — half the engines ignited, resulting in an RUD (Rapid Unscheduled Disassembly).",
    result: "1 kHz 3-axis PID control loop",
    domain: "Aerospace",
    period: "2023",
    tags: ["Arduino C++", "PID Control", "OpenRocket"],
    image: "/images/rocket111.jpeg",
    imageAlt: "Model Rocket",
  },
]

export const skillGroups: SkillGroup[] = [
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

export const resumeContact = [
  { href: "tel:+16178521905", label: "+1 (617) 852-1905" },
  { href: "mailto:niko.weaver@duke.edu", label: "niko.weaver@duke.edu" },
  { href: "https://linkedin.com/in/niko-weaver", label: "linkedin.com/in/niko-weaver" },
]

export const resumeSections: ResumeSection[] = [
  {
    label: "Education",
    entries: [
      {
        title: "Duke University, Durham NC",
        period: "Expected May 2028",
        bullets: ["B.S.E. Mechanical Engineering; Aerospace Engineering Certificate"],
      },
      {
        title: "Waterford School, Sandy UT",
        period: "Aug. 2020 – June 2024",
        bullets: ["High School Diploma, Summa Cum Laude"],
      },
    ],
  },
  {
    label: "Experience",
    entries: [
      {
        title: "President",
        org: "Duke Robotics Club",
        period: "Sep. 2024 – Present",
        bullets: [
          "Leading a 50 member club to build autonomous underwater robots for the annual international RoboSub Competition. Coordinating mechanical, electrical, and software integration.",
          "Designed an AUV frame, hydrodynamic shell, and buoyancy system, reducing simulated drag by 29% in Ansys Fluent.",
          "Contributed to a 7th-place overall finish at RoboSub 2025 and a 3rd-place design report.",
        ],
      },
      {
        title: "Undergraduate Researcher",
        org: "Duke University General Robotics Lab",
        period: "Aug. 2025 – Present",
        bullets: [
          "Lead the electromechanical design of an underwater spherical robot and the preparation of a manuscript describing the platform.",
          "Designed a custom PCB in KiCad that cut electronics-enclosure volume by 55% and robot mass by 0.5 kg (17%).",
          "Develop locomotion and underwater communication methods for coordinated multi-robot operation.",
        ],
      },
      {
        title: "Undergraduate Research Intern",
        org: "University of Utah FPC Lab",
        period: "May 2025 – Aug. 2025",
        bullets: [
          "Designed a custom 4-axis robotic arm to position test models within a constrained wind-tunnel workspace.",
          "Built a MATLAB/Simulink model to simulate real-time motion and automate torque and drag data acquisition and analysis.",
          "Optimized actuator selection and link lengths against workspace and torque constraints.",
        ],
      },
    ],
  },
  {
    label: "Projects",
    entries: [
      {
        title: "Fixed-Wing UAV",
        org: "Fusion 360, Ansys Fluent, ArduPilot",
        period: "Summer 2025 – Present",
        bullets: [
          "Secured $1,100 in Duke Co-Lab grant funding; designed and built three airframe revisions, increasing simulated lift by 25%.",
          "Analyzed an initial flight test that exposed a thrust deficit; redesigned the airframe and propulsion system, raising predicted thrust-to-weight ratio from 0.6–0.7 to 1.4 and cutting estimated mass from 2.0 kg to 1.75 kg.",
        ],
      },
      {
        title: "Underwater Robot Locomotion",
        org: "MuJoCo, PyTorch, Python",
        period: "Summer 2026",
        bullets: [
          "Built a MuJoCo digital twin for controller iteration and sim-to-real development.",
          "Trained PyTorch reinforcement-learning policies and benchmarked locomotion performance against a heuristic controller.",
        ],
      },
      {
        title: "Canard-Controlled Rocket",
        org: "Fusion 360, OpenRocket, Arduino C++",
        period: "2023",
        bullets: [
          "Designed and manufactured a 1 m rocket with independently actuated canards and an Arduino-based 3-axis PID controller.",
          "Implemented a 1 kHz control loop with IMU-based state estimation, apogee detection, and parachute-deployment logic; traced partial engine ignition during flight testing to an ignition-wiring fault.",
        ],
      },
    ],
  },
]

export const resumeSkills = [
  {
    label: "CAD & Simulation",
    value: "Fusion 360, SolidWorks, Siemens NX, Ansys Fluent (CFD), FEA, MATLAB/Simulink, MuJoCo",
  },
  {
    label: "Manufacturing",
    value: "CNC machining, manual milling & turning, FDM/SLA 3D printing, laser cutting, CAM, G-code, GD&T",
  },
  {
    label: "Electronics & Embedded",
    value: "KiCad, PCB & circuit design, STM32, ESP32, Arduino, CAN, I2C, SPI, UART",
  },
  { label: "Programming & Robotics", value: "Python, C++, PyTorch, ArduPilot, Git" },
  { label: "Other", value: "Systems integration, technical writing, team leadership, Spanish biliteracy" },
]
