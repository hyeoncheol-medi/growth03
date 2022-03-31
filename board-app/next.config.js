/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://server:8000/api/:path*", // Proxy to Backend
      }
    ];
  },
  experimental: {
    outputStandalone: true
  }
}

module.exports = nextConfig
