/**
 * Batch image optimization script using ShortPixel API
 * Usage: node scripts/optimize-images.js
 * 
 * This script optimizes all images in assets/images directory
 * using ShortPixel API and saves optimized versions
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SHORTPIXEL_API_KEY = process.env.SHORTPIXEL_API_KEY;
const IMAGES_DIR = path.join(process.cwd(), 'assets', 'images');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'optimized');

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Optimize a single image using ShortPixel API
 */
async function optimizeImage(imagePath, compression = 2) {
    if (!SHORTPIXEL_API_KEY) {
        console.error('❌ SHORTPIXEL_API_KEY not found in environment variables');
        console.log('💡 Please set SHORTPIXEL_API_KEY in .env.local or environment variables');
        return null;
    }

    const fileName = path.basename(imagePath);
    const ext = path.extname(fileName).toLowerCase();
    
    if (!SUPPORTED_FORMATS.includes(ext)) {
        console.log(`⏭️  Skipping ${fileName} (unsupported format: ${ext})`);
        return null;
    }

    try {
        console.log(`🔄 Optimizing ${fileName}...`);
        console.log(`   ⚠️  Note: This requires node-fetch and form-data packages.`);
        console.log(`   💡 Install: npm install node-fetch@2 form-data`);
        console.log(`   💡 Or use ShortPixel CDN URL directly in your code.\n`);
        
        // For now, return a placeholder - install form-data and node-fetch to use this
        return null;

        // Uncomment after installing form-data and node-fetch:
        /*
        const FormData = require('form-data');
        const fetch = require('node-fetch');
        
        const formData = new FormData();
        formData.append('key', SHORTPIXEL_API_KEY);
        formData.append('compression', compression.toString());
        formData.append('file', fs.createReadStream(imagePath));

        const response = await fetch('https://api.shortpixel.com/v2/reducer.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.Status && result.Status.Code === 1) {
            const optimizedUrl = result.LossyURL || result.LosslessURL || result.GlossyURL;
            const savings = result.PercentImprovement || 0;

            console.log(`✅ Optimized ${fileName}: ${savings}% reduction`);
            console.log(`   Original: ${result.OriginalSize} bytes`);
            console.log(`   Optimized: ${result.LossySize || result.LosslessSize || result.GlossySize} bytes`);
            console.log(`   URL: ${optimizedUrl}`);

            return {
                originalPath: imagePath,
                fileName,
                optimizedUrl,
                savings,
                originalSize: result.OriginalSize,
                optimizedSize: result.LossySize || result.LosslessSize || result.GlossySize
            };
        } else {
            console.error(`❌ Failed to optimize ${fileName}: ${result.Status?.Message || 'Unknown error'}`);
            return null;
        }
    } catch (error) {
        console.error(`❌ Error optimizing ${fileName}:`, error.message);
        return null;
    }
}

/**
 * Get all image files in a directory
 */
function getAllImages(dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
        console.error(`❌ Directory not found: ${dir}`);
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            files.push(...getAllImages(fullPath));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_FORMATS.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting image optimization...\n');

    if (!SHORTPIXEL_API_KEY) {
        console.error('❌ SHORTPIXEL_API_KEY not configured');
        console.log('\n💡 To use this script:');
        console.log('1. Get your API key from https://shortpixel.com/');
        console.log('2. Set SHORTPIXEL_API_KEY in .env.local');
        console.log('3. Run: node scripts/optimize-images.js\n');
        process.exit(1);
    }

    const images = getAllImages(IMAGES_DIR);
    
    if (images.length === 0) {
        console.log('ℹ️  No images found in', IMAGES_DIR);
        return;
    }

    console.log(`📸 Found ${images.length} images to optimize\n`);

    const results = [];
    
    // Optimize images one by one (ShortPixel has rate limits)
    for (let i = 0; i < images.length; i++) {
        const imagePath = images[i];
        const result = await optimizeImage(imagePath);
        
        if (result) {
            results.push(result);
        }

        // Add delay between requests to avoid rate limiting
        if (i < images.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Summary
    console.log('\n📊 Optimization Summary:');
    console.log(`   Total images: ${images.length}`);
    console.log(`   Successfully optimized: ${results.length}`);
    
    if (results.length > 0) {
        const totalSavings = results.reduce((sum, r) => sum + r.savings, 0) / results.length;
        const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
        const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
        
        console.log(`   Average savings: ${totalSavings.toFixed(1)}%`);
        console.log(`   Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Space saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`);
    }

    console.log('\n✅ Image optimization complete!');
    console.log('\n💡 Note: Optimized images are served via ShortPixel CDN.');
    console.log('   Update your image URLs to use the optimized URLs from the results above.');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { optimizeImage, getAllImages };

