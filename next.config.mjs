/** @type {import('next').NextConfig} */
const V1_SUBDOMAIN = "https://v1-markdown.himanshuchandola.dev"

// Optional: comma-separated v1-only slugs to redirect to v1 subdomain (set via V1_REDIRECT_SLUGS).
const v1Slugs = (process.env.V1_REDIRECT_SLUGS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)

const redirects = () =>
  v1Slugs.map((slug) => ({
    source: `/${slug}`,
    destination: `${V1_SUBDOMAIN}/${slug}`,
    permanent: true,
  }))

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return redirects()
  },
}

export default nextConfig
