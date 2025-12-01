import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'assets.tcgdex.net',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
