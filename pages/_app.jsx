import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
                <link rel="icon" href="/favicon.ico" />
                
                {/* Preconnect to external domains for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                
                {/* Load font with font-display: swap for better performance */}
                <link 
                    href="https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap" 
                    rel="stylesheet"
                    crossOrigin="anonymous"
                />
                
                {/* Tailwind CSS - Required for all utility classes */}
                <script src="https://cdn.tailwindcss.com" />
                
                {/* Additional CSS utilities */}
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
                `}} />
            </Head>
            <Component {...pageProps} />
        </>
    );
}


