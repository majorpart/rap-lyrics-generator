/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    trailingSlash: false,
    
    // Image optimization configuration
    images: {
        // Enable image optimization
        formats: ['image/avif', 'image/webp'],
        // Image sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Minimum image quality (0-100)
        minimumCacheTTL: 60,
        // Allow external image domains if needed
        remotePatterns: [],
        // Disable static image import optimization warning
        unoptimized: false
    }
};

module.exports = nextConfig;


