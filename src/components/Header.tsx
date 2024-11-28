import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/images/logo.png" alt="Mix Your Treat Logo" className="h-10 w-10" />
                    <span className="text-xl font-bold text-gray-900">
                        Mix Your Treat
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`text-lg ${location.pathname === '/'
                                ? 'text-green-600 font-semibold'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/generate"
                        className={`text-lg ${location.pathname === '/generate'
                                ? 'text-green-600 font-semibold'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Create Recipe
                    </Link>
                </nav>
            </div>
        </header>
    );
}
