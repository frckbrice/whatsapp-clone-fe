/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "images.pexels.com,",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "www.google.com",
      },
      {
        hostname: "static.startuptalky.com",
      },
      {
        hostname: "cdn.jsdelivr.net",
      },
      {
        hostname: "xkwspfurbsmpwwazlkmu.supabase.co",
      },
      {
        hostname: "media.istockphoto.com"
      },
      
    ],
  },
};

module.exports = nextConfig;
