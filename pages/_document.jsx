import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                {/* Set charset to UTF-8 to prevent encoding issues - MUST be first */}
                <meta charSet="utf-8" />
                {/* Ensure proper encoding for all content */}
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                {/* Additional encoding protection */}
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                
                {/* Favicon - Multiple formats for better browser support */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
                {/* Fallback to optimized logo if favicon.ico is not available */}
                <link rel="icon" type="image/png" href="/assets/images/logo-32.png" />
                <link rel="apple-touch-icon" href="/assets/images/logo.webp" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/logo-32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/logo-32.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}


