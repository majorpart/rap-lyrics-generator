import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../components/SEOHead';
import MobileNav from '../components/MobileNav';

export async function getServerSideProps() {
    // Server-side render static, crawlable content
    const examples = [
        {
            slug: 'longing-for-home',
            title: 'Longing for Home',
            description: 'A powerful rap about middle-aged struggles, the weight of dreams, and the desire to return home.',
            image: '/assets/images/rap-lyrics-longing-for -home.jpg',
            excerpt: '"Yo, middle-aged now, still chasing the dream,<br>But the hustle and bustle, it\'s wearin\' on the team.<br>I was on the grind, thought I\'d make it big..."'
        },
        {
            slug: 'dreams-are-not-out-of-reach',
            title: 'Dreams are not out of reach',
            description: 'An inspiring rap about persistence, grind, and ultimate victory.',
            image: '/assets/images/rap-lyrics-dreams-are-not-out-of-reach.jpg',
            excerpt: '"Yo, remember that little girl, playing \'round the block?<br>Head full of rhymes, feet tapping, that\'s the clock..."'
        },
        {
            slug: 'protecting-homeland-in-war',
            title: 'Protecting One\'s Homeland in War',
            description: 'A raw narrative of conflict, loss, and resilience.',
            image: '/assets/images/rap-lyrics-homeland-in-war.jpg',
            excerpt: '"Yo, walk the streets of Gaza, feel the weight on my chest,<br>Concrete dreams crumbling, peace just a distant guest..."'
        },
        {
            slug: 'the-boy-confessed-his-feelings-to-the-girl',
            title: 'The boy confessed his feelings to the girl',
            description: 'A heartfelt rap about expressing feelings and vulnerability.',
            image: '/assets/images/rap-lyrics-boy-confessed-his-feelings-to-the-girl.jpg',
            excerpt: '"Yo, the moment I saw her, time just stood still,<br>She was flipping pages in the library chill..."'
        },
        {
            slug: 'brothers-keeper',
            title: 'Brother\'s Keeper',
            description: 'A story of loyalty and brotherhood.',
            image: '/assets/images/rap-lyrics-Examples (1).jpg',
            excerpt: '"Street nines, remember that Chevy Malibu shine?<br>On the grind since crip, no lookin\' back, just time<br>From broken glass to stage, the dream ain\'t overpaid"'
        },
        {
            slug: 'delivery-flow',
            title: 'Delivery Flow',
            description: 'A rap about daily grind and hustle.',
            image: '/assets/images/rap-lyrics-Examples (2).jpg',
            excerpt: '"Sunrise hits, I\'m out the door, on the grind, no cap,<br>Sipping coffee, rush hour grind, the streets get hot.<br>Riding scoot, the thermometer up north"'
        },
        {
            slug: 'ghostwriter-no-more',
            title: 'Ghostwriter No More',
            description: 'Breaking free from the shadows.',
            image: '/assets/images/rap-lyrics-Examples (3).jpg',
            excerpt: '"Stuck backstage, the vibe\'s too thick<br>Watchin\' him shine, while I stay sick<br>Got the bars flowin\', yeah, I\'m on the grind"'
        },
        {
            slug: 'our-broken-hit',
            title: 'Our Broken Hit',
            description: 'A story of love and loss.',
            image: '/assets/images/rap-lyrics-Examples (4).jpg',
            excerpt: '"Black ice on the dashboard, shinin\' in the rain<br>Wrote the anthem \'bout the girl who lit my candle flame<br>Honeymoon gone sour, but the chorus stillin\'"'
        },
        {
            slug: 'underdog-anthem',
            title: 'Underdog Anthem',
            description: 'Rising from the bottom.',
            image: '/assets/images/rap-lyrics-Examples (5).jpg',
            excerpt: '"You see that chrome shinein\' bright, cold rainin\' down outside<br>That ain\'t no accident, that\'s all the suds I ever tried<br>Back in the day, yeah, I had rhymes that shook the whole block"'
        }
    ];

    return { props: { examples } };
}

