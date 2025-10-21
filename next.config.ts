import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx'],
    eslint: {
        ignoreDuringBuilds: true,
    },
  }

module.exports = nextConfig;