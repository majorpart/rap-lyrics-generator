export function getAllSlugs() {
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(process.cwd(), 'blog');
    if (!fs.existsSync(blogDir)) return [];
    return fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => f.replace(/\.html$/, ''));
}

export function getPostHtmlBySlug(slug) {
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(process.cwd(), 'blog');
    const filePath = path.join(blogDir, `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        console.warn(`Blog post file not found: ${filePath}`);
        return { title: slug, description: '', html: '<p>Post not found</p>' };
    }
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        const title = extractTitle(html, slug);
        const description = extractDescription(html);
        
        // Extract body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        let content = bodyMatch ? bodyMatch[1] : '';
        
        // Remove navigation, footer, scripts
        content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
        content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
        content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
        
        // Remove breadcrumb navigation
        content = content.replace(/<div[^>]*class=["'][^"']*pt-20[^"']*pb-4[^"']*["'][\s\S]*?<\/div>/gi, '');
        content = content.replace(/<nav[^>]*class=["'][^"']*text-sm[^"']*text-gray-500[^"']*["'][\s\S]*?<\/nav>/gi, '');
        
        // Remove "Back to Blog" link
        content = content.replace(/<div[^>]*class=["'][^"']*bg-white[^"']*pb-4[^"']*["'][\s\S]*?Back to Blog[\s\S]*?<\/div>/gi, '');
        
        // Remove post header (tag, date, title)
        content = content.replace(/<div[^>]*class=["'][^"']*bg-white[^"']*pb-8[^"']*["'][\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/div>/gi, '');
        
        // Remove hero image section
        content = content.replace(/<div[^>]*class=["'][^"']*bg-white[^"']*pb-8[^"']*["'][\s\S]*?<div[^>]*class=["'][^"']*w-full[^"']*aspect-video[^"']*["'][\s\S]*?<\/div>[\s\S]*?<\/div>/gi, '');
        
        // Extract only the article content (prose div)
        const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        if (articleMatch) {
            let articleContent = articleMatch[1];
            // Extract prose div content
            const proseMatch = articleContent.match(/<div[^>]*class=["'][^"']*prose[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
            if (proseMatch) {
                content = proseMatch[1];
            } else {
                content = articleContent;
            }
        }
        
        // Remove Call to Action section
        content = content.replace(/<section[^>]*class=["'][^"']*py-16[^"']*bg-gray-50[^"']*["'][\s\S]*?Ready to Create Your Own[\s\S]*?<\/section>/gi, '');
        
        // Fix image paths to be absolute
        content = content.replace(/src=["'](\.\.\/)?assets\//g, 'src="/assets/');
        content = content.replace(/src=["'](assets\/)/g, 'src="/assets/');
        
        // If content is empty, return fallback
        if (!content.trim()) {
            content = '<p>Content not available</p>';
        }
        
        return { title, description, html: content };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return { title: slug, description: '', html: '<p>Error loading post</p>' };
    }
}

export function getPostMetas(limit = null) {
    try {
        const slugs = getAllSlugs();
        // Blog post metadata mapping based on original blog.html
        const postMetadata = {
            'how-to-get-a-good-rap-through-rap-lyrics-generator': {
                image: '/assets/images/rap-lyrics-blog (1).jpg',
                tag: 'GUIDE',
                date: '1/27/2025',
                gradient: 'from-purple-500 to-pink-500'
            },
            'how-to-write-rap-lyrics': {
                image: '/assets/images/rap-lyrics-blog (2).jpg',
                tag: 'TUTORIAL',
                date: '1/27/2025',
                gradient: 'from-pink-500 to-purple-500'
            },
            'how-to-write-rap-lyrics-to-a-beat': {
                image: '/assets/images/rap-lyrics-blog (3).jpg',
                tag: 'GUIDE',
                date: '1/27/2025',
                gradient: 'from-blue-500 to-indigo-500'
            },
            'what-makes-a-good-rap-lyric': {
                image: '/assets/images/rap-lyrics-blog (4).jpg',
                tag: 'GUIDE',
                date: '1/27/2025',
                gradient: 'from-green-500 to-teal-500'
            },
            'how-can-i-turn-my-experiences-into-lyrics-using-an-ai-rap-lyric-generator': {
                image: '/assets/images/rap-lyrics-blog (5).jpg',
                tag: 'GUIDE',
                date: '1/27/2025',
                gradient: 'from-purple-500 to-pink-500'
            },
            'how-can-one-obtain-inspiration-for-creating-rap-lyrics': {
                image: '/assets/images/rap-lyrics-blog (6).jpg',
                tag: 'TIPS',
                date: '1/27/2025',
                gradient: 'from-indigo-500 to-blue-500'
            }
        };

        const metas = slugs
            .map((slug) => {
                try {
                    const { title, description } = getPostHtmlBySlug(slug);
                    const metadata = postMetadata[slug] || {
                        image: '/assets/images/rap-lyrics-blog (1).jpg',
                        tag: inferTagFromTitle(title).toUpperCase().replace('-', '_'),
                        date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
                        gradient: 'from-purple-500 to-pink-500'
                    };
                    return { 
                        slug, 
                        title, 
                        description, 
                        tag: metadata.tag.toLowerCase().replace('_', '-'),
                        image: metadata.image,
                        date: metadata.date,
                        gradient: metadata.gradient
                    };
                } catch (error) {
                    console.error(`Error processing post ${slug}:`, error);
                    return null;
                }
            })
            .filter(Boolean); // Remove null entries
        return limit ? metas.slice(0, limit) : metas;
    } catch (error) {
        console.error('Error in getPostMetas:', error);
        return [];
    }
}

function strip(html) {
    return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTitle(html, fallback) {
    const titleTag = html.match(/<title>(.*?)<\/title>/i);
    const h1Tag = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2Tag = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const raw = (titleTag && titleTag[1]) || (h1Tag && h1Tag[1]) || (h2Tag && h2Tag[1]) || fallback;
    return strip(raw).slice(0, 120);
}

function extractDescription(html) {
    const meta = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (meta && meta[1]) return meta[1].trim().slice(0, 200);
    const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (p && p[1]) return strip(p[1]).slice(0, 200);
    return '';
}

export function getAllTags() {
    const metas = getPostMetas();
    const set = new Set(metas.map((m) => m.tag).filter(Boolean));
    return Array.from(set).sort();
}

export function paginatePosts(pageSize = 5) {
    const metas = getPostMetas();
    const pages = [];
    for (let i = 0; i < metas.length; i += pageSize) {
        pages.push(metas.slice(i, i + pageSize));
    }
    return pages;
}

export function filterPostsByTag(tag) {
    const metas = getPostMetas();
    return metas.filter((m) => m.tag === tag);
}

function inferTagFromTitle(title = '') {
    const t = title.toLowerCase();
    if (/(^|\s)how\b/.test(t)) return 'how-to';
    if (/(^|\s)what\b/.test(t)) return 'basics';
    if (/tips|guide|guides|best practices/.test(t)) return 'guides';
    return 'guides';
}

export function getPostImage(slug) {
    const postMetadata = {
        'how-to-get-a-good-rap-through-rap-lyrics-generator': '/assets/images/rap-lyrics-blog (1).jpg',
        'how-to-write-rap-lyrics': '/assets/images/rap-lyrics-blog (2).jpg',
        'how-to-write-rap-lyrics-to-a-beat': '/assets/images/rap-lyrics-blog (3).jpg',
        'what-makes-a-good-rap-lyric': '/assets/images/rap-lyrics-blog (4).jpg',
        'how-can-i-turn-my-experiences-into-lyrics-using-an-ai-rap-lyric-generator': '/assets/images/rap-lyrics-blog (5).jpg',
        'how-can-one-obtain-inspiration-for-creating-rap-lyrics': '/assets/images/rap-lyrics-blog (6).jpg'
    };
    return postMetadata[slug] || '/assets/images/rap-lyrics-blog (1).jpg';
}


