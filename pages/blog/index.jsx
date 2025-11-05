import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import MobileNav from '../../components/MobileNav';

export async function getServerSideProps() {
    // Server-side render static, crawlable content
    // Dynamically import server-only module to avoid bundling 'fs' on client
    try {
        const { getPostMetas, getAllTags } = await import('../../lib/posts');
        const posts = getPostMetas ? getPostMetas() : [];
        const tags = getAllTags ? getAllTags() : [];
        return { props: { posts, tags } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return { props: { posts: [], tags: [] } };
    }
}

export default function BlogIndex({ posts, tags }) {
    return (
        <>
            <SEOHead
                title="Blog - AI Rap Lyrics Generator | Rap Writing Tips & Inspiration"
                description="Discover rap lyrics writing tips, techniques, and inspiration. Expert advice for creating authentic, powerful rap songs with our AI generator."
                url="/blog"
                image="/assets/images/rap-lyrics-dreams-are-not-out-of-reach.webp"
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Blog',
                            name: 'AI Rap Lyrics Generator Blog',
                            description: 'Discover rap lyrics writing tips, techniques, and inspiration for creating authentic rap songs',
                            url: '/blog',
                            publisher: {
                                '@type': 'Organization',
                                name: 'AI Rap Lyrics Generator Team'
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
                                    <img src="/assets/images/logo.webp" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" width="32" height="32" loading="eager" />
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

                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                <span className="gradient-text">Rap Lyrics Blog</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8">
                                Rap lyrics writing tips, techniques, and inspiration for creating authentic rap songs
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {posts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg mb-4">No blog posts available at the moment.</p>
                                <p className="text-gray-500 text-sm">Please check back later.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                                    <article className="blog-card rounded-lg p-6 fade-in hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 bg-white">
                                        <div className="mb-4">
                                            <div className={`w-full aspect-video bg-gradient-to-br ${post.gradient || 'from-purple-500 to-pink-500'} rounded-lg mb-4 overflow-hidden`}>
                                                <Image
                                                    src={post.image || '/assets/images/rap-lyrics-blog (1).webp'}
                                                    alt={post.title || post.slug}
                                                    width={600}
                                                    height={338}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="blog-tag">#{post.tag?.toUpperCase() || 'GUIDE'}</span>
                                                <span className="text-sm text-gray-400">{post.date || '1/27/2025'}</span>
                                            </div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title || post.slug.replace(/-/g, ' ')}</h2>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                {post.description || 'Learn about rap lyrics writing tips and techniques.'}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                                    <Image
                                                        src="/assets/images/logo.webp"
                                                        alt="Author"
                                                        width={32}
                                                        height={32}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-900 font-medium">Rap Expert</p>
                                                    <p className="text-xs text-gray-400">AI Rap Lyrics Team</p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Related Cases Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Real Rap Lyrics Examples</h2>
                            <p className="text-lg text-gray-600">Discover how our AI creates personalized rap lyrics for different themes and styles.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Example 1 */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-400 transition-colors">
                                <Image
                                    src="/assets/images/rap-lyrics-longing-for -home.webp"
                                    alt="Longing for Home Rap Lyrics Example"
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Longing for Home</h3>
                                    <p className="text-gray-600 text-sm mb-4">A powerful rap about middle-aged struggles, the weight of dreams, and the desire to return home. Features sharp rhymes and emotional storytelling...</p>
                                    <Link href="/examples" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors font-medium">
                                        <span>View Example</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Example 2 */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-400 transition-colors">
                                <Image
                                    src="/assets/images/rap-lyrics-dreams-are-not-out-of-reach.webp"
                                    alt="Dreams are not out of reach Rap Lyrics Example"
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dreams are not out of reach</h3>
                                    <p className="text-gray-600 text-sm mb-4">An inspiring rap about persistence, grind, and ultimate victory. A story of a little girl&apos;s journey from the playground to the big stage...</p>
                                    <Link href="/examples" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors font-medium">
                                        <span>View Example</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Example 3 */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-purple-400 transition-colors">
                                <Image
                                    src="/assets/images/rap-lyrics-homeland-in-war.webp"
                                    alt="Protecting Homeland in War Rap Lyrics Example"
                                    width={600}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Protecting One&apos;s Homeland in War</h3>
                                    <p className="text-gray-600 text-sm mb-4">A raw narrative of conflict, loss, and resilience. Powerful verses about the cost of war and the spirit that endures...</p>
                                    <Link href="/examples" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors font-medium">
                                        <span>View Example</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center mt-8">
                            <Link href="/examples" className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-colors duration-300 min-h-[48px] flex items-center justify-center">
                                View All Examples
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-16 bg-white border-t border-gray-200">
                    <div className="container-max-width mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Logo and Name */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                                        <img src="/assets/images/logo.webp" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" width="32" height="32" loading="eager" />
                                        <span className="text-xl font-bold text-purple-600">AI Rap Lyrics</span>
                                    </Link>
                                </div>
                                <p className="text-gray-600 mb-4">Create personalized, authentic rap lyrics with AI. Perfect for your music and creative projects.</p>
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

            <style jsx global>{`
                .container-max-width {
                    max-width: 1200px;
                }
                .gradient-text {
                    background: linear-gradient(45deg, #7c3aed, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .blog-card {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                .blog-card:hover {
                    border-color: #7c3aed;
                    transform: translateY(-2px);
                }
                .blog-tag {
                    background: linear-gradient(45deg, #7c3aed, #a78bfa);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
