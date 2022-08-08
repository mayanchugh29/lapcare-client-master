const withImages = require('next-images')

module.exports = withImages({
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    domains: ['lapcare.sgp1.digitaloceanspaces.com','scontent.cdninstagram.com','video.cdninstagram.com',"scontent-sin6-2.cdninstagram.com"],
    disableStaticImages: true,
  }
})

