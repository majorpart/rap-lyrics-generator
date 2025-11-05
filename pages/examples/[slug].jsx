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
                image={example.image || '/assets/images/rap-lyrics-generator2.webp'}
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
                                    <img src="/assets/images/logo.webp" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" width="32" height="32" loading="eager" />
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

                {/* Breadcrumb Navigation */}
                <div className="pt-20 pb-4 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="text-sm text-gray-500">
                            <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/examples" className="hover:text-purple-600 transition-colors">Examples</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-700">{example.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Back to Examples Link */}
                <div className="bg-white pb-4">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/examples" className="inline-flex items-center text-purple-600 hover:text-purple-500 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Examples
                        </Link>
                    </div>
                </div>

                {/* Example Header */}
                <div className="bg-white pb-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                            {example.title}
                        </h1>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="bg-white pb-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={example.image}
                                alt={example.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Lyrics Content */}
                <article className="py-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div 
                            className="prose prose-lg max-w-none whitespace-pre-line" 
                            style={{ 
                                color: '#1f2937', 
                                lineHeight: '1.8'
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: example.content }} />
                        </div>
                    </div>
                </article>

                <style jsx global>{`
                    .prose h2 {
                        color: #7c3aed;
                        font-size: 1.875rem;
                        font-weight: 400;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .prose h3 {
                        color: #7c3aed;
                        font-size: 1.5rem;
                        font-weight: 400;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                    }
                    .prose p {
                        margin-bottom: 1.25rem;
                    }
                    .prose strong {
                        color: #111827;
                        font-weight: 600;
                    }
                `}</style>
                        
                {/* Call to Action Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ready to Create Your Own?</h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            Get inspired by this example and create your own personalized rap lyrics with our AI generator. 
                            Simply provide your theme, content requirements, and preferences, and we'll craft unique rap lyrics tailored to your style.
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

            {/* Google AdSense */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5822504482860674" crossOrigin="anonymous"></script>
        </>
    );
}