export default function ExamplesPage({ examples }) {
    return (
        <>
            <SEOHead
                title="Rap Lyrics Examples - AI Rap Lyrics Generator"
                description="Explore AI-generated rap lyrics examples with sharp rhymes, storytelling and punchlines. Use them as inspiration for your next track."
                url="/examples"
                image="/assets/images/rap-lyrics-dreams-are-not-out-of-reach.jpg"
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: 'Rap Lyrics Examples - AI Rap Lyrics Generator',
                            description: 'Explore AI-generated rap lyrics examples across themes and styles.',
                            url: '/examples',
                            breadcrumb: {
                                '@type': 'BreadcrumbList',
                                itemListElement: [
                                    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
                                    { '@type': 'ListItem', position: 2, name: 'Examples', item: '/examples' }
                                ]
                            }
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

                {/* Hero Section */}
                <section className="pt-24 sm:pt-32 hero-section relative" style={{ backgroundImage: "url('/assets/images/rap-lyrics-generator4.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="container-max-width mx-auto text-center fade-in relative z-10 px-4 sm:px-6">
                        <h1 className="hero-title text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8">
                            <span className="text-white">Rap Lyrics</span>
                            <br />
                            <span className="gradient-text">Examples</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-3xl text-white mb-8 sm:mb-12 px-4">
                            AI-Generated Rap Lyrics Examples to Inspire Your Creativity
                        </p>
                        <p className="text-base sm:text-lg text-white opacity-90 max-w-3xl mx-auto px-4">
                            Explore our collection of AI-generated rap lyrics examples. Get inspired by unique and creative rap lyrics tailored to different themes and styles, crafted with sharp rhymes, clever wordplay, and profound storytelling.
                        </p>
                    </div>
                </section>

                {/* Examples Section */}
                <section className="py-12 sm:py-16 bg-gray-50">
                    <div className="container-max-width mx-auto px-4 sm:px-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 text-gray-900">Rap Lyrics Examples</h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center mb-12 sm:mb-16 px-4">
                            Explore our collection of AI-generated rap lyrics examples. Get inspired by these unique and creative rap lyrics tailored to different themes and styles.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                            {examples.map((example) => (
                                <Link key={example.slug} href={`/examples/${example.slug}`} className="bg-transparent border border-gray-300 rounded-lg p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold text-purple-600 mb-2">{example.title}</h3>
                                        <div className="mt-3 mb-4">
                                            <Image
                                                src={example.image}
                                                alt={`${example.title} rap lyrics example`}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 object-cover rounded-lg border border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                        <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: example.excerpt }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16 bg-white">
                    <div className="container-max-width mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Ready to Create Your Own Rap Lyrics?</h2>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            Inspired by these rap lyrics examples? Create your own personalized rap lyrics with our AI generator. Simply provide your theme, content requirements, and preferences, and we'll craft unique rap lyrics tailored to your style with sharp rhymes and powerful storytelling.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/#main-feature" className="px-6 sm:px-8 py-4 rounded-lg font-semibold text-white text-base sm:text-lg hover:shadow-lg transition-all duration-300 min-h-[48px] flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #7c3aed, #a78bfa)' }}>
                                Generate Your Rap Lyrics
                            </Link>
                            <Link href="/blog" className="px-6 sm:px-8 py-4 border border-purple-600 text-purple-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 min-h-[48px] flex items-center justify-center">
                                Read Our Blog
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-16 bg-white border-t border-gray-200">
                    <div className="container-max-width mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
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

            <style jsx>{`
                .hero-section {
                    padding: 4rem 1rem 2rem;
                }
                @media (min-width: 640px) {
                    .hero-section {
                        padding: 6rem 2rem 2rem;
                    }
                }
                .container-max-width {
                    max-width: 1200px;
                }
                .gradient-text {
                    background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #7c3aed 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .fade-in {
                    animation: fadeIn 1s ease-in-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}

