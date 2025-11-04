import Head from 'next/head';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import MobileNav from '../../../components/MobileNav';

export async function getServerSideProps({ params }) {
    // Dynamically import server-only module to avoid bundling 'fs' on client
    try {
        const { paginatePosts } = await import('../../../lib/posts');
        const pages = paginatePosts();
        const index = Math.max(0, Math.min(pages.length - 1, Number(params.page) - 1));
        const posts = pages[index] || [];
        return { props: { posts, current: index + 1, total: pages.length } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { props: { posts: [], current: 1, total: 1 } };
    }
}

export default function BlogPage({ posts, current, total }) {
    const url = `/blog/page/${current}`;
    
    return (
        <>
            <SEOHead 
                title={`Rap Lyrics Blog - Page ${current} of ${total} | AI Rap Lyrics Generator`}
                description={`Browse page ${current} of ${total} of our rap lyrics blog. Discover tips, guides, and inspiration for creating powerful rap lyrics.`}
                url={url}
                image="/assets/images/rap-lyrics-blog (1).jpg"
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'CollectionPage',
                            name: `Rap Lyrics Blog - Page ${current}`,
                            description: `Browse page ${current} of ${total} of our rap lyrics blog`,
                            url: url,
                            mainEntity: {
                                '@type': 'ItemList',
                                numberOfItems: posts.length,
                                itemListElement: posts.map((post, index) => ({
                                    '@type': 'ListItem',
                                    position: index + 1,
                                    item: {
                                        '@type': 'Article',
                                        headline: post.title,
                                        description: post.description,
                                        url: `/blog/${post.slug}`
                                    }
                                }))
                            }
                        })
                    }}
                />
            </Head>

            <main className="min-h-screen bg-white" style={{ fontFamily: "'Slabo 27px', serif" }}>
                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center h-16 relative">
                            <div className="absolute left-0 flex items-center">
                                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                                    <img src="/assets/images/logo.png" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" />
                                    <span className="text-xl font-bold text-purple-600">AI Rap Lyrics</span>
                                </Link>
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <Link href="/" className="nav-link text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Rap Lyrics</Link>
                                <Link href="/examples" className="nav-link text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Examples</Link>
                                <Link href="/blog" className="nav-link text-purple-600 font-bold border-b-2 border-purple-600 transition-colors min-h-[48px] flex items-center">Blog</Link>
                            </div>
                            <MobileNav />
                        </div>
                    </div>
                </nav>

                {/* Breadcrumb Navigation */}
                <div className="pt-20 pb-4 bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="text-sm text-gray-500">
                            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/blog" className="hover:text-purple-600 transition-colors">Blog</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">Page {current}</span>
                        </nav>
                    </div>
                </div>

                {/* Back to Blog Link */}
                <div className="bg-white pb-4">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors min-h-[48px] flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="pt-4 pb-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Blog - Page {current} of {total}</h1>
                        
                        {posts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">No posts found on this page.</p>
                                <Link href="/blog" className="mt-4 inline-block text-purple-600 hover:text-purple-500 transition-colors">
                                    Go back to Blog
                                </Link>
                            </div>
                        ) : (
                            <>
                                <ul className="space-y-6 mb-8">
                                    {posts.map((p) => (
                                        <li key={p.slug} className="border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors">
                                            <Link href={`/blog/${p.slug}`} className="block">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">#{p.tag.toUpperCase()}</span>
                                                    <span className="text-sm text-gray-500">{p.date}</span>
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors min-h-[48px] flex items-start">
                                                    {p.title}
                                                </h2>
                                                {p.description && (
                                                    <p className="text-gray-600 text-base leading-relaxed">{p.description}</p>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Pagination */}
                                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                                    {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
                                        <Link 
                                            key={p} 
                                            href={`/blog/page/${p}`}
                                            className={`px-4 py-2 rounded-lg border min-h-[48px] min-w-[48px] flex items-center justify-center text-base font-medium transition-colors ${
                                                p === current 
                                                    ? 'bg-purple-600 text-white border-purple-600' 
                                                    : 'border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600'
                                            }`}
                                        >
                                            {p}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-16 bg-white border-t border-gray-200">
                    <div className="container-max-width mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Logo and Name */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                                        <img src="/assets/images/logo.png" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" />
                                        <span className="text-xl font-bold text-purple-600">AI Rap Lyrics</span>
                                    </Link>
                                </div>
                                <p className="text-gray-600 mb-4">Create personalized, authentic rap lyrics with AI. Perfect for your songs and creative projects.</p>
                                <div className="flex space-x-4">
                                    <Link href="/#main-feature" className="text-purple-600 hover:text-purple-500 transition-colors font-medium">Try Now</Link>
                                    <Link href="/examples" className="text-purple-600 hover:text-purple-500 transition-colors font-medium">View Examples</Link>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                                <div className="space-y-2">
                                    <Link href="/" className="block text-gray-600 hover:text-purple-600 transition-colors">Rap Lyrics</Link>
                                    <Link href="/examples" className="block text-gray-600 hover:text-purple-600 transition-colors">Examples</Link>
                                    <Link href="/blog" className="block text-gray-600 hover:text-purple-600 transition-colors">Blog</Link>
                                </div>
                            </div>

                            {/* Legal Links */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                                <div className="space-y-2">
                                    <Link href="/privacy-policy" className="block text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</Link>
                                    <Link href="/terms-and-conditions" className="block text-gray-600 hover:text-purple-600 transition-colors">Terms and Conditions</Link>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                            <p className="text-gray-600">© 2025 AI Rap Lyrics Generator. All rights reserved.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
                                <p className="text-gray-600">
                                    Contact: <a href="mailto:support@ai-rap-lyrics-generator.momo-test.com" className="text-purple-600 hover:text-purple-500">support@ai-rap-lyrics-generator.momo-test.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
