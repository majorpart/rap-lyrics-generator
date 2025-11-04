import fs from 'fs';
import path from 'path';

const examplesDir = process.cwd();

export function getAllExampleSlugs() {
    const exampleFiles = [
        'longing-for-home',
        'dreams-are-not-out-of-reach',
        'protecting-homeland-in-war',
        'the-boy-confessed-his-feelings-to-the-girl',
        'brothers-keeper',
        'delivery-flow',
        'ghostwriter-no-more',
        'our-broken-hit',
        'underdog-anthem'
    ];
    return exampleFiles;
}

export function getExampleBySlug(slug) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(examplesDir, `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        console.warn(`Example file not found: ${filePath}`);
        return null;
    }
    
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        
        // Extract title
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(/ \| AI Rap Lyrics Generator$/, '').trim() : slug.replace(/-/g, ' ');
        
        // Extract description
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        const description = descMatch ? descMatch[1].trim() : '';
        
        // Extract image - try multiple methods
        let image = '';
        // Method 1: og:image meta tag
        const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        if (imageMatch) {
            image = imageMatch[1].replace('https://ai-rap-lyrics-generator.momo-test.com', '').replace(/^https?:\/\/[^\/]+/, '');
        } else {
            // Method 2: Find img tag in hero section
            const imgTagMatch = html.match(/<img[^>]*src=["']([^"']*rap-lyrics[^"']*\.(jpg|jpeg|png|webp))["'][^>]*>/i);
            if (imgTagMatch) {
                image = imgTagMatch[1].replace(/^https?:\/\/[^\/]+/, '').replace(/^\.\.\//, '/').replace(/^assets\//, '/assets/');
                if (!image.startsWith('/')) image = '/' + image;
            }
        }
        
        // Extract main content - get everything between body tags
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        let content = bodyMatch ? bodyMatch[1] : '';
        
        // Remove navigation, footer, scripts, breadcrumb
        content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
        content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
        content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
        // Remove breadcrumb navigation
        content = content.replace(/<div[^>]*class=["'][^"']*breadcrumb[^"']*["'][\s\S]*?<\/div>/gi, '');
        content = content.replace(/<nav[^>]*class=["'][^"']*breadcrumb[^"']*["'][\s\S]*?<\/nav>/gi, '');
        // Remove "Back to Examples" link
        content = content.replace(/<div[^>]*>[\s\S]*?Back to Examples[\s\S]*?<\/div>/gi, '');
        
        // Extract the main content structure:
        // 1. Example Header (h1 title)
        // 2. Hero Image
        // 3. Lyrics Content (article with prose div)
        // 4. Call to Action Section
        
        // Build the complete content HTML
        let mainContent = '';
        
        // Extract title section
        const titleSectionMatch = content.match(/<h1[^>]*class=["'][^"']*gradient-text[^"']*["'][^>]*>(.*?)<\/h1>/i);
        if (titleSectionMatch) {
            mainContent += `<div class="mb-6"><h1 class="text-4xl md:text-5xl font-bold gradient-text">${titleSectionMatch[1].trim()}</h1></div>`;
        }
        
        // Extract hero image
        const heroImageMatch = content.match(/<div[^>]*class=["'][^"']*aspect-video[^"']*["'][^>]*>[\s\S]*?<img[^>]*src=["']([^"']+)["'][^>]*>/i);
        if (heroImageMatch) {
            let imgSrc = heroImageMatch[1].replace(/^https?:\/\/[^\/]+/, '').replace(/^\.\.\//, '/').replace(/^assets\//, '/assets/');
            if (!imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;
            mainContent += `<div class="mb-8"><div class="w-full aspect-video rounded-lg overflow-hidden"><img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover" /></div></div>`;
        }
        
        // Extract lyrics content (article with prose div)
        const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        if (articleMatch) {
            let articleContent = articleMatch[1];
            // Extract the prose div content
            const proseMatch = articleContent.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
            if (proseMatch) {
                mainContent += `<div class="prose prose-lg max-w-none whitespace-pre-line">${proseMatch[1]}</div>`;
            } else {
                // Fallback: use entire article content
                mainContent += `<div class="prose prose-lg max-w-none whitespace-pre-line">${articleContent}</div>`;
            }
        } else {
            // Fallback: try to find any div with prose class
            const proseDivMatch = content.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
            if (proseDivMatch) {
                mainContent += `<div class="prose prose-lg max-w-none whitespace-pre-line">${proseDivMatch[1]}</div>`;
            }
        }
        
        // Remove Call to Action section from extracted content
        // We'll add our own CTA buttons in the page component to ensure correct links
        mainContent = mainContent.replace(/<section[^>]*class=["'][^"']*Call to Action[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi, '');
        mainContent = mainContent.replace(/<section[^>]*>[\s\S]*?Ready to Create[\s\S]*?<\/section>/gi, '');
        
        // If mainContent is empty, use cleaned content as fallback
        if (!mainContent.trim()) {
            mainContent = content;
        }
        
        // Fix image paths in content
        mainContent = mainContent.replace(/src=["'](\.\.\/)?assets\//g, 'src="/assets/');
        mainContent = mainContent.replace(/src=["'](assets\/)/g, 'src="/assets/');
        
        // Fix links in content (remove relative paths that might cause 404)
        mainContent = mainContent.replace(/href=["'](\.\.\/)?index\.html["']/gi, 'href="/"');
        mainContent = mainContent.replace(/href=["'](\.\.\/)?examples\.html["']/gi, 'href="/examples"');
        mainContent = mainContent.replace(/href=["'](\.\.\/)?blog\.html["']/gi, 'href="/blog"');
        mainContent = mainContent.replace(/href=["'](\.\.\/)?#main-feature["']/gi, 'href="/#main-feature"');
        
        return {
            slug,
            title,
            description,
            image: image || '/assets/images/rap-lyrics-generator2.png',
            content: mainContent || content
        };
    } catch (error) {
        console.error(`Error reading example ${slug}:`, error);
        return null;
    }
}

