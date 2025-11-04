// Copy assets -> public/assets for Next.js static serving
const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'assets');
const destDir = path.join(process.cwd(), 'public', 'assets');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        console.warn(`[copy-static] Source directory does not exist: ${src}`);
        return;
    }
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        ensureDir(dest);
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        ensureDir(path.dirname(dest));
        fs.copyFileSync(src, dest);
    }
}

// Copy entire assets directory
ensureDir(destDir);
copyRecursive(srcDir, destDir);
console.log(`[copy-static] Copied assets from ${srcDir} to ${destDir}`);


