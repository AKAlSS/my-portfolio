/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure this is false for custom domain deployment
  trailingSlash: false,
  // Remove assetPrefix for custom domain deployment
}

module.exports = nextConfig