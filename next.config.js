/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
)

const nextConfig = {}

module.exports = withNextIntl(nextConfig)

module.exports = withNextIntl({
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'fakeimg.pl',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'covers.openlibrary.org',
          port: '',
        },
      ],
    },
  })