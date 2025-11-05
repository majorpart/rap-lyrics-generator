import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import MobileNav from '../components/MobileNav';
import { useState, useEffect } from 'react';

export async function getServerSideProps() {
    try {
        const { getPostMetas } = await import('../lib/posts');
        const hero = {
            title: 'Rap Lyrics Generator - Create Powerful Rap Lyrics with AI',
            description: 'Use our AI rap lyrics generator to create powerful, original rap lyrics in seconds. Perfect for artists and creators. Also supports song lyrics generator workflows.'
        };
        const recentPosts = getPostMetas ? getPostMetas(5) : [];
        return { props: { hero, recentPosts: recentPosts || [] } };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                hero: {
                    title: 'Rap Lyrics Generator - Create Powerful Rap Lyrics with AI',
                    description: 'Use our AI rap lyrics generator to create powerful, original rap lyrics in seconds. Perfect for artists and creators. Also supports song lyrics generator workflows.'
                },
                recentPosts: []
            }
        };
    }
}

export default function Home({ hero, recentPosts }) {
    const [form, setForm] = useState({ 
        topic: '', 
        contentRequirements: '', 
        rhythmRequirements: '', 
        otherRequirements: '', 
        referenceLyrics: '' 
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [lyrics, setLyrics] = useState('');
    const [error, setError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [openFAQ, setOpenFAQ] = useState(null);
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    useEffect(() => {
        // Form validation
        const valid = form.topic.trim() && form.contentRequirements.trim();
        setIsFormValid(valid);
    }, [form]);

    useEffect(() => {
        // Generate testimonials with original data
        const testimonials = [
            {
                text: "I dropped my Topic and vibes, and the AI delivered clean, hard-hitting rap lyrics in seconds. Flow was on point — just needed minor tweaks to fit my beat.",
                name: "Nova & Crew",
                role: "Independent Artist",
                avatar: "/assets/images/rap-lyrics-generator (1).webp"
            },
            {
                text: "The rhythm controls are clutch. Setting AABB + 8–12 syllables gave me consistent cadence across verses. Perfect starting point for my track hook.",
                name: "Jules",
                role: "Producer / Writer",
                avatar: "/assets/images/rap-lyrics-generator (2).webp"
            },
            {
                text: "I added a short storyline and asked for a strong punchline — the generator built a coherent narrative with memorable closing bars. Highly recommend.",
                name: "Kira",
                role: "Hip-hop Vocalist",
                avatar: "/assets/images/rap-lyrics-generator (3).webp"
            },
            {
                text: "As a non-native writer, this helped me avoid clichés and still keep the slang natural. Great tool for authentic \"rap lyrics\" without sounding generic.",
                name: "Leo",
                role: "Songwriter",
                avatar: "/assets/images/rap-lyrics-generator (4).webp"
            },
            {
                text: "I used reference lyrics from a classic track — the AI caught the vibe without copying. It felt like my style, just faster.",
                name: "Taylor",
                role: "Recording Artist",
                avatar: "/assets/images/rap-lyrics-generator (5).webp"
            },
            {
                text: "We write for multiple genres. This doubles as a solid song lyrics generator when we switch out of rap. Versatile and reliable.",
                name: "María & Carlos",
                role: "Writing Duo",
                avatar: "/assets/images/rap-lyrics-generator (6).webp"
            },
            {
                text: "Internal rhymes + multisyllabic suggestions elevated my verse quality. The punchlines landed — my audience noticed the upgrade.",
                name: "LISAN",
                role: "Battle Rap Enthusiast",
                avatar: "/assets/images/rap-lyrics-generator (7).webp"
            },
            {
                text: "Deadlines are tight; this saves hours. I generate, personalize lines with my references, and the track is ready to record.",
                name: "Rae & Mark",
                role: "Studio Team",
                avatar: "/assets/images/rap-lyrics-generator (8).webp"
            },
            {
                text: "Great for ideation. When I'm stuck, I feed it the topic and tone — it returns angles I wouldn't have thought of.",
                name: "Ami",
                role: "Lyricist",
                avatar: "/assets/images/rap-lyrics-generator (9).webp"
            }
        ];

        // Duplicate testimonials multiple times for seamless scrolling
        const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

        const createTestimonialCard = (testimonial) => `
            <div class="testimonial-card rounded-2xl p-6 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-300" style="background: #f3e8ff; border: 1px solid #e9d5ff;">
                <p class="text-gray-800 mb-6 leading-relaxed text-base">${testimonial.text}</p>
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="text-gray-900 font-semibold text-base">${testimonial.name}</h4>
                        <p class="text-gray-700 text-sm">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;

        const columns = [
            document.getElementById('testimonialsColumn1'),
            document.getElementById('testimonialsColumn2'),
            document.getElementById('testimonialsColumn3')
        ];

        if (columns[0] && columns[1] && columns[2]) {
            // Distribute testimonials to columns (every 3rd item goes to each column)
            const column1Testimonials = allTestimonials.filter((_, index) => index % 3 === 0);
            const column2Testimonials = allTestimonials.filter((_, index) => index % 3 === 1);
            const column3Testimonials = allTestimonials.filter((_, index) => index % 3 === 2);
            
            columns[0].innerHTML = column1Testimonials.map(createTestimonialCard).join('');
            columns[1].innerHTML = column2Testimonials.map(createTestimonialCard).join('');
            columns[2].innerHTML = column3Testimonials.map(createTestimonialCard).join('');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async () => {
        if (!isFormValid) {
            setError('Please fill in Topic and Content Requirements.');
            return;
        }
        setIsGenerating(true);
        setError('');
        setLyrics('');
        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
            
            const res = await fetch('/api/generate-prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
                signal: controller.signal
            }).catch((fetchError) => {
                clearTimeout(timeoutId);
                if (fetchError.name === 'AbortError') {
                    throw new Error('Request timeout. Please try again.');
                }
                throw new Error('Network error. Please check your connection and try again.');
            });
            
            clearTimeout(timeoutId);
            
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.error || `API request failed: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            if (data.success && data.lyrics) {
                setLyrics(data.lyrics);
            } else {
                throw new Error(data.error || 'Invalid API response. Please try again.');
            }
        } catch (e) {
            console.error('Error generating lyrics:', e);
            const errorMessage = e.message || 'Failed to generate lyrics. Please try again.';
            setError(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        if (lyrics) {
            navigator.clipboard.writeText(lyrics);
            setShowCopySuccess(true);
            setTimeout(() => setShowCopySuccess(false), 2000);
        }
    };

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <>
            <SEOHead title={hero.title} description={hero.description} url={'/'} />
            <Head>
                {/* Preload critical hero background image */}
                <link rel="preload" as="image" href="/assets/images/rap-lyrics-generator2.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'Rap Lyrics Generator',
                            description: 'Use our AI rap lyrics generator to create powerful, original rap lyrics. Also supports song lyrics generator workflows.',
                            url: '/',
                            applicationCategory: 'MusicApplication',
                            operatingSystem: 'Web Browser',
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'USD'
                            },
                            creator: {
                                '@type': 'Organization',
                                name: 'Rap Lyrics Generator Team'
                            },
                            featureList: [
                                'AI-Powered Rap Lyrics',
                                'Rhythm & Rhyme Controls',
                                'Style Customization',
                                'Storytelling & Punchlines',
                                'Reference Lyrics Support'
                            ],
                            screenshot: '/assets/images/rap-lyrics-generator2.png'
                        })
                    }}
                />
            </Head>

            <main className="min-h-screen bg-[var(--primary-bg,#f7f8fb)] text-[var(--text-primary,#111827)]" style={{ fontFamily: "'Slabo 27px', serif" }}>
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
                                <Link href="/" className="nav-link text-purple-600 transition-colors min-h-[48px] flex items-center">Rap Lyrics</Link>
                                <Link href="/examples" className="nav-link text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Examples</Link>
                                <Link href="/blog" className="nav-link text-gray-700 hover:text-purple-600 transition-colors min-h-[48px] flex items-center">Blog</Link>
                            </div>
                            <MobileNav />
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 hero-section relative" style={{ 
                    backgroundImage: "url('/assets/images/rap-lyrics-generator2.png')", 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                    willChange: 'auto',
                    contentVisibility: 'auto'
                }}>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0">
                        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white border-opacity-20 rounded-full"></div>
                        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white border-opacity-20 rounded-full"></div>
                        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white border-opacity-20 rounded-full"></div>
                        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white border-opacity-20 rounded-full"></div>
                    </div>
                    <div className="container-max-width mx-auto text-center fade-in relative z-10 px-4">
                        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-8">
                            <span className="text-white">Rap Lyrics</span>
                            <br />
                            <span className="gradient-text">Generator</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white mb-12">
                            Create Powerful Rap Lyrics with AI
                        </p>
                        <p className="text-lg text-white opacity-90 max-w-2xl mx-auto">
                            Use our AI rap lyrics generator to craft authentic, impactful lines and flows. Great for artists, writers, and anyone creating song lyrics.
                        </p>
                    </div>
                </section>

                {/* Main Feature Section */}
                <section id="main-feature" className="feature-section bg-gray-50 py-16">
                    <div className="container-max-width mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Create Your Perfect Rap Lyrics with AI</h2>
                        
                        {/* Rap Lyrics Form */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-white border border-gray-200 rounded-lg p-8">
                                <form id="rapLyricsForm" className="space-y-6">
                                    <div>
                                        <label htmlFor="topic" className="block text-lg font-medium text-gray-900 mb-2">
                                            Topic <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            id="topic" 
                                            name="topic" 
                                            value={form.topic}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600 min-h-[48px]" 
                                            placeholder="e.g., Success Story, Love and Heartbreak, Street Life" 
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contentRequirements" className="block text-lg font-medium text-gray-900 mb-2">
                                            Content Requirements <span className="text-red-500">*</span>
                                        </label>
                                        <textarea 
                                            id="contentRequirements" 
                                            name="contentRequirements" 
                                            rows={4}
                                            value={form.contentRequirements}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600"
                                            placeholder="Describe the emotions, story, or message you want the lyrics to express..." 
                                            required
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="rhythmRequirements" className="block text-lg font-medium text-gray-900 mb-2">
                                            Rhythm Requirements <span className="text-sm text-gray-500 font-normal">(Optional)</span>
                                        </label>
                                        <textarea 
                                            id="rhythmRequirements" 
                                            name="rhythmRequirements" 
                                            rows={5}
                                            value={form.rhythmRequirements}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600"
                                            placeholder="- Use a rhyming structure of AABB or ABAB.
- Try to use internal rhymes and polysyllabic rhymes as much as possible.
- Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.

Leave empty to use default rhythm requirements."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="otherRequirements" className="block text-lg font-medium text-gray-900 mb-2">
                                            Other Requirements <span className="text-sm text-gray-500 font-normal">(Optional)</span>
                                        </label>
                                        <textarea 
                                            id="otherRequirements" 
                                            name="otherRequirements" 
                                            rows={6}
                                            value={form.otherRequirements}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600"
                                            placeholder="- The lyrics must contain a brief storyline.
- There must be a powerful &quot;punchline&quot; in the last four lines to serve as the conclusion.
- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
- Avoid using clichés and strive for originality and impact.

Leave empty to use default requirements."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label htmlFor="referenceLyrics" className="block text-lg font-medium text-gray-900 mb-2">
                                            Reference Lyrics <span className="text-sm text-gray-500 font-normal">(Optional)</span>
                                        </label>
                                        <textarea 
                                            id="referenceLyrics" 
                                            name="referenceLyrics" 
                                            rows={5}
                                            value={form.referenceLyrics}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-600"
                                            placeholder="Paste lyrics you like as a style reference to help AI understand your preferred style..."
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="text-center mb-8">
                            <button 
                                onClick={submit} 
                                disabled={!isFormValid || isGenerating}
                                className="btn-primary px-12 py-5 rounded-lg font-semibold text-white text-xl disabled:cursor-not-allowed transition-colors duration-300 relative overflow-hidden min-h-[48px]"
                                style={{
                                    background: isFormValid && !isGenerating 
                                        ? 'linear-gradient(45deg, #7c3aed, #a78bfa)' 
                                        : '#4a4a4a',
                                    opacity: isFormValid && !isGenerating ? 1 : 0.6
                                }}
                            >
                                {isGenerating ? 'Generating Rap Lyrics...' : 'Generate Rap Lyrics'}
                            </button>
                            <p className="text-xs text-gray-400 mt-3 max-w-md mx-auto leading-relaxed">
                                *Our AI creates personalized, unique rap lyrics tailored to your theme and style. Please allow a moment for generation.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="max-w-4xl mx-auto mb-6">
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            </div>
                        )}

                        {/* Rap Lyrics Display */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Your Rap Lyrics</h3>
                                    {lyrics && (
                                        <button 
                                            onClick={copyToClipboard}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors min-h-[48px] flex items-center"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="min-h-[200px] max-h-[800px] overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    {lyrics ? (
                                        <pre className="whitespace-pre-wrap text-gray-900 leading-relaxed">{lyrics}</pre>
                                    ) : (
                                        <p className="text-gray-400">Your personalized rap lyrics will appear here</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-16 bg-white">
                    <div className="container-max-width mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What is Our Rap Lyrics Generator?</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Our AI rap lyrics generator helps you create authentic, powerful <strong>rap lyrics</strong> fast. Enter your topic and content requirements, and optionally add rhythm rules, other requirements, and reference lyrics. Instantly generate high-quality bars ready for your track.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Built for artists, writers, and producers, it supports multiple styles, storytelling with punchlines, and polysyllabic rhymes. It also works great as a flexible <strong>song lyrics generator</strong> for non-rap projects.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-transparent border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Rap Lyrics</h3>
                                    <p className="text-gray-600">Generate unique <strong>rap lyrics</strong> with controlled rhyme schemes, flow, and punchlines.</p>
                                </div>
                                <div className="bg-transparent border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rhythm & Rhyme Controls</h3>
                                    <p className="text-gray-600">Specify AABB/ABAB, internal rhymes, and 8–12 syllables per line for tight flow.</p>
                                </div>
                                <div className="bg-transparent border border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Song Lyrics Generator</h3>
                                    <p className="text-gray-600">Also works as a flexible <strong>song lyrics generator</strong> beyond rap genres.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Examples Section */}
                <section id="examples" className="py-16 bg-gray-50">
                    <div className="container-max-width mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">Rap Lyrics Examples</h2>
                        <p className="text-xl md:text-2xl text-gray-600 text-center mb-16 leading-relaxed">
                            Explore AI-generated <strong>rap lyrics</strong> with sharp rhymes, storytelling, and strong punchlines. Use them as inspiration for your next track. Also great as a <strong>song lyrics generator</strong> starting point.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Longing for Home */}
                            <Link href="/examples/longing-for-home" className="block bg-transparent border border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Longing for Home</h3>
                                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                        <Image src="/assets/images/rap-lyrics-longing-for -home.jpg" alt="Longing for Home rap lyrics example" width={600} height={338} className="w-full h-full object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" />
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: '"Yo, middle-aged now, still chasing the dream,<br>But the hustle and bustle, it\'s wearin\' on the team.<br>I was on the grind, thought I\'d make it big..."' }} />
                                </div>
                            </Link>

                            {/* Dreams are not out of reach */}
                            <Link href="/examples/dreams-are-not-out-of-reach" className="block bg-transparent border border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Dreams are not out of reach</h3>
                                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                        <Image src="/assets/images/rap-lyrics-dreams-are-not-out-of-reach.jpg" alt="Dreams are not out of reach rap lyrics example" width={600} height={338} className="w-full h-full object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" />
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: '"Yo, remember that little girl, playing \'round the block?<br>Head full of rhymes, feet tapping, that\'s the clock..."' }} />
                                </div>
                            </Link>

                            {/* Protecting One's Homeland in War */}
                            <Link href="/examples/protecting-homeland-in-war" className="block bg-transparent border border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-2">Protecting One&apos;s Homeland in War</h3>
                                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                        <Image src="/assets/images/rap-lyrics-homeland-in-war.jpg" alt="Protecting One's Homeland in War rap lyrics example" width={600} height={338} className="w-full h-full object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" />
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: '"Yo, walk the streets of Gaza, feel the weight on my chest,<br>Concrete dreams crumbling, peace just a distant guest..."' }} />
                                </div>
                            </Link>

                            {/* The boy confessed his feelings to the girl */}
                            <Link href="/examples/the-boy-confessed-his-feelings-to-the-girl" className="block bg-transparent border border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-2">The boy confessed his feelings to the girl</h3>
                                    <div className="mt-3 mb-4 rounded-lg overflow-hidden border border-gray-200" style={{ aspectRatio: '16/9' }}>
                                        <Image src="/assets/images/rap-lyrics-boy-confessed-his-feelings-to-the-girl.jpg" alt="The boy confessed his feelings to the girl rap lyrics example" width={600} height={338} className="w-full h-full object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" />
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                    <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: '"Yo, the moment I saw her, time just stood still,<br>She was flipping pages in the library chill..."' }} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section id="how-to-use" className="py-16 bg-white">
                    <div className="container-max-width mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">How to Use Our Rap Lyrics Generator</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="text-center">
                                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
                                    <Image src="/assets/images/rap-lyrics-generator1.jpg" alt="How to use our rap lyrics generator" width={600} height={450} className="w-full h-full object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k=" />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                                    <p className="text-gray-700 pt-2 text-lg leading-relaxed">Enter <strong>Topic</strong> and <strong>Content Requirements</strong> to define your theme and story.</p>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                                    <p className="text-gray-700 pt-2 text-lg leading-relaxed">Optionally add <strong>Rhythm Requirements</strong> (AABB/ABAB, internal rhymes, 8–12 syllables).</p>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                                    <p className="text-gray-700 pt-2 text-lg leading-relaxed">Add <strong>Other Requirements</strong> (storyline, punchline, slang, originality) or leave default.</p>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
                                    <p className="text-gray-700 pt-2 text-lg leading-relaxed">Optionally paste <strong>Reference Lyrics</strong> to guide style, then click &quot;Generate Rap Lyrics&quot;.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-16 bg-gray-50">
                    <div className="container-max-width mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">What Artists Say About Our Rap Lyrics Generator</h2>
                        <p className="text-xl md:text-2xl text-gray-700 text-center mb-16 leading-relaxed">
                            See how creators use our <strong>rap lyrics generator</strong> to craft authentic bars, refine flow, and speed up writing — also great as a <strong>song lyrics generator</strong>.
                        </p>
                        
                        <div className="overflow-hidden h-[500px] relative">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div id="testimonialsColumn1" className="testimonials-column testimonials-column-1">
                                    {/* Column 1 testimonials - populated by useEffect */}
                                </div>
                                <div id="testimonialsColumn2" className="testimonials-column testimonials-column-2">
                                    {/* Column 2 testimonials - populated by useEffect */}
                                </div>
                                <div id="testimonialsColumn3" className="testimonials-column testimonials-column-3">
                                    {/* Column 3 testimonials - populated by useEffect */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="assistance" className="py-16 bg-white">
                    <div className="container-max-width mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">Frequently asked questions</h2>
                        <p className="text-xl md:text-2xl text-gray-600 text-center mb-16 leading-relaxed">
                            Answers about our <strong>rap lyrics generator</strong> and how it helps you write better <strong>rap lyrics</strong>.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                {
                                    q: 'What is the AI Rap Lyrics Generator?',
                                    a: 'The AI Rap Lyrics Generator is a tool that helps you create authentic <strong>rap lyrics</strong> fast. Provide Topic and Content Requirements, optionally add Rhythm Requirements, Other Requirements, and Reference Lyrics — the AI generates bars with coherent flow and punchlines.'
                                },
                                {
                                    q: 'How does the AI generate rap lyrics?',
                                    a: 'You provide Topic and Content Requirements, rhythm and other preferences, and optionally reference lyrics. Our model structures verses, rhyme schemes, and storytelling to produce original <strong>rap lyrics</strong>.'
                                },
                                {
                                    q: 'Is the AI Rap Lyrics Generator free to use?',
                                    a: 'Yes, the basic generation is free. You can generate <strong>rap lyrics</strong> as many times as needed without hidden fees.'
                                },
                                {
                                    q: 'What details should I provide for better lyrics?',
                                    a: 'Include Topic, Content Requirements, desired rhyme scheme (AABB/ABAB), syllable range (8–12/line), internal rhymes, storyline, punchline, slang, and any reference lyrics. More detail = better <strong>rap lyrics</strong>.'
                                },
                                {
                                    q: 'Can I customize style and rhythm?',
                                    a: 'Absolutely. Control rhyme scheme, internal rhymes, and syllable counts, and specify tone or sub-genre. It also works as a versatile <strong>song lyrics generator</strong>.'
                                },
                                {
                                    q: 'Are my inputs saved?',
                                    a: 'We prioritize privacy. Your inputs are only used to generate lyrics and are not stored or shared.'
                                },
                                {
                                    q: 'Can I edit the generated lyrics?',
                                    a: 'Yes. Treat them as a starting point — personalize lines, refine flow, and ensure they match your voice and track.'
                                },
                                {
                                    q: 'What if I\'m not happy with the result?',
                                    a: 'Regenerate with more specific inputs: tighten rhythm requirements, add concrete story details, or provide reference lyrics to guide the style.'
                                }
                            ].map((faq, index) => (
                                <div key={index} className="bg-transparent border border-gray-200 rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => toggleFAQ(index)}
                                        className="faq-question w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900">{faq.q}</h3>
                                        <svg 
                                            className={`faq-icon w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <div className={`faq-answer px-6 pb-4 ${openFAQ === index ? '' : 'hidden'}`}>
                                        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a }} />
                                    </div>
                                </div>
                            ))}
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

                {/* Success Toast */}
                {showCopySuccess && (
                    <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                        Copy successful!
                    </div>
                )}

                {/* Error Toast */}
                {error && (
                    <div className="fixed top-20 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                        <span>{error}</span>
                    </div>
                )}
            </main>
            
            <style jsx global>{`
                .container-max-width {
                    max-width: 1200px;
                }
                .hero-section {
                    padding: 6rem 2rem 2rem;
                }
                .feature-section {
                    padding: 2rem 2rem 2rem;
                }
                .inspiration-section {
                    padding: 4rem 2rem;
                }
                .tutorials-section {
                    padding: 4rem 2rem;
                }
                .evaluation-section {
                    padding: 4rem 2rem;
                }
                .faq-section {
                    padding: 4rem 2rem;
                }
                .footer-section {
                    padding: 4rem 2rem 2rem;
                }
                .hero-title {
                    font-size: 2.5rem;
                    line-height: 1.2;
                    font-weight: 400;
                    letter-spacing: 0.01em;
                }
                @media (min-width: 768px) {
                    .hero-title {
                        font-size: 4.5rem;
                    }
                }
                @media (min-width: 1024px) {
                    .hero-title {
                        font-size: 5rem;
                    }
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .testimonials-column {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .testimonials-column-1 {
                    animation: scrollUp1 35s linear infinite;
                }
                .testimonials-column-2 {
                    animation: scrollUp2 45s linear infinite;
                }
                .testimonials-column-3 {
                    animation: scrollUp3 40s linear infinite;
                }
                .testimonials-column:hover {
                    animation-play-state: paused;
                }
                .testimonial-card {
                    background: #f3e8ff;
                    border: 1px solid #e9d5ff;
                    transition: all 0.3s ease;
                }
                .testimonial-card:hover {
                    background: #7c3aed;
                    border-color: #7c3aed;
                }
                .testimonial-card:hover p,
                .testimonial-card:hover h4,
                .testimonial-card:hover span {
                    color: #ffffff !important;
                }
                @keyframes scrollUp1 {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes scrollUp2 {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes scrollUp3 {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @media (max-width: 768px) {
                    .hero-section {
                        padding: 4rem 1rem 1.5rem;
                    }
                    .feature-section {
                        padding: 1.5rem 1rem 1.5rem;
                    }
                    .inspiration-section,
                    .tutorials-section,
                    .evaluation-section,
                    .faq-section {
                        padding: 3rem 1rem;
                    }
                    .testimonials-scroll-container {
                        height: 28rem;
                    }
                    .testimonials-column-1 {
                        animation-duration: 25s;
                    }
                    .testimonials-column-2 {
                        animation-duration: 35s;
                    }
                    .testimonials-column-3 {
                        animation-duration: 30s;
                    }
                }
            `}</style>
        </>
    );
}