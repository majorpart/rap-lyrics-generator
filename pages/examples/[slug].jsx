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

            <main className="min-h-screen bg-gray-50">
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
                <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">{example.title}</h1>
                            {example.description && (
                                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">{example.description}</p>
                            )}
                            {example.image && (
                                <div className="mb-6 sm:mb-8">
                                    <Image
                                        src={example.image}
                                        alt={example.title}
                                        width={1200}
                                        height={675}
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>
                            )}
                            <div 
                                className="prose prose-base sm:prose-lg max-w-none text-base sm:text-lg"
                                dangerouslySetInnerHTML={{ __html: example.content }}
                            />
                        </div>
                        
                        <div className="mt-6 sm:mt-8 text-center">
                            <Link href="/examples" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[48px] flex items-center justify-center text-base font-medium">
                                View All Examples
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-16 bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                                        <img src="/assets/images/logo.png" alt="AI Rap Lyrics Logo" className="w-8 h-8 mr-3" />
                                        <span className="text-xl font-bold text-purple-600">AI Rap Lyrics</span>
                                    </Link>
                                </div>
                                <p className="text-gray-600 mb-4">Create personalized, authentic rap lyrics with AI.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                                <div className="space-y-2">
                                    <Link href="/" className="block text-gray-600 hover:text-purple-600 transition-colors">Rap Lyrics</Link>
                                    <Link href="/examples" className="block text-gray-600 hover:text-purple-600 transition-colors">Examples</Link>
                                    <Link href="/blog" className="block text-gray-600 hover:text-purple-600 transition-colors">Blog</Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
                                <div className="space-y-2">
                                    <Link href="/privacy-policy" className="block text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</Link>
                                    <Link href="/terms-and-conditions" className="block text-gray-600 hover:text-purple-600 transition-colors">Terms and Conditions</Link>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                            <p className="text-gray-500">© 2025 AI Rap Lyrics Generator. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}

