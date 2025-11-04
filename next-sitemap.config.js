const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    exclude: [],
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    transform: async (config, url) => {
        return {
            loc: url,
            changefreq: url.startsWith('/blog') ? 'monthly' : 'weekly',
            priority: url === '/' ? 1.0 : url.startsWith('/blog') ? 0.8 : 0.7,
            lastmod: new Date().toISOString(),
            alternateRefs: []
        };
    }
};


