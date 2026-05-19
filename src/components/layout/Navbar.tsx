import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { resolveServiceImage } from "../../lib/image-utils";

/**
 * Navbar Component
 * Provides the main site navigation, including a responsive mobile menu.
 * Highlighting is applied to the active route using current location.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /**
   * Closes the mobile menu when a link is clicked.
   */
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Main navigation configuration
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Tech Buzz", path: "/tech-buzz" },
    { name: "Shop", path: "/shop" },
  ];

  /**
   * Determines if a given path is currently active.
   * Special case for the home path to prevent partial matches.
   */
  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={resolveServiceImage("logo.png", "logo", "logo")}
              alt="Invade Tech Solutions"
              className="h-10 w-10"
            />
            <span className="text-white font-bold text-xl">
              Invade Tech Solutions
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-cyan-500"
                    : "text-gray-300 hover:text-cyan-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? "text-cyan-500"
                      : "text-gray-300 hover:text-cyan-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
