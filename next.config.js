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
    ],
    // domains: ["images.pexels.com, "] static.startuptalky.com
  },
};

module.exports = nextConfig;
