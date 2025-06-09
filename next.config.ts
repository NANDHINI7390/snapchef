
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Removed: 'lh3.googleusercontent.com' as it's not strictly necessary for AI-generated images as data URIs.
      // Data URIs are handled directly by next/image if the src starts with "data:".
    ],
    // If you plan to use external image URLs from AI generation in the future (not data URIs),
    // you might need to add their hostnames here or use unoptimized={true} for those images.
  },
};

export default nextConfig;
