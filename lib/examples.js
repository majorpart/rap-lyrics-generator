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
    const filePath = path.join(examplesDir, `${slug}.html`);
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
    
    // Extract image
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const image = imageMatch ? imageMatch[1].replace('https://ai-rap-lyrics-generator.momo-test.com', '') : '';
    
    // Extract main content (between body tags, excluding nav/footer/scripts)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : '';
    
    // Remove navigation, footer, scripts
    content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Extract main content section (usually the hero and main content)
    const mainContentMatch = content.match(/(<section[\s\S]*?<\/section>)/gi);
    let mainContent = '';
    if (mainContentMatch && mainContentMatch.length > 0) {
        // Get content sections (skip navigation sections)
        const contentSections = mainContentMatch.filter(section => 
            !section.includes('Navigation') && 
            !section.includes('navigation') &&
            !section.includes('Breadcrumb')
        );
        mainContent = contentSections.join('');
    } else {
        // Fallback: get everything between first section and last script
        const sectionMatch = content.match(/<section[^>]*id=["']examples["'][\s\S]*?(?=<footer|$)/i);
        if (sectionMatch) {
            mainContent = sectionMatch[0];
        } else {
            mainContent = content;
        }
    }
    
    return {
        slug,
        title,
        description,
        image,
        content: mainContent || content
    };
}

