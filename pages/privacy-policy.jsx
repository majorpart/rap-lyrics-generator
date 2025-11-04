import Head from 'next/head';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import MobileNav from '../components/MobileNav';

export async function getServerSideProps() {
    // Dynamically import server-only module to avoid bundling 'fs' on client
    try {
        const { getLegalContent } = await import('../lib/legal');
        const content = getLegalContent('privacy-policy');
        
        if (!content) {
            return {
                notFound: true
            };
        }
        
        return { props: { content } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
}

export default function PrivacyPolicyPage({ content }) {
    if (!content) {
        return null;
    }

    return (
        <>
            <SEOHead
                title={`${content.title} - AI Rap Lyrics Generator`}
                description={content.description || `Privacy Policy for AI Rap Lyrics Generator - How we collect, use, and protect your information when generating rap lyrics.`}
                url="/privacy-policy"
                image="/assets/images/rap-lyrics-dreams-are-not-out-of-reach.jpg"
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: content.title,
                            description: content.description || content.title,
                            url: '/privacy-policy'
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
                                <Link href="/blog" className="nav-link text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Blog</Link>
                            </div>
                            <MobileNav />
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="pt-16">
                    {/* Hero Section */}
                    <section className="py-12 sm:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-gray-900">
                                {content.title}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                                {content.description || 'How we collect, use, and protect your information when generating rap lyrics'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Last updated: January 2025
                            </p>
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className="py-12 sm:py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className="max-w-4xl mx-auto">
                                <div 
                                    className="prose prose-base sm:prose-lg max-w-none text-base sm:text-lg"
                                    dangerouslySetInnerHTML={{ __html: content.content }}
                                />
                            </div>
                        </div>
                    </section>
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

