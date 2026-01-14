import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // logging: {
  //   fetches: { fullUrl: true },
  // },
  images: {
    remotePatterns: [
      {
        hostname: 'sxqrthtfhlhehldnczni.supabase.co',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
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
