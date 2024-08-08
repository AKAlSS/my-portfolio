/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  }
  
  module.exports = nextConfig

  const isProd = process.env.NODE_ENV === 'production';

  module.exports = {
    assetPrefix: isProd ? '/my-portfolio/' : '',
    trailingSlash: true,
  };
  