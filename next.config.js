const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  },
]

/* eslint import/order: "off" */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/* eslint @typescript-eslint/no-var-requires: "off" */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  env: {
    APP_URL: process.env.APP_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
})

module.exports = withBundleAnalyzer(nextConfig)
