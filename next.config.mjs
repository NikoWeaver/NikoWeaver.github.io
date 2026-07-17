/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"

const nextConfig = {
  output: "export",
  trailingSlash: true,
  // Project Pages URL: https://nikoweaver.github.io/Portfolio/
  // Vercel builds without GITHUB_PAGES so paths stay at root.
  basePath: isGithubPages ? "/Portfolio" : "",
  assetPrefix: isGithubPages ? "/Portfolio" : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
