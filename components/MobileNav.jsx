import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden absolute right-0 text-gray-700 hover:text-purple-600 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden pb-4 absolute top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-lg">
                    <div className="flex flex-col space-y-1 px-4">
                        <Link 
                            href="/" 
                            className="text-gray-700 hover:text-purple-600 transition-colors py-3 min-h-[48px] flex items-center text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            Rap Lyrics
                        </Link>
                        <Link 
                            href="/examples" 
                            className="text-gray-700 hover:text-purple-600 transition-colors py-3 min-h-[48px] flex items-center text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            Examples
                        </Link>
                        <Link 
                            href="/blog" 
                            className="text-gray-700 hover:text-purple-600 transition-colors py-3 min-h-[48px] flex items-center text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

