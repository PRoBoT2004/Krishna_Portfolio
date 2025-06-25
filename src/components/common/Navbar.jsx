import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Full Navbar */}
      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-black/80 backdrop-blur-md border border-orange-500/20 rounded-full shadow-2xl shadow-orange-500/10 z-50 transition-all duration-700 ease-in-out max-w-[95%] w-auto hidden md:block ${
          isShrunk ? "opacity-0 -translate-y-5 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <nav className="flex items-center justify-between space-x-12">
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-2xl font-bold text-orange-500 transition-all duration-300 cursor-pointer hover:text-orange-400 hover:scale-105"
          >
            Krishna
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-all duration-300 text-md hover:text-orange-400 hover:scale-105 relative group ${
                location.pathname === '/' ? 'text-orange-400' : 'text-gray-300'
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <Link
              to="/works"
              className={`font-medium transition-all duration-300 text-md hover:text-orange-400 hover:scale-105 relative group ${
                location.pathname === '/works' ? 'text-orange-400' : 'text-gray-300'
              }`}
            >
              Works
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                location.pathname === '/works' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <Link
              to="/contact"
              className={`px-6 py-2 font-medium text-black bg-orange-500 rounded-full transition-all duration-300 hover:bg-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 ${
                location.pathname === '/contact' ? 'bg-orange-600' : ''
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Logo - Floating */}
      <Link
        to="/"
        onClick={scrollToTop}
        className="fixed z-50 transition-all duration-300 cursor-pointer top-4 left-4 hover:scale-105 md:hidden"
      >
        <span className="text-xl font-bold text-orange-500 transition-colors duration-300 hover:text-orange-400">
          Krishna
        </span>
      </Link>

      {/* Mobile Hamburger Button - Floating */}
      <button
        onClick={toggleMobileMenu}
        className="fixed z-50 w-10 h-10 text-gray-300 transition-all duration-300 top-4 right-4 hover:text-orange-400 hover:scale-105 focus:outline-none md:hidden"
        aria-label="Toggle mobile menu"
      >
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <span
            className={`absolute h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
              isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`absolute h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
              isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Menu Dropdown - Only appears when opened */}
      <div
        className={`fixed top-16 right-4 z-40 md:hidden transition-all duration-300 ease-in-out transform-gpu ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="w-64 p-4 border shadow-2xl bg-black/90 backdrop-blur-md border-orange-500/20 rounded-2xl shadow-orange-500/10">
          <nav className="space-y-3">
            <Link
              to="/"
              onClick={scrollToTop}
              className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-400 hover:scale-105 ${
                location.pathname === '/' ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/works"
              className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-orange-500/10 hover:text-orange-400 hover:scale-105 ${
                location.pathname === '/works' ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300'
              }`}
            >
              Works
            </Link>
            
            <Link
              to="/contact"
              className={`block py-3 px-4 mt-2 font-medium text-center text-black bg-orange-500 rounded-xl transition-all duration-300 hover:bg-orange-600 hover:scale-105 ${
                location.pathname === '/contact' ? 'bg-orange-600' : ''
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Desktop Mini Logo - Only for Desktop */}
      <Link
        to="/"
        onClick={scrollToTop}
        className={`fixed top-6 left-6 z-50 transition-all duration-700 ease-in-out cursor-pointer group hidden md:block ${
          isShrunk ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
        }`}
      >
        {/* Glow effect behind mini logo */}
        <div className="absolute transition-opacity duration-300 rounded-full opacity-0 -inset-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 blur-lg group-hover:opacity-100 -z-10"></div>
        
        {/* Mini logo container */}
        <div className="relative px-4 py-2 border rounded-full shadow-lg bg-black/80 backdrop-blur-md border-orange-500/30 shadow-orange-500/20">
          <span className="text-2xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-orange-400">
            K
          </span>
        </div>
      </Link>
    </>
  );
};

export default Navbar;