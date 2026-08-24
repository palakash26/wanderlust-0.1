/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Disable persistent disk cache in dev mode to prevent stale .next chunk errors on Windows
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;

