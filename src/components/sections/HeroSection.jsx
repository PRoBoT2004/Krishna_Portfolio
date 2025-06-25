import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InteractiveBackground from '../common/InteractiveBackground';

const images = ["./assets/Body.png", "/assets/cph.png", "/assets/bl.png"];

const HeroSection = () => {
  const boxRef = useRef(null);
  const mobileBoxRef = useRef(null); // Separate ref for mobile
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = (event) => {
      if (isHovered && boxRef.current) {
        event.preventDefault();
        event.stopPropagation();
        boxRef.current.scrollTop += event.deltaY * 0.3;
      }
    };

    if (isHovered) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isHovered]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      // Reset scroll to top for both desktop and mobile
      if (boxRef.current) {
        boxRef.current.scrollTop = 0;
      }
      if (mobileBoxRef.current) {
        mobileBoxRef.current.scrollTop = 0;
      }
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      // Reset scroll to top for both desktop and mobile
      if (boxRef.current) {
        boxRef.current.scrollTop = 0;
      }
      if (mobileBoxRef.current) {
        mobileBoxRef.current.scrollTop = 0;
      }
      return newIndex;
    });
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
    // Reset scroll to top for both desktop and mobile
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
    if (mobileBoxRef.current) {
      mobileBoxRef.current.scrollTop = 0;
    }
  };

  return (
    <section id="hero" className="relative flex flex-col w-screen h-screen overflow-hidden sm:flex-row">
      <InteractiveBackground />
      
      {/* Left Content */}
      <div className="relative z-10 flex flex-col justify-center w-full h-full px-6 text-white sm:w-1/2 sm:px-16">
        <h1 className="mb-2 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          I am <span className="text-orange-500 drop-shadow-2xl">Krishna</span>,
        </h1>
        <h2 className="mb-2 text-2xl font-semibold text-orange-400 sm:text-3xl md:text-4xl">
          UI/UX Designer
        </h2>
        <h2 className="mb-6 text-2xl font-semibold text-orange-300 sm:text-3xl md:text-4xl">
          & Frontend Developer
        </h2>
        <p className="mb-8 text-lg font-medium leading-relaxed text-gray-300 md:text-xl">
          Designing Experiences, Not Just Screens
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/works")}
            className="px-6 py-3 text-lg font-semibold transition-all duration-300 transform bg-orange-500 rounded-lg shadow-lg hover:scale-105 hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/30"
          >
            View My Work
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 text-lg font-semibold text-orange-400 transition-all duration-300 transform bg-transparent border-2 border-orange-400 rounded-lg shadow-md hover:scale-105 hover:bg-orange-400 hover:text-black backdrop-blur-sm"
          >
            Contact Me
          </button>
        </div>

        {/* Sneak Peek Button for Mobile Only */}
        <div className="mt-6 sm:hidden">
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 px-5 py-3 text-lg font-medium text-white transition duration-300 border-2 border-orange-400 rounded-md hover:bg-orange-400 hover:text-black backdrop-blur-sm"
          >
            <span>👀</span>
            <span>Sneak Peek</span>
          </button>
        </div>
      </div>

      {/* Right Side - Scrollable Image Box (Desktop Only) */}
      <div
        ref={boxRef}
        className="absolute right-0 hidden w-1/2 h-full overflow-y-scroll border-l-2 border-orange-500/30 scrollbar-hide sm:block backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <img
          src={images[currentIndex]}
          alt="Scrollable UI Preview"
          loading="lazy"
          className="w-full h-auto transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Navigation Buttons (Desktop Only) */}
      <button
        onClick={prevImage}
        className="hidden sm:flex absolute right-[44%] top-1/2 transform -translate-y-1/2 bg-orange-500/20 backdrop-blur-md border border-orange-400/30 px-4 py-4 rounded-full text-orange-300 hover:bg-orange-500/40 hover:text-white transition-all duration-300 shadow-lg hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextImage}
        className="absolute hidden px-4 py-4 text-orange-300 transition-all duration-300 transform -translate-y-1/2 border rounded-full shadow-lg sm:flex bg-orange-500/20 backdrop-blur-md border-orange-400/30 right-6 top-1/2 hover:bg-orange-500/40 hover:text-white hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Navigation (Desktop Only) */}
      <div className="hidden sm:flex absolute gap-3 bottom-8 right-[25%] transform translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-orange-500 scale-125 shadow-lg shadow-orange-500/50"
                : "bg-gray-500 hover:bg-orange-400 hover:scale-110"
            }`}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>

      {/* Mobile Popup for Sneak Peek */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-[95vw] max-w-md h-[90vh] flex flex-col items-center justify-center rounded-2xl border border-orange-500/30 bg-black/90 backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Scrollable Image Inside Fixed Container */}
            <div
              ref={mobileBoxRef}
              className="w-full h-full overflow-y-scroll scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <img 
                src={images[currentIndex]} 
                alt="Mobile UI Preview" 
                className="object-contain w-full h-auto" 
                loading="lazy" 
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute z-10 flex items-center justify-center w-10 h-10 text-lg font-bold text-black transition-colors duration-200 bg-orange-400 rounded-full shadow-lg top-4 right-4 hover:bg-orange-500"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute z-10 flex items-center justify-center w-12 h-12 text-orange-300 transition-all duration-200 transform -translate-y-1/2 border rounded-full left-4 top-1/2 bg-orange-500/20 backdrop-blur-md border-orange-400/30 hover:bg-orange-500/40 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute z-10 flex items-center justify-center w-12 h-12 text-orange-300 transition-all duration-200 transform -translate-y-1/2 border rounded-full right-4 top-1/2 bg-orange-500/20 backdrop-blur-md border-orange-400/30 hover:bg-orange-500/40 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot Navigation */}
            <div className="absolute z-10 flex gap-2 bottom-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? "bg-orange-500 scale-125" 
                      : "bg-gray-400 hover:bg-orange-400"
                  }`}
                  onClick={() => selectImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;