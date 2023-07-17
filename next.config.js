/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./build",
  experimental: { esmExternals: "loose" },
};

module.exports = nextConfig;
