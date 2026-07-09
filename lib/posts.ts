export type BlogPost = {
  title: string
  subtitle: string
  date: string
  image?: {
    src: string
    alt: string
    /** Render the image above or below the text. Defaults to "top". */
    position?: "top" | "bottom"
  }
  paragraphs: string[]
}

/**
 * Add new posts to the top of this array — the blog page renders them in order.
 */
export const posts: BlogPost[] = [
  {
    title: "UAV WINTER UPDATE!",
    subtitle: "We're so back",
    date: "February 2026",
    image: {
      src: "https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/Screenshot%202026-02-27%20at%2010.59.07%E2%80%AFAM.png",
      alt: "UAV Winter Update!",
    },
    paragraphs: [
      "The UAV is nearing its second flight!  I have reprinted most of the parts, with the help of the Duke colab, and will soon be ready for preflight testing!",
      "My plans are to tow the UAV with my bike and find the takeoff speed! Very scientific!",
      "After that I will be ready to fly the UAV manually, then autonomously hopefully in the same flight!",
      "The one major change between this flight and the last is that I am adding propellers instead of EDFs, which will give me nearly double the thrust I had before.",
    ],
  },
  {
    title: "UAV summer update | heartbreak",
    subtitle: "Not unexpected...",
    date: "August 2025",
    image: {
      src: "https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_1819%202.JPG",
      alt: "UAV Summer Update",
    },
    paragraphs: [
      "I Finally flew my UAV!  Unfortunately the flight ended as fast as it begun :(.  The EDFs didn't have as much thrust as I anticipated so the UAV could not reach cruising speed (~20mph estimated) fast enough.",
      "Coming back from this failure, I plan to switch to 9 inch propellors instead of the two 40mm EDFs.  EDFs provide good thrust for their size (at a blistering 80,000rpm!), but ultimately are too weak for what I need.",
      "Ultimately this isn't that big of a setback.  The Airframe is easy to 3D print and all the electronics are still in good shape!  Stay tuned for Flight 2!!!",
      "See my UAV project page for the video of my failure!",
    ],
  },
  {
    title: "UAV Progress!",
    subtitle: "Version 2.0",
    date: "April 9, 2025",
    image: {
      src: "https://zmtbsodvdekwtp1d.public.blob.vercel-storage.com/IMG_1229-a8dhZbdSZ7DqJ9qCeysh8RKlooTWYb.JPG",
      alt: "UAV Prototype assembly",
      position: "bottom",
    },
    paragraphs: [
      "I have been diligently working on my UAV! My most recent developments have been to redesign the wings to be slightly larger, and to also add winglets at the ends.",
      "It was very important to me to not compromise the cool looks of the UAV while still improving the wings, and I am quite happy with the result I have achieved! Check out a picture of Version 1.0's mockup below!",
    ],
  },
]
