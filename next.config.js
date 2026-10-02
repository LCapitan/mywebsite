/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A package-lock.json in the home directory otherwise confuses root detection.
  turbopack: { root: __dirname },
  images: {
    // 100 is for line art that needs to stay crisp (the hero astronaut).
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/austinmel/**" },
    ],
  },
};

module.exports = nextConfig;
