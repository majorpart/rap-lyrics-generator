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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}


