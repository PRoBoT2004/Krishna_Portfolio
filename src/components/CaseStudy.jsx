import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFileProjects } from "../hooks/useFileProjects";
import { 
  ArrowLeft, ExternalLink, Calendar, User, Clock, ChevronLeft, ChevronRight, 
  X, Maximize2, Github
} from "lucide-react";
import InteractiveBackground from "./common/InteractiveBackground";

const CaseStudy = () => {
  const { projectId } = useParams();
  const { projects, loading } = useFileProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageContainerRef = useRef(null);
  
  // Find the specific project
  const project = projects.find(p => p.id === projectId);
  
  // If project not found or no case study, redirect
  if (!loading && (!project || !project.caseStudy?.hasDetailedStudy)) {
    return <Navigate to="/works" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="text-lg text-orange-400">Loading case study...</div>
        </motion.div>
      </div>
    );
  }

  const caseStudy = project.caseStudy;
  const images = caseStudy.gallery || [];

  const prevImage = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1;
      setTimeout(() => {
        if (imageContainerRef.current) {
          imageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return newIndex;
    });
  };

  const nextImage = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1;
      setTimeout(() => {
        if (imageContainerRef.current) {
          imageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return newIndex;
    });
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
    setTimeout(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Modal navigation functions (don't close modal)
  const modalPrevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  const modalNextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <InteractiveBackground />
      
      {/* Navigation - Fixed with higher z-index */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/works"
            className="inline-flex items-center space-x-2 text-orange-400 transition-colors duration-200 hover:text-orange-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </nav>

      {/* Content - Proper top margin to avoid navbar overlap */}
      <div className="pt-20">
        
        {/* Hero Section - Clean & Minimal */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Project Type Badge */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 text-sm font-medium text-orange-400 border rounded-full bg-orange-500/10 border-orange-500/20">
                {project.category === 'uiux' ? 'UI/UX Design' : 'Frontend Development'}
              </span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
            >
              {project.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 text-xl leading-relaxed text-gray-400 md:text-2xl"
            >
              {project.description}
            </motion.p>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 mb-12 text-sm text-gray-500"
            >
              {caseStudy.role && (
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{caseStudy.role}</span>
                </div>
              )}
              {caseStudy.duration && (
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{caseStudy.duration}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{project.year}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 space-x-2 font-semibold text-black transition-all duration-200 bg-orange-500 rounded-xl hover:bg-orange-600 hover:scale-105"
                >
                  <ExternalLink size={20} />
                  <span>View Live Project</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 space-x-2 font-semibold text-orange-400 transition-all duration-200 border border-orange-500/30 rounded-xl hover:bg-orange-500/10"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
              )}
              {caseStudy.figmaUrl && (
                <a
                  href={caseStudy.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 space-x-2 font-semibold text-purple-400 transition-all duration-200 border border-purple-500/30 rounded-xl hover:bg-purple-500/10"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
                  </svg>
                  <span>View Design</span>
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Gallery - Full Width */}
        {images.length > 0 && (
          <section className="mb-24">
            <div className="px-6 mx-auto max-w-7xl">
              
              {/* Gallery Header */}
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Project Gallery
                </h2>
                <p className="text-lg text-gray-400">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>

              {/* Main Image Display with Fixed Controls */}
              <div className="relative mb-8 overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl">
                {/* Scrollable Image Container */}
                <div 
                  ref={imageContainerRef}
                  className="relative h-[60vh] md:h-[70vh] overflow-y-auto scrollbar-hide"
                >
                  <img
                    src={images[currentIndex]}
                    alt={`Project image ${currentIndex + 1}`}
                    className="object-contain object-top w-full min-h-full"
                  />
                </div>

                {/* Fixed Controls Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Expand Button - Fixed top right */}
                  <button
                    onClick={() => openModal(currentIndex)}
                    className="absolute p-3 text-white transition-all duration-200 border border-orange-500 rounded-lg shadow-lg pointer-events-auto top-4 right-4 bg-orange-500/40 backdrop-blur-sm hover:bg-orange-500/60"
                  >
                    <Maximize2 size={18} />
                  </button>

                  {/* Navigation Arrows - Fixed center left/right */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute p-3 text-white transition-all duration-200 transform -translate-y-1/2 border border-orange-500 rounded-lg shadow-lg pointer-events-auto bg-orange-500/40 left-4 top-1/2 backdrop-blur-sm hover:bg-orange-500/60"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute p-3 text-white transition-all duration-200 transform -translate-y-1/2 border border-orange-500 rounded-lg shadow-lg pointer-events-auto right-4 top-1/2 bg-orange-500/40 backdrop-blur-sm hover:bg-orange-500/60"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <div 
                    className="h-full transition-all duration-300 bg-orange-500"
                    style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`flex-shrink-0 relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        currentIndex === index
                          ? 'border-orange-500 scale-105'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-16 h-16 md:w-20 md:h-20"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Content Grid - Two Column */}
        <section className="px-6 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-16 lg:grid-cols-2">
              
              {/* Left Column */}
              <div className="space-y-12">
                
                {/* Project Overview */}
                {caseStudy.overview && (
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">Project Overview</h3>
                    <p className="text-lg leading-relaxed text-gray-400">
                      {caseStudy.overview}
                    </p>
                  </div>
                )}

                {/* Problem */}
                {caseStudy.problem && (
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">The Challenge</h3>
                    <ul className="space-y-4">
                      {caseStudy.problem.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 mt-3 bg-red-400 rounded-full"></div>
                          <span className="text-lg text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-12">
                
                {/* Solution */}
                {caseStudy.solution && (
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">The Solution</h3>
                    <ul className="space-y-4">
                      {caseStudy.solution.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 mt-3 bg-green-400 rounded-full"></div>
                          <span className="text-lg text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {caseStudy.technologies && (
                  <div>
                    <h3 className="mb-6 text-2xl font-bold text-white">Technologies Used</h3>
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 text-sm font-medium text-orange-400 border rounded-lg bg-orange-500/10 border-orange-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 py-16 bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Let's work together
            </h2>
            <p className="mb-8 text-lg text-gray-400">
              Have a project in mind? I'd love to help bring your ideas to life.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 font-semibold text-black transition-all duration-200 bg-orange-500 rounded-xl hover:bg-orange-600 hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                to="/works"
                className="inline-flex items-center px-8 py-4 space-x-2 font-semibold text-orange-400 transition-all duration-200 border border-orange-500/30 rounded-xl hover:bg-orange-500/10"
              >
                <ArrowLeft size={20} />
                <span>More Projects</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal with Fixed Navigation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Modal Content Container */}
            <div className="relative w-full h-full">
              
              {/* Scrollable Image */}
              <div className="w-full h-full overflow-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center min-h-full p-8 md:p-16">
                  <motion.img
                    key={currentIndex} // Re-mount on image change for smooth transition
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentIndex]}
                    alt={`Project image ${currentIndex + 1}`}
                    className="object-contain h-auto max-w-full rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Fixed Navigation Controls */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute z-10 p-4 text-white transition-all duration-200 border border-orange-500 shadow-xl pointer-events-auto top-6 right-6 bg-orange-500/40 backdrop-blur-sm rounded-xl hover:bg-orange-500/60"
                >
                  <X size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute z-10 px-4 py-2 text-sm font-medium text-white transform -translate-x-1/2 border border-orange-500 shadow-xl pointer-events-auto top-6 left-1/2 bg-orange-500/40 backdrop-blur-sm rounded-xl">
                  {currentIndex + 1} / {images.length}
                </div>

                {/* Previous Button */}
                {images.length > 1 && (
                  <button
                    onClick={modalPrevImage}
                    className="absolute z-10 p-4 text-white transition-all duration-200 transform -translate-y-1/2 border border-orange-500 shadow-xl pointer-events-auto left-6 top-1/2 bg-orange-500/40 backdrop-blur-sm rounded-xl hover:bg-orange-500/60"
                  >
                    <ChevronLeft size={28} />
                  </button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                  <button
                    onClick={modalNextImage}
                    className="absolute z-10 p-4 text-white transition-all duration-200 transform -translate-y-1/2 border border-orange-500 shadow-xl pointer-events-auto right-6 top-1/2 bg-orange-500/40 backdrop-blur-sm rounded-xl hover:bg-orange-500/60"
                  >
                    <ChevronRight size={28} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudy;