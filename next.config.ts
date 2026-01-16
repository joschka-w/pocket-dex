import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // logging: {
  //   fetches: { fullUrl: true },
  // },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    minimumCacheTTL: 2678400,
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

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: { remarkPlugins: ['remark-gfm'] },
});

export default withMDX(nextConfig);
