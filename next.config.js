/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'gateway.pinata.cloud', 'via.placeholder.com'],
  },
}

module.exports = nextConfig