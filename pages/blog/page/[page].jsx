import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';

export async function getServerSideProps({ params }) {
    const { paginatePosts } = await import('../../../lib/posts');
    const pages = paginatePosts();
    const index = Math.max(0, Math.min(pages.length - 1, Number(params.page) - 1));
    const posts = pages[index];
    return { props: { posts, current: index + 1, total: pages.length } };
}

export default function BlogPage({ posts, current, total }) {
    return (
        <>
            <SEOHead title={`Rap Lyrics Blog - Page ${current}`} description={`Page ${current} of ${total}`} url={`/blog/page/${current}`} />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Blog - Page {current}/{total}</h1>
                <ul className="mt-6 space-y-4">
                    {posts.map((p) => (
                        <li key={p.slug} className="border rounded p-4 sm:p-6">
                            <Link className="text-purple-700 hover:underline text-lg sm:text-xl min-h-[48px] inline-flex items-start" href={`/blog/${p.slug}`}>{p.title}</Link>
                            <div className="mt-1 text-xs sm:text-sm text-gray-500">#{p.tag}</div>
                            {p.description && <p className="text-gray-600 mt-2 text-base sm:text-lg">{p.description}</p>}
                        </li>
                    ))}
                </ul>
                <div className="mt-8 flex gap-2 flex-wrap">
                    {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
                        <Link key={p} className={`px-4 py-2 rounded border min-h-[48px] min-w-[48px] flex items-center justify-center text-base ${p === current ? 'bg-purple-600 text-white' : ''}`} href={`/blog/page/${p}`}>{p}</Link>
                    ))}
                </div>
            </main>
        </>
    );
}


