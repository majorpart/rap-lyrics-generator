import Image from 'next/image';
import { useState } from 'react';

/**
 * Optimized Image Component
 * Uses Next.js Image component with ShortPixel optimization support
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} className - CSS classes
 * @param {boolean} priority - Whether to prioritize loading (for above-the-fold images)
 * @param {number} quality - Image quality (1-100, default 85)
 * @param {boolean} useShortPixel - Whether to use ShortPixel optimization
 * @param {Object} ...props - Additional props for Next.js Image component
 */
export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 85,
    useShortPixel = false,
    ...props
}) {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // If using ShortPixel and it's an external URL
    if (useShortPixel && typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_SHORTPIXEL === 'true' && src.startsWith('http')) {
        const shortPixelUrl = `https://cdn.shortpixel.ai/client/q_glossy,ret_img/${src}`;
        return (
            <Image
                src={shortPixelUrl}
                alt={alt}
                width={width}
                height={height}
                className={className}
                quality={quality}
                priority={priority}
                onError={() => {
                    if (!hasError) {
                        setHasError(true);
                        setImageSrc(src); // Fallback to original
                    }
                }}
                {...props}
            />
        );
    }

    // Default: Use Next.js built-in optimization
    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            quality={quality}
            priority={priority}
            onError={() => {
                if (!hasError) {
                    setHasError(true);
                }
            }}
            {...props}
        />
    );
}

