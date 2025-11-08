import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose source maps in production to aid debugging of minified code
  productionBrowserSourceMaps: true,
  // Remove console calls in production bundles (keep error/warn)
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
  images: {
    // Let Next generate multiple DPR variants and choose based on device pixel ratio
    deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840, 5120],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    qualities: [25, 50, 75, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vitals.vercel-insights.com https://*.vercel-insights.com",
              "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com https://*.vercel.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https:",
              "default-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
