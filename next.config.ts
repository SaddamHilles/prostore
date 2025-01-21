import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'utfs.io', port: '' }],
  },
  /* config options here */
};

export default nextConfig;
