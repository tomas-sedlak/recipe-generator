import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

export default function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-screen-lg mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
                    <img src="/images/logo.png" alt="Mix Your Treat Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                        Mix Your Treat
                    </span>
                </Link>

                {/* Hamburger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="sm:hidden p-2"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden sm:flex items-center gap-x-6">
                    <Link
                        to="/cookies/generate"
                        className={`text-lg ${location.pathname.startsWith('/cookies')
                            ? 'text-purple-600 font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Cookies
                    </Link>
                    <Link
                        to="/muffins/generate"
                        className={`text-lg ${location.pathname.startsWith('/muffins')
                            ? 'text-purple-600 font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Muffins
                    </Link>
                </nav>
            </div>

            {/* Mobile Navigation */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <nav className="flex flex-col bg-white border-b border-gray-100">
                    <Link
                        to="/cookies/generate"
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-4 py-3 text-base ${location.pathname.startsWith('/cookies')
                            ? 'text-purple-600 font-semibold bg-purple-50'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Cookies
                    </Link>
                    <Link
                        to="/muffins/generate"
                        onClick={() => setIsMenuOpen(false)}
                        className={`px-4 py-3 text-base ${location.pathname.startsWith('/muffins')
                            ? 'text-purple-600 font-semibold bg-purple-50'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Muffins
                    </Link>
                </nav>
            </div>
        </header>
    );
}
