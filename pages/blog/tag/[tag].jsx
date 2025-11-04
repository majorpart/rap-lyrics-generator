import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import { getAllTags, filterPostsByTag } from '../../../lib/posts';

export async function getServerSideProps({ params }) {
    const tag = params.tag;
    const posts = filterPostsByTag(tag);
    return { props: { tag, posts } };
}

export default function TagPage({ tag, posts }) {
    return (
        <>
            <SEOHead title={`Tag: ${tag}`} description={`Posts tagged with ${tag}`} url={`/blog/tag/${tag}`} />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tag: #{tag}</h1>
                <ul className="mt-6 space-y-4">
                    {posts.map((p) => (
                        <li key={p.slug} className="border rounded p-4 sm:p-6">
                            <Link className="text-purple-700 hover:underline text-lg sm:text-xl min-h-[48px] inline-flex items-start" href={`/blog/${p.slug}`}>{p.title}</Link>
                            {p.description && <p className="text-gray-600 mt-2 text-base sm:text-lg">{p.description}</p>}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}


