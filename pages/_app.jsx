import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
                
                {/* Preconnect to external domains for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                
                {/* Load font with font-display: swap for better performance */}
                <link 
                    href="https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap" 
                    rel="stylesheet"
                    crossOrigin="anonymous"
                />
                
                {/* Inline Tailwind-style utilities - NO CDN to avoid 401ms delay */}
                <style dangerouslySetInnerHTML={{__html: `
                    /* Reset and base styles */
                    *, *::before, *::after {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    
                    html {
                        font-size: 16px;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                        scroll-behavior: smooth;
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    
                    body {
                        font-size: 16px;
                        line-height: 1.6;
                        font-family: 'Slabo 27px', Georgia, 'Times New Roman', serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        text-rendering: optimizeLegibility;
                        color: #111827;
                        background-color: #f7f8fb;
                    }
                    
                    /* Ensure all text is properly rendered */
                    * {
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    
                    /* Image optimization */
                    img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                    }
                    
                    /* Layout utilities */
                    .container-max-width {
                        max-width: 1200px;
                        margin-left: auto;
                        margin-right: auto;
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    /* Gradient text */
                    .gradient-text {
                        background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #7c3aed 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        color: transparent;
                    }
                    
                    /* Responsive utilities */
                    @media (max-width: 640px) {
                        .container-max-width {
                            padding-left: 0.75rem;
                            padding-right: 0.75rem;
                        }
                    }
                    
                    /* Performance optimizations */
                    * {
                        -webkit-tap-highlight-color: transparent;
                    }
                    
                    /* Loading optimization */
                    img[loading="lazy"] {
                        content-visibility: auto;
                    }
                    
                    /* Ensure text visibility and proper rendering */
                    p, h1, h2, h3, h4, h5, h6, span, div, a, button, input, textarea, label {
                        color: inherit;
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    
                    /* Tailwind utility classes - Flexbox */
                    .flex { display: flex; }
                    .inline-flex { display: inline-flex; }
                    .flex-col { flex-direction: column; }
                    .flex-row { flex-direction: row; }
                    .items-center { align-items: center; }
                    .items-start { align-items: flex-start; }
                    .items-end { align-items: flex-end; }
                    .justify-center { justify-content: center; }
                    .justify-between { justify-content: space-between; }
                    .justify-start { justify-content: flex-start; }
                    .justify-end { justify-content: flex-end; }
                    .flex-wrap { flex-wrap: wrap; }
                    .flex-nowrap { flex-wrap: nowrap; }
                    .flex-shrink-0 { flex-shrink: 0; }
                    .flex-1 { flex: 1 1 0%; }
                    
                    /* Grid */
                    .grid { display: grid; }
                    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
                    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                    
                    /* Spacing */
                    .gap-4 { gap: 1rem; }
                    .gap-6 { gap: 1.5rem; }
                    .gap-8 { gap: 2rem; }
                    .space-x-6 > * + * { margin-left: 1.5rem; }
                    .space-x-8 > * + * { margin-left: 2rem; }
                    .space-y-4 > * + * { margin-top: 1rem; }
                    .space-y-6 > * + * { margin-top: 1.5rem; }
                    
                    /* Positioning */
                    .relative { position: relative; }
                    .absolute { position: absolute; }
                    .fixed { position: fixed; }
                    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
                    .top-0 { top: 0; }
                    .right-0 { right: 0; }
                    .bottom-0 { bottom: 0; }
                    .left-0 { left: 0; }
                    .z-10 { z-index: 10; }
                    .z-40 { z-index: 40; }
                    .z-50 { z-index: 50; }
                    
                    /* Display */
                    .block { display: block; }
                    .inline-block { display: inline-block; }
                    .hidden { display: none; }
                    
                    /* Sizing */
                    .w-full { width: 100%; }
                    .w-5 { width: 1.25rem; }
                    .w-6 { width: 1.5rem; }
                    .w-8 { width: 2rem; }
                    .w-12 { width: 3rem; }
                    .w-16 { width: 4rem; }
                    .w-20 { width: 5rem; }
                    .w-24 { width: 6rem; }
                    .h-5 { height: 1.25rem; }
                    .h-6 { height: 1.5rem; }
                    .h-8 { height: 2rem; }
                    .h-12 { height: 3rem; }
                    .h-16 { height: 4rem; }
                    .h-full { height: 100%; }
                    .min-h-screen { min-height: 100vh; }
                    .min-h-[48px] { min-height: 48px; }
                    .min-w-[48px] { min-width: 48px; }
                    .max-w-4xl { max-width: 56rem; }
                    .max-w-7xl { max-width: 80rem; }
                    .mx-auto { margin-left: auto; margin-right: auto; }
                    
                    /* Colors */
                    .bg-white { background-color: #ffffff; }
                    .bg-gray-50 { background-color: #f9fafb; }
                    .bg-gray-100 { background-color: #f3f4f6; }
                    .bg-gray-200 { background-color: #e5e7eb; }
                    .bg-gray-300 { background-color: #d1d5db; }
                    .bg-gray-400 { background-color: #9ca3af; }
                    .bg-black { background-color: #000000; }
                    .bg-purple-600 { background-color: #9333ea; }
                    .bg-purple-100 { background-color: #f3e8ff; }
                    .bg-red-100 { background-color: #fee2e2; }
                    .bg-green-600 { background-color: #16a34a; }
                    .bg-red-600 { background-color: #dc2626; }
                    .bg-opacity-40 { background-color: rgba(0, 0, 0, 0.4); }
                    .bg-opacity-20 { background-color: rgba(255, 255, 255, 0.2); }
                    .text-white { color: #ffffff; }
                    .text-gray-400 { color: #9ca3af; }
                    .text-gray-500 { color: #6b7280; }
                    .text-gray-600 { color: #4b5563; }
                    .text-gray-700 { color: #374151; }
                    .text-gray-900 { color: #111827; }
                    .text-purple-600 { color: #9333ea; }
                    .text-red-500 { color: #ef4444; }
                    .text-red-700 { color: #b91c1c; }
                    .text-purple-800 { color: #6b21a8; }
                    .border { border-width: 1px; }
                    .border-gray-200 { border-color: #e5e7eb; }
                    .border-gray-300 { border-color: #d1d5db; }
                    .border-white { border-color: #ffffff; }
                    .border-red-400 { border-color: #f87171; }
                    .border-2 { border-width: 2px; }
                    
                    /* Typography */
                    .text-xs { font-size: 0.75rem; line-height: 1rem; }
                    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                    .text-base { font-size: 1rem; line-height: 1.5rem; }
                    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
                    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
                    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
                    .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                    .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
                    .text-5xl { font-size: 3rem; line-height: 1; }
                    .font-bold { font-weight: 700; }
                    .font-semibold { font-weight: 600; }
                    .font-medium { font-weight: 500; }
                    .font-normal { font-weight: 400; }
                    .text-center { text-align: center; }
                    .leading-relaxed { line-height: 1.625; }
                    
                    /* Padding */
                    .p-4 { padding: 1rem; }
                    .p-6 { padding: 1.5rem; }
                    .p-8 { padding: 2rem; }
                    .px-4 { padding-left: 1rem; padding-right: 1rem; }
                    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                    .px-12 { padding-left: 3rem; padding-right: 3rem; }
                    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
                    .py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
                    .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
                    .pt-2 { padding-top: 0.5rem; }
                    .pt-32 { padding-top: 8rem; }
                    .pb-4 { padding-bottom: 1rem; }
                    .pb-8 { padding-bottom: 2rem; }
                    
                    /* Margin */
                    .mb-2 { margin-bottom: 0.5rem; }
                    .mb-3 { margin-bottom: 0.75rem; }
                    .mb-4 { margin-bottom: 1rem; }
                    .mb-6 { margin-bottom: 1.5rem; }
                    .mb-8 { margin-bottom: 2rem; }
                    .mb-12 { margin-bottom: 3rem; }
                    .mb-16 { margin-bottom: 4rem; }
                    .mr-3 { margin-right: 0.75rem; }
                    .mr-4 { margin-right: 1rem; }
                    .mt-2 { margin-top: 0.5rem; }
                    .mt-3 { margin-top: 0.75rem; }
                    .mt-8 { margin-top: 2rem; }
                    
                    /* Borders */
                    .rounded { border-radius: 0.25rem; }
                    .rounded-lg { border-radius: 0.5rem; }
                    .rounded-full { border-radius: 9999px; }
                    .rounded-2xl { border-radius: 1rem; }
                    
                    /* Effects */
                    .opacity-80 { opacity: 0.8; }
                    .opacity-90 { opacity: 0.9; }
                    .opacity-60 { opacity: 0.6; }
                    .transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                    .transition-colors { transition-property: color, background-color, border-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                    .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                    .transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                    .duration-300 { transition-duration: 300ms; }
                    .hover\:opacity-80:hover { opacity: 0.8; }
                    .hover\:bg-gray-300:hover { background-color: #d1d5db; }
                    .hover\:text-purple-600:hover { color: #9333ea; }
                    .hover\:border-purple-400:hover { border-color: #c084fc; }
                    .hover\:bg-purple-700:hover { background-color: #7e22ce; }
                    .hover\:bg-gray-100:hover { background-color: #f3f4f6; }
                    .hover\:text-purple-500:hover { color: #a855f7; }
                    .hover\:text-purple-800:hover { color: #6b21a8; }
                    .hover\:scale-105:hover { transform: scale(1.05); }
                    .hover\:transform:hover { transform: translateZ(0); }
                    
                    /* Overflow */
                    .overflow-hidden { overflow: hidden; }
                    .overflow-y-auto { overflow-y: auto; }
                    
                    /* Aspect Ratio */
                    .aspect-video { aspect-ratio: 16 / 9; }
                    .aspect-\[4\/3\] { aspect-ratio: 4 / 3; }
                    
                    /* Object */
                    .object-cover { object-fit: cover; }
                    
                    /* Cursor */
                    .cursor-not-allowed { cursor: not-allowed; }
                    
                    /* Shadows */
                    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
                    .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
                    
                    /* Responsive */
                    @media (min-width: 640px) {
                        .sm\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                        .sm\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
                        .sm\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
                        .sm\:pt-32 { padding-top: 8rem; }
                        .sm\:flex-row { flex-direction: row; }
                    }
                    @media (min-width: 768px) {
                        .md\:flex { display: flex; }
                        .md\:hidden { display: none; }
                        .md\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                        .md\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
                        .md\:text-5xl { font-size: 3rem; line-height: 1; }
                        .md\:text-7xl { font-size: 4.5rem; line-height: 1; }
                        .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                        .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                    }
                    @media (min-width: 1024px) {
                        .lg\:px-8 { padding-left: 2rem; padding-right: 2rem; }
                    }
                `}} />
            </Head>
            <Component {...pageProps} />
        </>
    );
}


