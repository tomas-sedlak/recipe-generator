import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link to="/cookies/generate" className="text-gray-600 hover:text-gray-900">Generate Cookies</Link>
          <Link to="/muffins/generate" className="text-gray-600 hover:text-gray-900">Generate Muffins</Link>
          <Link to="https://forms.gle/KVzJE9wArKv8twPs6" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">Send Feedback</Link>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-600 pt-6">
          © {currentYear} Mix Your Treat. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 