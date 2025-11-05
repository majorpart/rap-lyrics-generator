/**
 * Ensure manual sitemap.xml is used after build
 * This script ensures our manually created sitemap.xml is preserved
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const manualSitemap = path.join(publicDir, 'sitemap.xml');
const backupSitemap = path.join(publicDir, 'sitemap.xml.backup');

// Create backup of our manual sitemap before build
if (fs.existsSync(manualSitemap)) {
    const content = fs.readFileSync(manualSitemap, 'utf8');
    // Only backup if it's a urlset (our manual one)
    if (content.includes('<urlset') && !content.includes('<sitemapindex')) {
        fs.copyFileSync(manualSitemap, backupSitemap);
        console.log('[copy-sitemap] Backed up manual sitemap.xml');
    }
}

// After build, restore our manual sitemap if it was overwritten
if (fs.existsSync(manualSitemap)) {
    const content = fs.readFileSync(manualSitemap, 'utf8');
    
    // If next-sitemap generated a sitemap index, restore our manual one
    if (content.includes('<sitemapindex')) {
        console.log('[copy-sitemap] Detected sitemap index, restoring manual sitemap.xml');
        if (fs.existsSync(backupSitemap)) {
            fs.copyFileSync(backupSitemap, manualSitemap);
            console.log('[copy-sitemap] Restored manual sitemap.xml from backup');
        } else {
            console.error('[copy-sitemap] ERROR: Backup not found! Please restore public/sitemap.xml manually');
        }
    }
}

// Remove any sitemap index files that next-sitemap might have generated
const sitemapIndex = path.join(publicDir, 'sitemap-index.xml');
if (fs.existsSync(sitemapIndex)) {
    try {
        fs.unlinkSync(sitemapIndex);
        console.log('[copy-sitemap] Removed sitemap-index.xml');
    } catch (error) {
        console.warn('[copy-sitemap] Could not remove sitemap-index.xml:', error.message);
    }
}

// Remove any numbered sitemap files (sitemap-0.xml, sitemap-1.xml, etc.)
const files = fs.readdirSync(publicDir);
files.forEach(file => {
    if (file.match(/^sitemap-\d+\.xml$/)) {
        const filePath = path.join(publicDir, file);
        try {
            fs.unlinkSync(filePath);
            console.log(`[copy-sitemap] Removed ${file}`);
        } catch (error) {
            console.warn(`[copy-sitemap] Could not remove ${file}:`, error.message);
        }
    }
});

// Final check: ensure our manual sitemap.xml is a urlset, not sitemapindex
if (fs.existsSync(manualSitemap)) {
    const finalContent = fs.readFileSync(manualSitemap, 'utf8');
    if (finalContent.includes('<sitemapindex')) {
        console.error('[copy-sitemap] ERROR: sitemap.xml still contains sitemapindex!');
        console.error('[copy-sitemap] Trying to restore from backup...');
        if (fs.existsSync(backupSitemap)) {
            fs.copyFileSync(backupSitemap, manualSitemap);
            console.log('[copy-sitemap] Restored manual sitemap.xml from backup');
        } else {
            console.error('[copy-sitemap] Backup not found! Please restore public/sitemap.xml manually');
        }
    } else if (finalContent.includes('<urlset')) {
        const urlCount = (finalContent.match(/<url>/g) || []).length;
        console.log(`[copy-sitemap] ✓ Manual sitemap.xml is ready (contains <urlset> with ${urlCount} URLs)`);
    }
} else {
    console.warn('[copy-sitemap] Warning: public/sitemap.xml not found');
    if (fs.existsSync(backupSitemap)) {
        fs.copyFileSync(backupSitemap, manualSitemap);
        console.log('[copy-sitemap] Restored sitemap.xml from backup');
    } else {
        console.warn('[copy-sitemap] Please ensure public/sitemap.xml exists with all URLs');
    }
}

console.log('[copy-sitemap] Sitemap.xml is ready in public/');

