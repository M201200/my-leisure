/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
          port: '',
        },
      ],
    },
  }