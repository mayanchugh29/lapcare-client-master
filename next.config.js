const withImages = require('next-images')

module.exports = withImages({
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  images: {
    domains: ['lapcare-static.s3.ap-south-1.amazonaws.com','lapcare-static.s3.ap-south-1.amazonaws.com','scontent.cdninstagram.com','video.cdninstagram.com',"scontent-sin6-2.cdninstagram.com"],
    disableStaticImages: true,
  }
})

