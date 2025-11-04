const fs = require('fs');
const path = require('path');

// Extract content from blog HTML files
function extractBlogContent(slug) {
    const filePath = path.join(__dirname, '..', 'blog', `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        console.warn(`Blog file not found: ${filePath}`);
        return null;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract article content
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (!articleMatch) return null;

    let content = articleMatch[1];
    
    // Extract prose div content
    const proseMatch = content.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    if (!proseMatch) return null;

    let proseContent = proseMatch[1];
    
    // Fix image paths
    proseContent = proseContent.replace(/src=["'](\.\.\/)?assets\//g, 'src="/assets/');
    proseContent = proseContent.replace(/src=["'](assets\/)/g, 'src="/assets/');
    
    // Fix links
    proseContent = proseContent.replace(/href=["'](\.\.\/)?index\.html["']/gi, 'href="/"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?examples\.html["']/gi, 'href="/examples"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?blog\.html["']/gi, 'href="/blog"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?#main-feature["']/gi, 'href="/#main-feature"');
    
    return proseContent.trim();
}

// Extract content from example HTML files
function extractExampleContent(slug) {
    const filePath = path.join(__dirname, '..', `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        console.warn(`Example file not found: ${filePath}`);
        return null;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract article content
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (!articleMatch) return null;

    let content = articleMatch[1];
    
    // Extract prose div content
    const proseMatch = content.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    if (!proseMatch) return null;

    let proseContent = proseMatch[1];
    
    // Fix image paths
    proseContent = proseContent.replace(/src=["'](\.\.\/)?assets\//g, 'src="/assets/');
    proseContent = proseContent.replace(/src=["'](assets\/)/g, 'src="/assets/');
    
    // Fix links
    proseContent = proseContent.replace(/href=["'](\.\.\/)?index\.html["']/gi, 'href="/"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?examples\.html["']/gi, 'href="/examples"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?blog\.html["']/gi, 'href="/blog"');
    proseContent = proseContent.replace(/href=["'](\.\.\/)?#main-feature["']/gi, 'href="/#main-feature"');
    
    // Build complete content with title and image
    const titleMatch = html.match(/<h1[^>]*class=["'][^"']*gradient-text[^"']*["'][^>]*>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');
    
    const imageMatch = html.match(/<img[^>]*src=["']([^"']*rap-lyrics[^"']*\.(jpg|jpeg|png|webp))["'][^>]*>/i);
    let image = '';
    if (imageMatch) {
        image = imageMatch[1].replace(/^\.\.\//, '').replace(/^assets\//, '/assets/');
        if (!image.startsWith('/')) image = '/' + image;
    }
    
    let fullContent = '';
    if (title) {
        fullContent += `<div class="mb-6"><h1 class="text-4xl md:text-5xl font-bold gradient-text">${title}</h1></div>`;
    }
    if (image) {
        fullContent += `<div class="mb-8"><div class="w-full aspect-video rounded-lg overflow-hidden"><img src="${image}" alt="${title}" class="w-full h-full object-cover" /></div></div>`;
    }
    fullContent += `<div class="prose prose-lg max-w-none whitespace-pre-line">${proseContent}</div>`;
    
    return fullContent.trim();
}

// Blog posts
const blogSlugs = [
    'how-to-get-a-good-rap-through-rap-lyrics-generator',
    'how-to-write-rap-lyrics',
    'how-to-write-rap-lyrics-to-a-beat',
    'what-makes-a-good-rap-lyric',
    'how-can-i-turn-my-experiences-into-lyrics-using-an-ai-rap-lyric-generator',
    'how-can-one-obtain-inspiration-for-creating-rap-lyrics'
];

// Examples
const exampleSlugs = [
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

console.log('Extracting blog content...');
const blogContent = {};
blogSlugs.forEach(slug => {
    const content = extractBlogContent(slug);
    if (content) {
        blogContent[slug] = content;
        console.log(`✓ Extracted: ${slug}`);
    } else {
        console.log(`✗ Failed: ${slug}`);
    }
});

console.log('\nExtracting example content...');
const exampleContent = {};
exampleSlugs.forEach(slug => {
    const content = extractExampleContent(slug);
    if (content) {
        exampleContent[slug] = content;
        console.log(`✓ Extracted: ${slug}`);
    } else {
        console.log(`✗ Failed: ${slug}`);
    }
});

// Output JSON for easy copy-paste
console.log('\n=== Blog Content (JSON) ===');
console.log(JSON.stringify(blogContent, null, 2));

console.log('\n=== Example Content (JSON) ===');
console.log(JSON.stringify(exampleContent, null, 2));

// Save to files
fs.writeFileSync(
    path.join(__dirname, '..', 'extracted-blog-content.json'),
    JSON.stringify(blogContent, null, 2),
    'utf8'
);

fs.writeFileSync(
    path.join(__dirname, '..', 'extracted-example-content.json'),
    JSON.stringify(exampleContent, null, 2),
    'utf8'
);

console.log('\n✓ Content extracted and saved to extracted-blog-content.json and extracted-example-content.json');

