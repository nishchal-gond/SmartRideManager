import { Link } from 'react-router-dom';
import { Home, Bike } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Bike className="w-24 h-24 text-[#00F0FF] mx-auto mb-6 animate-bounce" />
        <h1 className="text-6xl font-bold text-[#EAF6FF] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#EAF6FF] mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-[#00F0FF] text-[#0B0F14] font-semibold rounded-md hover:bg-[#00d9e6] transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
