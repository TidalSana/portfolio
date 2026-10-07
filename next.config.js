/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      // Serve the accepted keyboard portfolio before the legacy pages/index route.
      beforeFiles: [{ source: '/', destination: '/keyspace/index.html' }],
    }
  },
}

module.exports = nextConfig
