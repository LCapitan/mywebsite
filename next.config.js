/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A package-lock.json in the home directory otherwise confuses root detection.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/austinmel/**" },
    ],
  },
};

module.exports = nextConfig;
