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

// Hardcoded blog post metadata - used as fallback when files cannot be read
const HARDCODED_POST_METADATA = {
    'how-to-get-a-good-rap-through-rap-lyrics-generator': {
        title: 'How to Get a Good Rap Through Rap Lyrics Generator',
        description: 'Learn how to use our AI rap lyrics generator to create powerful, authentic rap lyrics. Discover tips and techniques for generating high-quality rap lyrics that match your style and message.',
        image: '/assets/images/rap-lyrics-blog (1).jpg',
        tag: 'GUIDE',
        date: '1/27/2025',
        gradient: 'from-purple-500 to-pink-500'
    },
    'how-to-write-rap-lyrics': {
        title: 'How to Write Rap Lyrics',
        description: 'Master the art of writing rap lyrics with our comprehensive guide. Learn about rhyme schemes, flow, storytelling, and how to create memorable rap verses that resonate with listeners.',
        image: '/assets/images/rap-lyrics-blog (2).jpg',
        tag: 'TUTORIAL',
        date: '1/27/2025',
        gradient: 'from-pink-500 to-purple-500'
    },
    'how-to-write-rap-lyrics-to-a-beat': {
        title: 'How to Write Rap Lyrics to a Beat',
        description: 'Discover how to sync your rap lyrics with a beat. Learn about timing, rhythm, and flow to create lyrics that perfectly match your instrumental track.',
        image: '/assets/images/rap-lyrics-blog (3).jpg',
        tag: 'GUIDE',
        date: '1/27/2025',
        gradient: 'from-blue-500 to-indigo-500'
    },
    'what-makes-a-good-rap-lyric': {
        title: 'What Makes a Good Rap Lyric',
        description: 'Explore the essential elements that make rap lyrics great. Learn about authenticity, wordplay, storytelling, flow, and emotional connection in rap music.',
        image: '/assets/images/rap-lyrics-blog (4).jpg',
        tag: 'GUIDE',
        date: '1/27/2025',
        gradient: 'from-green-500 to-teal-500'
    },
    'how-can-i-turn-my-experiences-into-lyrics-using-an-ai-rap-lyric-generator': {
        title: 'How Can I Turn My Experiences Into Lyrics Using an AI Rap Lyric Generator',
        description: 'Learn how to transform your personal experiences into powerful rap lyrics using our AI generator. Discover tips for incorporating real stories and emotions into your rap music.',
        image: '/assets/images/rap-lyrics-blog (5).jpg',
        tag: 'GUIDE',
        date: '1/27/2025',
        gradient: 'from-purple-500 to-pink-500'
    },
    'how-can-one-obtain-inspiration-for-creating-rap-lyrics': {
        title: 'How Can One Obtain Inspiration for Creating Rap Lyrics',
        description: 'Discover sources of inspiration for creating rap lyrics. Learn how to find ideas, overcome writer\'s block, and keep your creative flow going with practical tips and techniques.',
        image: '/assets/images/rap-lyrics-blog (6).jpg',
        tag: 'TIPS',
        date: '1/27/2025',
        gradient: 'from-indigo-500 to-blue-500'
    }
};

export function getPostMetas(limit = null) {
    try {
        let slugs = getAllSlugs();
        
        // Fallback: if no slugs found (e.g., in production when files aren't accessible), use hardcoded list
        if (!slugs || slugs.length === 0) {
            console.warn('No blog files found, using hardcoded post metadata');
            slugs = Object.keys(HARDCODED_POST_METADATA);
        }
        
        // Blog post metadata mapping based on original blog.html
        const postMetadata = HARDCODED_POST_METADATA;

        const metas = slugs
            .map((slug) => {
                try {
                    // Try to get title and description from file
                    let title, description;
                    try {
                        const fileData = getPostHtmlBySlug(slug);
                        title = fileData.title;
                        description = fileData.description;
                    } catch (fileError) {
                        // If file read fails, use hardcoded metadata
                        console.warn(`Could not read file for ${slug}, using hardcoded metadata`);
                        const hardcoded = postMetadata[slug];
                        if (hardcoded) {
                            title = hardcoded.title;
                            description = hardcoded.description;
                        } else {
                            title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            description = '';
                        }
                    }
                    
                    const metadata = postMetadata[slug] || {
                        image: '/assets/images/rap-lyrics-blog (1).jpg',
                        tag: inferTagFromTitle(title).toUpperCase().replace('-', '_'),
                        date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
                        gradient: 'from-purple-500 to-pink-500'
                    };
                    
                    return { 
                        slug, 
                        title: title || slug.replace(/-/g, ' '),
                        description: description || '',
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
        
        // Sort by slug to ensure consistent order
        metas.sort((a, b) => a.slug.localeCompare(b.slug));
        
        return limit ? metas.slice(0, limit) : metas;
    } catch (error) {
        console.error('Error in getPostMetas:', error);
        // Return hardcoded posts as fallback
        const fallbackMetas = Object.keys(HARDCODED_POST_METADATA).map(slug => {
            const metadata = HARDCODED_POST_METADATA[slug];
            return {
                slug,
                title: metadata.title,
                description: metadata.description,
                tag: metadata.tag.toLowerCase().replace('_', '-'),
                image: metadata.image,
                date: metadata.date,
                gradient: metadata.gradient
            };
        });
        return limit ? fallbackMetas.slice(0, limit) : fallbackMetas;
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


