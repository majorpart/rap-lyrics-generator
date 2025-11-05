import Head from 'next/head';

export default function SEOHead({
    title = 'Rap Lyrics Generator - Create Powerful Rap Lyrics with AI',
    description = 'Use our AI rap lyrics generator to create powerful, original rap lyrics in seconds. Perfect for artists and creators.',
    url = '/',
    image = '/assets/images/rap-lyrics-generator2.png',
    noIndex = false
}) {
    // Default site URL if environment variable is not set
    const defaultSiteUrl = 'https://ai-rap-lyrics-generator.momo-test.com';
    const site = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
    const toAbs = (u) => {
        // If already absolute URL, return as is
        if (u?.startsWith('http')) return u;
        // Ensure URL starts with / and site doesn't end with /
        const cleanUrl = u.startsWith('/') ? u : `/${u}`;
        const cleanSite = site.endsWith('/') ? site.slice(0, -1) : site;
        return `${cleanSite}${cleanUrl}`;
    };
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
            <link rel="canonical" href={toAbs(url)} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={toAbs(url)} />
            <meta property="og:image" content={toAbs(image)} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={toAbs(image)} />
        </Head>
    );
}


