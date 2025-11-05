/**
 * Image conversion script using Sharp
 * Converts PNG and JPG to WebP and optimizes images
 * Usage: node scripts/convert-images-sharp.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
const BACKUP_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'backup');

// Images that need special handling
const SPECIAL_IMAGES = {
    'logo.png': {
        width: 32,
        height: 32,
        quality: 90,
        format: 'webp'
    },
    'rap-lyrics-generator2.png': {
        quality: 85,
        format: 'webp',
        maxWidth: 1920, // Limit max width for hero image
        maxHeight: 1080
    },
    'rap-lyrics-generator3.png': {
        quality: 85,
        format: 'webp',
        maxWidth: 1920,
        maxHeight: 1080
    },
    'rap-lyrics-generator4.png': {
        quality: 85,
        format: 'webp',
        maxWidth: 1920,
        maxHeight: 1080
    },
    'wedding-vows.png': {
        quality: 85,
        format: 'webp'
    },
    // JPG images - optimize to WebP with max dimensions
    'rap-lyrics-generator1.jpg': {
        quality: 85,
        format: 'webp',
        maxWidth: 1200,
        maxHeight: 900
    }
};

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
 * Create backup directory if it doesn't exist
 */
function ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
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
 * Convert PNG/JPG to WebP using Sharp
 */
async function convertImage(imagePath, options = {}) {
    const fileName = path.basename(imagePath);
    const ext = path.extname(fileName).toLowerCase();
    
    // Only process PNG and JPG files
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        console.log(`⏭️  Skipping ${fileName} (not a PNG or JPG file)`);
        return null;
    }

    try {
        const originalSize = getFileSize(imagePath);
        console.log(`\n🔄 Processing ${fileName}...`);
        console.log(`   Original size: ${originalSize} KB`);

        // Get image metadata
        const metadata = await sharp(imagePath).metadata();
        console.log(`   Original dimensions: ${metadata.width}x${metadata.height}`);

        // Determine output format and options
        const outputFormat = options.format || 'webp';
        const outputFileName = fileName.replace(/\.(png|jpg|jpeg)$/i, `.${outputFormat}`);
        const outputPath = path.join(IMAGES_DIR, outputFileName);

        let sharpInstance = sharp(imagePath);

        // Resize if needed
        if (options.width && options.height) {
            sharpInstance = sharpInstance.resize(options.width, options.height, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            });
            console.log(`   Resizing to: ${options.width}x${options.height}`);
        } else if (options.maxWidth || options.maxHeight) {
            const maxWidth = options.maxWidth || metadata.width;
            const maxHeight = options.maxHeight || metadata.height;
            
            if (metadata.width > maxWidth || metadata.height > maxHeight) {
                sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
                    fit: 'inside',
                    withoutEnlargement: true
                });
                console.log(`   Resizing to fit: max ${maxWidth}x${maxHeight}`);
            }
        }

        // Convert to WebP with quality settings
        const quality = options.quality || 85;
        
        if (outputFormat === 'webp') {
            await sharpInstance
                .webp({ quality, effort: 6 })
                .toFile(outputPath);
        } else {
            // Fallback to PNG if format not supported
            await sharpInstance
                .png({ quality, compressionLevel: 9 })
                .toFile(outputPath);
        }

        const newSize = getFileSize(outputPath);
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        
        // Get new dimensions
        const newMetadata = await sharp(outputPath).metadata();
        
        console.log(`   ✅ Created: ${outputFileName}`);
        console.log(`   New size: ${newSize} KB (${savings}% reduction)`);
        console.log(`   New dimensions: ${newMetadata.width}x${newMetadata.height}`);

        return {
            original: fileName,
            converted: outputFileName,
            originalSize,
            newSize,
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
 * Get all PNG and JPG files in directory
 */
function getAllImageFiles(dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
        console.error(`❌ Directory not found: ${dir}`);
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        // Skip backup directory
        if (entry.isDirectory() && entry.name === 'backup') {
            continue;
        }

        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            files.push(...getAllImageFiles(fullPath));
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            // Process PNG, JPG, and JPEG files
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                // Skip if already converted to WebP
                const fileName = entry.name;
                if (!fileName.endsWith('.webp')) {
                    files.push(fullPath);
                }
            }
        }
    }

    return files;
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting image conversion with Sharp...\n');

    // Ensure backup directory exists
    ensureBackupDir();

    // Get all PNG and JPG files
    const imageFiles = getAllImageFiles(IMAGES_DIR);
    
    if (imageFiles.length === 0) {
        console.log('ℹ️  No PNG or JPG files found in', IMAGES_DIR);
        return;
    }

    console.log(`📸 Found ${imageFiles.length} image file(s) to convert\n`);

    const results = [];
    
    // Process each image
    for (const imagePath of imageFiles) {
        const fileName = path.basename(imagePath);
        
        // Backup original
        backupImage(imagePath);
        
        // Get special options if available
        const options = SPECIAL_IMAGES[fileName] || {
            quality: 85,
            format: 'webp'
        };
        
        // Convert image
        const result = await convertImage(imagePath, options);
        
        if (result) {
            results.push(result);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Conversion Summary:');
    console.log('='.repeat(60));
    console.log(`   Total image files: ${imageFiles.length}`);
    console.log(`   Successfully converted: ${results.length}`);
    
    if (results.length > 0) {
        const totalOriginalSize = results.reduce((sum, r) => sum + parseFloat(r.originalSize), 0);
        const totalNewSize = results.reduce((sum, r) => sum + parseFloat(r.newSize), 0);
        const avgSavings = results.reduce((sum, r) => sum + r.savings, 0) / results.length;
        
        console.log(`\n   📉 Average size reduction: ${avgSavings.toFixed(1)}%`);
        console.log(`   📦 Total original size: ${totalOriginalSize.toFixed(2)} KB (${(totalOriginalSize / 1024).toFixed(2)} MB)`);
        console.log(`   📦 Total new size: ${totalNewSize.toFixed(2)} KB (${(totalNewSize / 1024).toFixed(2)} MB)`);
        console.log(`   💾 Space saved: ${(totalOriginalSize - totalNewSize).toFixed(2)} KB (${((totalOriginalSize - totalNewSize) / 1024).toFixed(2)} MB)`);
        
        console.log(`\n   📋 Converted files:`);
        results.forEach(r => {
            console.log(`      ✅ ${r.converted} (${r.savings}% reduction, ${r.originalDimensions} → ${r.newDimensions})`);
        });
    }

    console.log('\n✅ Image conversion complete!');
    console.log(`\n💡 Original files backed up in: ${BACKUP_DIR}`);
    console.log('💡 Update your code to use .webp files instead of .png/.jpg');
    console.log('   Example: rap-lyrics-generator2.png → rap-lyrics-generator2.webp');
    console.log('   Example: rap-lyrics-blog (1).jpg → rap-lyrics-blog (1).webp');
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { convertImage, getAllImageFiles };

