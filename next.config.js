/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    trailingSlash: false,
    
    // Compression and performance optimizations
    compress: true,
    
    // Image optimization configuration
    images: {
        // Enable image optimization with modern formats
        formats: ['image/avif', 'image/webp'],
        // Image sizes for responsive images (optimized for mobile-first)
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Minimum image quality (0-100) - optimized for mobile
        minimumCacheTTL: 60,
        // Allow external image domains if needed
        remotePatterns: [],
        // Disable static image import optimization warning
        unoptimized: false,
        // Content Security Policy for images
        dangerouslyAllowSVG: false
    },
    
    // Headers for performance
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    }
                ]
            },
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/assets/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ];
    }
};

module.exports = nextConfig;


