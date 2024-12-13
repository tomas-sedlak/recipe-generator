import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        {/* Copyright */}
        <p className="text-center text-gray-600">
          © {currentYear} Mix Your Treat. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 