/**
 * API route for image optimization using ShortPixel
 * POST /api/optimize-image
 * 
 * Body: {
 *   imageUrl: string,
 *   compression?: 1|2|0, // 1=lossy, 2=glossy, 0=lossless
 *   width?: number,
 *   height?: number
 * }
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.SHORTPIXEL_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ 
            error: 'ShortPixel API key not configured',
            message: 'Please set SHORTPIXEL_API_KEY environment variable'
        });
    }

    try {
        const { imageUrl, compression = 2, width, height } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }

        // ShortPixel CDN URL format
        const baseUrl = 'https://cdn.shortpixel.ai/client';
        const optimizationParams = [
            `q_${compression === 1 ? 'lossy' : compression === 2 ? 'glossy' : 'lossless'}`,
            'ret_img'
        ];
        if (width) optimizationParams.push(`w_${width}`);
        if (height) optimizationParams.push(`h_${height}`);

        const optimizedUrl = `${baseUrl}/${optimizationParams.join(',')}/${imageUrl}`;

        return res.status(200).json({
            success: true,
            originalUrl: imageUrl,
            optimizedUrl: optimizedUrl
        });
    } catch (error) {
        console.error('Image optimization error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
}
