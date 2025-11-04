const rootDir = process.cwd();

export function getLegalContent(slug) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(rootDir, `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ \| AI Rap Lyrics Generator$/, '').trim() : slug.replace(/-/g, ' ');
    
    // Extract description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : '';
    
    // Extract main content (between main tags or article tags)
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    let content = mainMatch ? mainMatch[1] : (articleMatch ? articleMatch[1] : '');
    
    // Remove navigation, footer, scripts
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Extract prose content (usually in a div with class "prose")
    const proseMatch = content.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    if (proseMatch) {
        content = proseMatch[1];
    }
    
    return {
        slug,
        title,
        description,
        content: content || ''
    };
}

