import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'blog');

export function getAllSlugs() {
    if (!fs.existsSync(blogDir)) return [];
    return fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => f.replace(/\.html$/, ''));
}

export function getPostHtmlBySlug(slug) {
    const filePath = path.join(blogDir, `${slug}.html`);
    const html = fs.readFileSync(filePath, 'utf8');
    const title = extractTitle(html, slug);
    const description = extractDescription(html);
    return { title, description, html };
}

export function getPostMetas(limit = null) {
    const slugs = getAllSlugs();
    const metas = slugs.map((slug) => {
        const { title, description } = getPostHtmlBySlug(slug);
        const tag = inferTagFromTitle(title);
        return { slug, title, description, tag };
    });
    return limit ? metas.slice(0, limit) : metas;
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


