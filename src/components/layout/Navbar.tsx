import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when location changes - using key prop instead of effect
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Career", path: "/career" },
  ];

  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Invade Tech Solutions"
              className="h-10 w-10"
            />
            <span className="text-white font-bold text-xl">
              Invade Tech Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? "text-cyan-500"
                    : "text-gray-300 hover:text-cyan-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`transition-colors ${
                    location.pathname === link.path
                      ? "text-cyan-500"
                      : "text-gray-300 hover:text-cyan-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
