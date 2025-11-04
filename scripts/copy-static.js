// Copy assets/images -> public/assets/images for Next.js static serving
const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'assets', 'images');
const destDir = path.join(process.cwd(), 'public', 'assets', 'images');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        ensureDir(dest);
        for (const entry of fs.readdirSync(src)) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

ensureDir(destDir);
copyRecursive(srcDir, destDir);
console.log(`[copy-static] Copied images from ${srcDir} to ${destDir}`);


