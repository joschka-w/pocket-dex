import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cards',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
