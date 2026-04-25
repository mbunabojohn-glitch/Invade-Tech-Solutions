import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-cyan-500 mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-cyan-600 transition-all duration-300 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 bg-gray-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
