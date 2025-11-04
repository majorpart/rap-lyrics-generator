/**
 * Image optimization utilities
 * Supports both Next.js built-in optimization and ShortPixel API
 */

/**
 * Get optimized image URL using ShortPixel API
 * @param {string} imageUrl - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export function getShortPixelUrl(imageUrl, options = {}) {
    const { 
        compression = 2, // 1=lossy, 2=glossy, 0=lossless
        width = null,
        height = null,
        quality = null 
    } = options;

    // If no ShortPixel API key, return original URL
    const apiKey = process.env.SHORTPIXEL_API_KEY;
    if (!apiKey) {
        return imageUrl;
    }

    // ShortPixel CDN URL format
    const baseUrl = 'https://cdn.shortpixel.ai/client';
    
    // Build optimization parameters
    const params = new URLSearchParams();
    params.append('compression', compression);
    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (quality) params.append('q', quality);

    // Construct optimized URL
    // Format: https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_800,h_600/https://yoursite.com/image.jpg
    const optimizationParams = [
        `q_${compression === 1 ? 'lossy' : compression === 2 ? 'glossy' : 'lossless'}`,
        'ret_img'
    ];
    if (width) optimizationParams.push(`w_${width}`);
    if (height) optimizationParams.push(`h_${height}`);
    if (quality) optimizationParams.push(`quality_${quality}`);

    return `${baseUrl}/${optimizationParams.join(',')}/${imageUrl}`;
}

/**
 * Upload and optimize image using ShortPixel API
 * @param {string} imagePath - Local image file path
 * @param {Object} options - Optimization options
 * @returns {Promise<Object>} Optimization result
 */
export async function optimizeImageWithShortPixel(imagePath, options = {}) {
    const apiKey = process.env.SHORTPIXEL_API_KEY;
    if (!apiKey) {
        throw new Error('ShortPixel API key not configured');
    }

    // Note: This function requires form-data and node-fetch packages
    // Install: npm install form-data node-fetch@2
    // Or use the CDN URL approach instead (getShortPixelUrl)
    
    try {
        // Dynamic imports for server-side only
        const FormData = (await import('form-data')).default;
        const fetch = (await import('node-fetch')).default;
        const fs = await import('fs');

        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('compression', options.compression || 2);
        formData.append('file', fs.createReadStream(imagePath));

        const response = await fetch('https://api.shortpixel.com/v2/reducer.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.Status && result.Status.Code === 1) {
            return {
                success: true,
                originalSize: result.OriginalSize,
                optimizedSize: result.LossySize || result.LosslessSize || result.GlossySize,
                optimizedUrl: result.LossyURL || result.LosslessURL || result.GlossyURL,
                savings: result.PercentImprovement
            };
        } else {
            throw new Error(result.Status?.Message || 'Optimization failed');
        }
    } catch (error) {
        console.error('ShortPixel optimization error:', error);
        throw error;
    }
}

/**
 * Get optimized image src for Next.js Image component
 * Uses Next.js built-in optimization by default
 * Can fallback to ShortPixel if needed
 */
export function getOptimizedImageSrc(src, options = {}) {
    // If it's already a Next.js optimized image or external URL, return as-is
    if (src.startsWith('http') || src.startsWith('/_next/image')) {
        return src;
    }

    // For local images, Next.js will automatically optimize them
    // If using ShortPixel, we can add the CDN URL
    if (process.env.USE_SHORTPIXEL === 'true' && process.env.SHORTPIXEL_API_KEY) {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
        const fullUrl = src.startsWith('/') ? `${baseUrl}${src}` : src;
        return getShortPixelUrl(fullUrl, options);
    }

    // Default: use Next.js built-in optimization
    return src;
}

