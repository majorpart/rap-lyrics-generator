import Link from 'next/link';
import SEOHead from '../../components/SEOHead';

export async function getServerSideProps() {
    const { getPostMetas, getAllTags } = await import('../../lib/posts');
    const posts = getPostMetas();
    const tags = getAllTags();
    return { props: { posts, tags } };
}

export default function BlogIndex({ posts, tags }) {
    return (
        <>
            <SEOHead title="Rap Lyrics Blog" description="Guides and tips about writing rap lyrics and using AI generators." url="/blog" />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Rap Lyrics Blog</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <Link key={t} className="px-4 py-2 rounded border text-sm sm:text-base hover:bg-purple-50 min-h-[48px] flex items-center justify-center" href={`/blog/tag/${t}`}>#{t}</Link>
                    ))}
                </div>
                <ul className="mt-6 space-y-4">
                    {posts.map((p) => (
                        <li key={p.slug} className="border rounded p-4 sm:p-6">
                            <Link className="text-purple-700 hover:underline text-lg sm:text-xl min-h-[48px] inline-flex items-start" href={`/blog/${p.slug}`}>{p.title || p.slug.replace(/-/g, ' ')}</Link>
                            <div className="mt-1 text-xs sm:text-sm text-gray-500">#{p.tag}</div>
                            {p.description && <p className="text-gray-600 mt-2 text-base sm:text-lg">{p.description}</p>}
                        </li>
                    ))}
                </ul>
                <div className="mt-8 flex gap-2 flex-wrap">
                    <Link className="px-4 py-2 rounded border min-h-[48px] min-w-[48px] flex items-center justify-center text-base" href="/blog/page/1">1</Link>
                    <Link className="px-4 py-2 rounded border min-h-[48px] min-w-[48px] flex items-center justify-center text-base" href="/blog/page/2">2</Link>
                </div>
            </main>
        </>
    );
}


