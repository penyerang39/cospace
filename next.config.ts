import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Let Next generate multiple DPR variants and choose based on device pixel ratio
    deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840, 5120],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    qualities: [25, 50, 75, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
  },
};

export default nextConfig;
