import Head from 'next/head';
import Image from 'next/image';
import SEOHead from '../components/SEOHead';
import { useState } from 'react';

import { getPostMetas } from '../lib/posts';

export async function getServerSideProps() {
    // Server-side render static, crawlable content
    const hero = {
        title: 'Rap Lyrics Generator - Create Powerful Rap Lyrics with AI',
        description: 'Use our AI rap lyrics generator to create powerful, original rap lyrics in seconds. Perfect for artists and creators. Also supports song lyrics generator workflows.'
    };
    const recentPosts = getPostMetas(5);
    return { props: { hero, recentPosts } };
}

export default function Home({ hero, recentPosts }) {
    const [form, setForm] = useState({ topic: '', contentRequirements: '', rhythmRequirements: '', otherRequirements: '', referenceLyrics: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [lyrics, setLyrics] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async () => {
        if (!form.topic || !form.contentRequirements) {
            setError('Please fill in Topic and Content Requirements.');
            return;
        }
        setIsGenerating(true);
        setError('');
        setLyrics('');
        try {
            const res = await fetch('/api/generate-prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const d = await res.json().catch(() => ({}));
                throw new Error(d.error || `API request failed: ${res.status}`);
            }
            const data = await res.json();
            if (data.success && data.lyrics) setLyrics(data.lyrics);
            else throw new Error(data.error || 'Invalid API response');
        } catch (e) {
            setError(e.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <SEOHead title={hero.title} description={hero.description} url={'/'} />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Rap Lyrics Generator',
                            url: '/',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: '/?q={search_term_string}',
                                'query-input': 'required name=search_term_string'
                            }
                        })
                    }}
                />
            </Head>

            <main className="min-h-screen bg-[var(--primary-bg,#f7f8fb)] text-[var(--text-primary,#111827)] font-[\'Slabo 27px\',serif]">
                <nav className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-sm text-purple-700 flex flex-wrap gap-3 sm:gap-4">
                    <a href="#features" className="hover:underline min-h-[48px] min-w-[48px] flex items-center">Features</a>
                    <a href="#examples" className="hover:underline min-h-[48px] min-w-[48px] flex items-center">Examples</a>
                    <a href="#faq" className="hover:underline min-h-[48px] min-w-[48px] flex items-center">FAQ</a>
                    <a href="#blog" className="hover:underline min-h-[48px] min-w-[48px] flex items-center">Guides</a>
                </nav>
                <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal gradient-text">{hero.title}</h1>
                    <p className="mt-4 text-base sm:text-lg text-gray-700">{hero.description}</p>
                    <div className="mt-6">
                        <Image src={'/assets/images/rap-lyrics-generator2.png'} alt="Rap Lyrics Generator" width={960} height={540} className="rounded border w-full h-auto" />
                    </div>

                    <div className="mt-10 grid gap-6">
                        <label className="grid gap-2">
                            <span className="text-base text-gray-600">Topic*</span>
                            <input name="topic" value={form.topic} onChange={handleChange} className="border rounded px-4 py-3 text-base min-h-[48px]" placeholder="e.g. Success Story, Love and Heartbreak" />
                        </label>
                        <label className="grid gap-2">
                            <span className="text-base text-gray-600">Content Requirements*</span>
                            <textarea name="contentRequirements" value={form.contentRequirements} onChange={handleChange} className="border rounded px-4 py-3 text-base" rows={4} placeholder="Describe the story, tone, and key ideas" />
                        </label>
                        <label className="grid gap-2">
                            <span className="text-base text-gray-600">Rhythm Requirements (optional)</span>
                            <textarea name="rhythmRequirements" value={form.rhythmRequirements} onChange={handleChange} className="border rounded px-4 py-3 text-base" rows={3} placeholder="AABB / ABAB, internal rhymes, 8–12 syllables per line" />
                        </label>
                        <label className="grid gap-2">
                            <span className="text-base text-gray-600">Other Requirements (optional)</span>
                            <textarea name="otherRequirements" value={form.otherRequirements} onChange={handleChange} className="border rounded px-4 py-3 text-base" rows={3} placeholder="Brief storyline, strong punchline, avoid clichés, etc." />
                        </label>
                        <label className="grid gap-2">
                            <span className="text-base text-gray-600">Reference Lyrics (optional)</span>
                            <textarea name="referenceLyrics" value={form.referenceLyrics} onChange={handleChange} className="border rounded px-4 py-3 text-base" rows={3} placeholder="Paste lyrics that capture the vibe you want" />
                        </label>

                        <button onClick={submit} disabled={isGenerating} className="btn-primary text-white px-6 py-4 rounded-md disabled:opacity-60 min-h-[48px] text-base font-medium">
                            {isGenerating ? 'Generating your rap lyrics...' : 'Generate Rap Lyrics'}
                        </button>

                        {error && <div className="text-red-600">{error}</div>}
                        {lyrics && (
                            <div className="mt-6 p-4 bg-white rounded border whitespace-pre-line leading-relaxed text-gray-900">
                                {lyrics}
                            </div>
                        )}
                    </div>

                    <section id="features" className="mt-16 prose max-w-none">
                        <h2 className="text-2xl sm:text-3xl mb-4">What is Our Rap Lyrics Generator?</h2>
                        <p className="text-base sm:text-lg mb-6">AI-powered tool to craft authentic rap lyrics quickly. Choose your topic, describe your story and constraints, and let the model produce a coherent verse with rhythm guidance.</p>
                        <h3 className="text-xl sm:text-2xl mt-8 mb-4">Why it helps SEO</h3>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            <li>Server-side rendered headline and description ensure Google sees content without running JS.</li>
                            <li>Stable URL and crawlable text sections.</li>
                        </ul>
                        <h3 className="text-xl sm:text-2xl mt-8 mb-4">Key Advantages</h3>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            <li>Multi-style prompts to shape tone, flow and narrative.</li>
                            <li>Optional rhythm controls (AABB/ABAB, internal rhymes, syllable guidance).</li>
                            <li>Reference lyrics input to capture a target vibe without copying.</li>
                        </ul>
                        <h3 id="examples" className="text-xl sm:text-2xl mt-8 mb-4">Examples</h3>
                        <p className="text-base sm:text-lg mb-4">Try topics such as: Success Story, Street Life, Love & Heartbreak. Add a short storyline and request a strong punchline in the final bars.</p>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Image src={'/assets/images/rap-lyrics-generator (1).webp'} alt="Example 1" width={360} height={240} className="rounded w-full h-auto" />
                            <Image src={'/assets/images/rap-lyrics-generator (2).webp'} alt="Example 2" width={360} height={240} className="rounded w-full h-auto" />
                            <Image src={'/assets/images/rap-lyrics-generator (3).webp'} alt="Example 3" width={360} height={240} className="rounded w-full h-auto" />
                        </div>
                        <h3 id="faq" className="text-xl sm:text-2xl mt-8 mb-4">FAQ</h3>
                        <p className="text-base mb-4"><strong>Q:</strong> Can I use the generated lyrics commercially? <strong>A:</strong> Yes, review and adapt to match your brand and ensure originality.</p>
                        <p className="text-base mb-4"><strong>Q:</strong> Will my inputs be saved? <strong>A:</strong> Requests are processed for generation; keep sensitive data out of prompts.</p>
                        <h3 id="blog" className="text-xl sm:text-2xl mt-8 mb-4">Latest Guides</h3>
                        <ul className="list-disc pl-6 space-y-2 text-base">
                            {recentPosts.map((p) => (
                                <li key={p.slug}>
                                    <a className="text-purple-700 min-h-[48px] inline-flex items-center" href={`/blog/${p.slug}`}>{p.title || p.slug.replace(/-/g, ' ')}</a>
                                    {p.description && <span className="text-gray-600"> — {p.description}</span>}
                                </li>
                            ))}
                        </ul>
                    </section>
                </section>
            </main>
        </>
    );
}


