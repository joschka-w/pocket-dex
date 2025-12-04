import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    fetches: { fullUrl: true },
  },
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
