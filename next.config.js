const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.join(__dirname, 'src'),
    }
    return config
  },
  async redirects() {
    return [
      { source: '/', destination: '/english/Home/Home', permanent: false },
      { source: '/english', destination: '/english/Home/Home', permanent: false },
      { source: '/ar', destination: '/arabic/الرئيسية/الرئيسية', permanent: false },
    ]
  },
}

module.exports = nextConfig
