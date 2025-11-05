const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-rap-lyrics-generator.momo-test.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    generateRobotsTxt: false, // 使用我们手动的 robots.txt
    generateIndexSitemap: false, // 禁用 sitemap index，生成单个 sitemap 文件
    exclude: [
        '/api/*',
        '/blog/page/*',
        '/blog/tag/*'
    ],
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 50000, // 设置一个很大的值，确保生成单个文件（默认是 5000）
    transform: async (config, url) => {
        return {
            loc: url,
            changefreq: url.startsWith('/blog') ? 'monthly' : url.startsWith('/examples') ? 'monthly' : url === '/' ? 'weekly' : 'yearly',
            priority: url === '/' ? 1.0 : url.startsWith('/blog') ? 0.8 : url.startsWith('/examples') ? 0.85 : 0.6,
            lastmod: new Date().toISOString(),
            alternateRefs: []
        };
    }
};


