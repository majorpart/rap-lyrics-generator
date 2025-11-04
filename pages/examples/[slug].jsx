import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import MobileNav from '../../components/MobileNav';

export async function getServerSideProps({ params }) {
    const { slug } = params;
    const { getExampleBySlug } = await import('../../lib/examples');
    const example = getExampleBySlug(slug);
    
    if (!example) {
        return {
            notFound: true
        };
    }
    
    return { props: { example } };
}

export default function ExampleDetailPage({ example }) {
    if (!example) {
        return null;
    }

    return (
        <>
            <SEOHead
                title={`${example.title} - Rap Lyrics Example | AI Rap Lyrics Generator`}
                description={example.description || `Explore the rap lyrics example '${example.title}' - AI-generated rap lyrics with sharp rhymes and emotional storytelling.`}
                url={`/examples/${example.slug}`}
                image={example.image || '/assets/images/rap-lyrics-generator2.png'}
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: example.title,
                            description: example.description || example.title,
                            mainEntityOfPage: `/examples/${example.slug}`,
                            image: example.image || '/assets/images/rap-lyrics-generator2.png'
                        })
                    }}
                />
            </Head>

            <main className="min-h-screen bg-gray-50" style={{ fontFamily: "'Slabo 27px', serif" }}>
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
                                <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Rap Lyrics</Link>
                                <Link href="/examples" className="text-purple-600 font-bold border-b-2 border-purple-600 transition-colors min-h-[48px] flex items-center">Examples</Link>
                                <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Blog</Link>
                            </div>
                            <MobileNav />
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        {/* Breadcrumb */}
                        <nav className="mb-6 text-sm text-gray-600">
                            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/examples" className="hover:text-purple-600 transition-colors">Examples</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">{example.title}</span>
                        </nav>

                        {/* Back to Examples */}
                        <div className="mb-6">
                            <Link href="/examples" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Examples
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                            {example.description && (
                                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">{example.description}</p>
                            )}
                            <div 
                                className="prose prose-base sm:prose-lg max-w-none text-base sm:text-lg"
                                dangerouslySetInnerHTML={{ __html: example.content }}
                            />
                        </div>
                        
                        {/* Call to Action Section */}
                        <section className="mt-12 py-12 bg-gray-50 rounded-lg">
                            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Create Your Own?</h2>
                                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Get inspired by this example and create your own personalized rap lyrics with our AI generator. Simply provide your theme, content requirements, and preferences, and we'll craft unique rap lyrics tailored to your style.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link 
                                        href="/#main-feature" 
                                        className="px-8 py-4 rounded-lg font-semibold text-white text-lg hover:shadow-lg transition-all duration-300 min-h-[48px] flex items-center justify-center" 
                                        style={{ background: 'linear-gradient(45deg, #7c3aed, #a78bfa)' }}
                                    >
                                        Generate Your Rap Lyrics
                                    </Link>
                                    <Link 
                                        href="/examples" 
                                        className="px-8 py-4 border border-purple-600 text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 min-h-[48px] flex items-center justify-center"
                                    >
                                        View More Examples
                                    </Link>
                                    <Link 
                                        href="/blog" 
                                        className="px-8 py-4 border border-purple-600 text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 min-h-[48px] flex items-center justify-center"
                                    >
                                        Read Our Blog
                                    </Link>
                                </div>
                            </div>
                        </section>
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

