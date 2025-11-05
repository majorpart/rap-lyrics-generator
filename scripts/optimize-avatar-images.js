/**
 * Avatar image optimization script using Sharp
 * Optimizes user avatar images for testimonial section
 * Resizes to 96x96px (2x for retina) and compresses for web display
 * Usage: node scripts/optimize-avatar-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
const BACKUP_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'backup', 'avatars');
const OPTIMIZED_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'optimized', 'avatars');

// Avatar images to optimize (1-9 are used in testimonials)
const AVATAR_FILES = [
    'rap-lyrics-generator (1).webp',
    'rap-lyrics-generator (2).webp',
    'rap-lyrics-generator (3).webp',
    'rap-lyrics-generator (4).webp',
    'rap-lyrics-generator (5).webp',
    'rap-lyrics-generator (6).webp',
    'rap-lyrics-generator (7).webp',
    'rap-lyrics-generator (8).webp',
    'rap-lyrics-generator (9).webp'
];

// Display size: 48x48px (w-12 h-12 in Tailwind)
// Optimize to 96x96px for retina displays (2x)
const AVATAR_SIZE = 96;
const AVATAR_QUALITY = 80; // Optimized quality for small avatars

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return (stats.size / 1024).toFixed(2);
    } catch (error) {
        return 0;
    }
}

/**
 * Create backup and optimized directories if they don't exist
 */
function ensureDirectories() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
    }
    if (!fs.existsSync(OPTIMIZED_DIR)) {
        fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
        console.log(`📁 Created optimized directory: ${OPTIMIZED_DIR}`);
    }
}

/**
 * Backup original image
 */
function backupImage(imagePath) {
    const fileName = path.basename(imagePath);
    const backupPath = path.join(BACKUP_DIR, fileName);
    
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(imagePath, backupPath);
        console.log(`   📦 Backed up: ${fileName}`);
    }
}

/**
 * Optimize avatar image
 */
async function optimizeAvatar(imagePath) {
    const fileName = path.basename(imagePath);
    
    try {
        const originalSize = getFileSize(imagePath);
        console.log(`\n🔄 Processing ${fileName}...`);
        console.log(`   Original size: ${originalSize} KB`);

        // Get image metadata
        const metadata = await sharp(imagePath).metadata();
        console.log(`   Original dimensions: ${metadata.width}x${metadata.height}`);

        // Create optimized file path in optimized directory
        const optimizedPath = path.join(OPTIMIZED_DIR, fileName);
        
        // Optimize: resize to 96x96px (2x for retina), crop to center, compress
        await sharp(imagePath)
            .resize(AVATAR_SIZE, AVATAR_SIZE, {
                fit: 'cover', // Crop to cover the area
                position: 'center' // Center the crop
            })
            .webp({ 
                quality: AVATAR_QUALITY,
                effort: 6 // High compression effort
            })
            .toFile(optimizedPath); // Write to optimized file
        
        // Get optimized file size
        const optimizedSize = getFileSize(optimizedPath);
        
        // Try to replace original with optimized version
        try {
            // Try to replace the file
            fs.copyFileSync(optimizedPath, imagePath);
            console.log(`   ✅ Replaced original file`);
        } catch (error) {
            // If file is locked, just keep the optimized version
            console.log(`   ⚠️  File is locked, optimized version saved to: ${optimizedPath}`);
            console.log(`   💡 Please manually replace the original file when available`);
        }

        // Use optimized file size and dimensions
        const newSize = optimizedSize;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        
        // Verify new dimensions from optimized file
        const newMetadata = await sharp(optimizedPath).metadata();
        
        console.log(`   ✅ Optimized: ${fileName}`);
        console.log(`   New size: ${newSize} KB (${savings}% reduction)`);
        console.log(`   New dimensions: ${newMetadata.width}x${newMetadata.height}`);

        return {
            file: fileName,
            originalSize: parseFloat(originalSize),
            newSize: parseFloat(newSize),
            savings: parseFloat(savings),
            originalDimensions: `${metadata.width}x${metadata.height}`,
            newDimensions: `${newMetadata.width}x${newMetadata.height}`
        };
    } catch (error) {
        console.error(`   ❌ Error processing ${fileName}:`, error.message);
        return null;
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting avatar image optimization...\n');
    console.log(`📐 Target size: ${AVATAR_SIZE}x${AVATAR_SIZE}px (2x for retina display)`);
    console.log(`🎯 Display size: 48x48px (w-12 h-12 in Tailwind)`);
    console.log(`📊 Quality: ${AVATAR_QUALITY}%\n`);

    // Ensure directories exist
    ensureDirectories();

    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Directory not found: ${IMAGES_DIR}`);
        return;
    }

    const results = [];
    
    // Process each avatar image
    for (const fileName of AVATAR_FILES) {
        const imagePath = path.join(IMAGES_DIR, fileName);
        
        // Check if file exists
        if (!fs.existsSync(imagePath)) {
            console.log(`⚠️  Skipping ${fileName} (file not found)`);
            continue;
        }
        
        // Backup original
        backupImage(imagePath);
        
        // Optimize image
        const result = await optimizeAvatar(imagePath);
        
        if (result) {
            results.push(result);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Optimization Summary:');
    console.log('='.repeat(60));
    console.log(`   Total avatar files: ${AVATAR_FILES.length}`);
    console.log(`   Successfully optimized: ${results.length}`);
    
    if (results.length > 0) {
        const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
        const totalNewSize = results.reduce((sum, r) => sum + r.newSize, 0);
        const avgSavings = results.reduce((sum, r) => sum + r.savings, 0) / results.length;
        
        console.log(`\n   📉 Average size reduction: ${avgSavings.toFixed(1)}%`);
        console.log(`   📦 Total original size: ${totalOriginalSize.toFixed(2)} KB (${(totalOriginalSize / 1024).toFixed(2)} MB)`);
        console.log(`   📦 Total new size: ${totalNewSize.toFixed(2)} KB (${(totalNewSize / 1024).toFixed(2)} MB)`);
        console.log(`   💾 Space saved: ${(totalOriginalSize - totalNewSize).toFixed(2)} KB (${((totalOriginalSize - totalNewSize) / 1024).toFixed(2)} MB)`);
        
        console.log(`\n   📋 Optimized files:`);
        results.forEach(r => {
            console.log(`      ✅ ${r.file} (${r.savings}% reduction, ${r.originalDimensions} → ${r.newDimensions})`);
        });
    }

    console.log('\n✅ Avatar optimization complete!');
    console.log(`\n💡 Original files backed up in: ${BACKUP_DIR}`);
    console.log(`💡 Optimized files saved in: ${OPTIMIZED_DIR}`);
    console.log('💡 Images are optimized for 48x48px display (96x96px for retina)');
    console.log('💡 If files were locked, manually copy optimized files to replace originals');
    console.log('💡 This will significantly improve page load performance!');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { optimizeAvatar };

