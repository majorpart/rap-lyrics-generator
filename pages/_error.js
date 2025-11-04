import Link from 'next/link';
import Head from 'next/head';

function Error({ statusCode }) {
    return (
        <>
            <Head>
                <title>Error {statusCode || 'Unknown'}</title>
            </Head>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: '#f9fafb'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#7c3aed', fontWeight: 'bold' }}>
                    {statusCode || 'Error'}
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
                    {statusCode === 404 
                        ? 'This page could not be found.' 
                        : statusCode === 500
                        ? 'An internal server error occurred.'
                        : 'Something went wrong. Please try again later.'}
                </p>
                <Link 
                    href="/"
                    style={{ 
                        marginTop: '1rem', 
                        padding: '0.75rem 1.5rem', 
                        backgroundColor: '#7c3aed', 
                        color: 'white', 
                        textDecoration: 'none',
                        borderRadius: '0.5rem',
                        display: 'inline-block',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Go back home
                </Link>
            </div>
        </>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;

