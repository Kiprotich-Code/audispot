// next.config.mjs
import path from "path";

const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", '127.0.0.1', 'oj0775.pythonanywhere.com'],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Add custom webpack configurations here
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("src"),
    };

    return config;
  },
  reactStrictMode: false,
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
  // use: ['@svgr/webpack'],
};

export default nextConfig;
