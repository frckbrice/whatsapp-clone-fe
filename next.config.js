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
    ],
    // domains: ["images.pexels.com, "],
  },
};

module.exports = nextConfig;