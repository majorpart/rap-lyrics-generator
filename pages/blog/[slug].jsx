import Head from 'next/head';
import SEOHead from '../../components/SEOHead';

export async function getServerSideProps({ params }) {
    const { slug } = params;
    // Dynamically import server-only module to avoid bundling 'fs' on client
    const { getPostHtmlBySlug } = await import('../../lib/posts');
    const { title, description, html } = getPostHtmlBySlug(slug);
    return { props: { slug, title, description, html } };
}

export default function BlogPost({ slug, title, description, html }) {
    const url = `/blog/${slug}`;
    return (
        <>
            <SEOHead title={title} description={description || title} url={url} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: title,
                            description: description || undefined,
                            mainEntityOfPage: url
                        })
                    }}
                />
            </Head>
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 prose prose-base sm:prose-lg max-w-none text-base sm:text-lg">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">{title}</h1>
                <article className="text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
            </main>
        </>
    );
}


