/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NEXT_DIST_DIR lets a test build use its own folder (e.g. .next-test)
  // without touching the dev server's cache in .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
