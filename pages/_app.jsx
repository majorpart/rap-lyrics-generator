import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Slabo+27px:wght@400&display=swap" rel="stylesheet" />
                <script src="https://cdn.tailwindcss.com" />
                <style dangerouslySetInnerHTML={{__html: `
                    html {
                        font-size: 16px;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    body {
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    * {
                        box-sizing: border-box;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                `}} />
            </Head>
            <Component {...pageProps} />
        </>
    );
}


