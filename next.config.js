const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
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
  async rewrites() {
    return [
      { source: '/en', destination: '/en/home' },
      { source: '/en/home', destination: '/en/home' },
      { source: '/en/about', destination: '/en/about' },
      { source: '/en/projects', destination: '/en/projects' },
      { source: '/en/news', destination: '/en/news' },
      { source: '/en/register', destination: '/en/register' },
      { source: '/ar', destination: '/ar/home' },
      { source: '/ar/الرئيسية', destination: '/ar/home' },
      { source: '/ar/%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9', destination: '/ar/home' },
      { source: '/ar/عن كالما', destination: '/ar/about' },
      { source: '/ar/%D8%B9%D9%86%20%D9%83%D8%A7%D9%84%D9%85%D8%A7', destination: '/ar/about' },
      { source: '/ar/المشاريع', destination: '/ar/projects' },
      { source: '/ar/%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9', destination: '/ar/projects' },
      { source: '/ar/الأخبار', destination: '/ar/news' },
      { source: '/ar/%D8%A7%D9%84%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1', destination: '/ar/news' },
      { source: '/ar/تواصل معنا', destination: '/ar/contact' },
      { source: '/ar/%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%86%D8%A7', destination: '/ar/contact' },
    ]
  },
  async redirects() {
    return [
      { source: '/', destination: '/ar/home', permanent: false },
      { source: '/english', destination: '/en/home', permanent: false },
      { source: '/arabic', destination: '/ar/home', permanent: false },
    ]
  },
}

module.exports = nextConfig
