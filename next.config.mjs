/** @type {import('next').NextConfig} */
const V1_SUBDOMAIN = "https://v1-markdown.himanshuchandola.dev"

// Slugs that exist only in v1 (MongoDB). Redirect to v1 subdomain so old links still work.
const V1_ONLY_SLUGS = [
  "scenario8messagehistorysyncanalysis",
  "newmessagearch",
  "expressive-splashing-lemur",
  "rootprismacleanupanalysis",
]

const redirects = () =>
  V1_ONLY_SLUGS.map((slug) => ({
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
