import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Full Navbar */}
      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-black/80 backdrop-blur-md border border-orange-500/20 rounded-full shadow-2xl shadow-orange-500/10 z-50 transition-all duration-700 ease-in-out max-w-[95%] w-auto ${
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

      {/* Mini Logo Navbar */}
      <Link
        to="/"
        onClick={scrollToTop}
        className={`fixed top-6 left-6 z-50 transition-all duration-700 ease-in-out cursor-pointer group ${
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