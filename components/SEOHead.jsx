import Head from 'next/head';

export default function SEOHead({
    title = 'Rap Lyrics Generator - Create Powerful Rap Lyrics with AI',
    description = 'Use our AI rap lyrics generator to create powerful, original rap lyrics in seconds. Perfect for artists and creators.',
    url = '/',
    image = '/assets/images/rap-lyrics-generator2.png',
    noIndex = false
}) {
    const site = process.env.NEXT_PUBLIC_SITE_URL || '';
    const toAbs = (u) => (u?.startsWith('http') ? u : `${site}${u}`);
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


