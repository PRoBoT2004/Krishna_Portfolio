import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFileProjects } from '../hooks/useFileProjects';
import UIUXBackground from '../components/backgrounds/UIUXBackground';
import FrontendBackground from '../components/backgrounds/FrontendBackground';
import InteractiveBackground from '../components/common/InteractiveBackground';
import { ExternalLink, Eye, Github } from 'lucide-react';

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { projects, loading, fetchProjects } = useFileProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  // Fetch ALL projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Store all projects when no category is selected and projects are loaded
  useEffect(() => {
    if (!selectedCategory && projects.length > 0) {
      setAllProjects(projects);
    }
  }, [projects, selectedCategory]);

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProjects(selectedCategory);
    } else {
      fetchProjects();
    }
  }, [selectedCategory]);

  // Update filtered projects when projects data changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = projects.filter(p => p.category === selectedCategory);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, selectedCategory]);

  // Always get counts from allProjects to ensure consistency
  const uiuxProjects = allProjects.filter(p => p.category === 'uiux');
  const frontendProjects = allProjects.filter(p => p.category === 'frontend');

  // Get card styling based on category
  const getCardStyling = (category) => {
    if (category === 'uiux') {
      return {
        gradient: 'from-orange-500/10 to-pink-500/10',
        border: 'border-orange-500/20 hover:border-orange-400/60',
        glow: 'from-orange-500/20 to-orange-600/20',
        badge: 'bg-orange-500/90',
        categoryBadge: 'bg-orange-900/60 text-orange-300 border-orange-500/30',
        title: 'text-orange-400 group-hover:text-orange-300',
        primaryButton: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white',
        secondaryButton: 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black',
        accent: 'orange'
      };
    } else {
      return {
        gradient: 'from-cyan-500/10 to-blue-500/10',
        border: 'border-cyan-500/20 hover:border-cyan-400/60',
        glow: 'from-cyan-500/20 to-cyan-600/20',
        badge: 'bg-cyan-500/90',
        categoryBadge: 'bg-cyan-900/60 text-cyan-300 border-cyan-500/30',
        title: 'text-cyan-400 group-hover:text-cyan-300',
        primaryButton: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white',
        secondaryButton: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black',
        accent: 'cyan'
      };
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {!selectedCategory ? (
        // Responsive Split Selection Screen
        <div className="flex flex-col h-screen md:flex-row">
          {/* UI/UX Side */}
          <motion.div
            className="relative flex-1 cursor-pointer group md:w-1/2"
            onClick={() => setSelectedCategory('uiux')}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <UIUXBackground />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 text-center md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-sm mx-auto"
              >
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border rounded-full md:w-24 md:h-24 md:mb-6 bg-orange-500/20 border-orange-500/30">
                    <svg className="w-8 h-8 text-orange-400 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="mb-4 text-3xl font-bold text-orange-400 md:mb-6 md:text-5xl">
                  UI/UX Design
                </h2>
                <p className="mb-6 text-base text-gray-300 md:max-w-md md:mb-8 md:text-xl">
                  Explore my design projects, user research, and interface solutions
                </p>
                <div className="text-gray-400">
                  <span className="text-xl font-bold text-orange-500 md:text-2xl">{uiuxProjects.length}</span> Projects
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-orange-500/10 group-hover:opacity-100"></div>
            {/* Divider - only show on desktop */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-orange-500/30 md:top-0 md:right-0 md:w-px md:h-full md:bottom-auto md:left-auto"></div>
          </motion.div>

          {/* Frontend Development Side */}
          <motion.div
            className="relative flex-1 cursor-pointer group md:w-1/2"
            onClick={() => setSelectedCategory('frontend')}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <FrontendBackground />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 text-center md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-sm mx-auto"
              >
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border rounded-full md:w-24 md:h-24 md:mb-6 bg-orange-500/20 border-orange-500/30">
                    <svg className="w-8 h-8 text-orange-400 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="mb-4 text-3xl font-bold text-orange-400 md:mb-6 md:text-5xl">
                  Frontend Development
                </h2>
                <p className="mb-6 text-base text-gray-300 md:max-w-md md:mb-8 md:text-xl">
                  Discover my web applications, interactive experiences, and code solutions
                </p>
                <div className="text-gray-400">
                  <span className="text-xl font-bold text-orange-500 md:text-2xl">{frontendProjects.length}</span> Projects
                </div>
              </motion.div>
            </div>

            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-orange-500/10 group-hover:opacity-100"></div>
          </motion.div>
        </div>
      ) : (
        // Responsive Projects Display Screen
        <div className="relative w-full min-h-screen overflow-auto">
          <InteractiveBackground />
          
          <div className="relative z-10 min-h-screen px-4 py-6 pt-20 sm:px-6 lg:px-8 md:py-8 md:pt-24">
            {/* Responsive Back Button */}
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center mb-6 space-x-2 text-orange-400 transition-colors duration-300 hover:text-orange-300 md:mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm md:text-base">Back to Categories</span>
            </motion.button>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-orange-400 md:text-xl">Loading projects...</div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Responsive Section Header */}
                <div className="mb-8 text-center md:mb-12">
                  <h1 className={`mb-3 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl md:mb-4 ${selectedCategory === 'uiux' ? 'text-orange-400' : 'text-cyan-400'}`}>
                    {selectedCategory === 'uiux' ? 'UI/UX Design Projects' : 'Frontend Development Projects'}
                  </h1>
                  <p className="max-w-2xl mx-auto text-base text-gray-300 md:text-lg">
                    {selectedCategory === 'uiux' 
                      ? 'A collection of my design work and user experience solutions'
                      : 'Web applications and interactive experiences I\'ve built'
                    }
                  </p>
                </div>

                {/* Responsive Projects Grid */}
                {filteredProjects.length === 0 ? (
                  <div className="py-12 text-center md:py-20">
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full md:w-24 md:h-24 md:mb-6">
                        <svg className="w-8 h-8 text-gray-500 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-400 md:mb-4 md:text-2xl">No projects found</h3>
                    <p className="max-w-md mx-auto mb-6 text-sm text-gray-500 md:mb-8 md:text-base">
                      No projects available in this category yet. Add projects to{' '}
                      <code className="px-2 py-1 text-orange-400 bg-gray-800 rounded">src/data/projects.json</code>
                    </p>
                    <Link 
                      to="/admin" 
                      className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-semibold text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600 md:px-6 md:py-3 md:text-base"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Projects</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                    {filteredProjects.map((project, index) => {
                      const styling = getCardStyling(project.category);
                      
                      return (
                        <motion.div
                          key={project.id}
                          className="relative group"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          {/* Enhanced Glow Effect */}
                          <div className={`absolute transition-all duration-500 opacity-0 -inset-1 bg-gradient-to-r ${styling.glow} rounded-2xl blur-lg group-hover:opacity-100 -z-10`}></div>
                          
                          {/* Responsive Premium Card */}
                          <div className={`relative flex flex-col h-full overflow-hidden transition-all duration-500 border-2 bg-gradient-to-br ${styling.gradient} backdrop-blur-xl ${styling.border} rounded-2xl transform group-hover:scale-[1.02] group-hover:shadow-2xl`}>
                            
                            {/* Responsive Project Image */}
                            <div className="relative overflow-hidden bg-gray-900 aspect-video">
                              {project.image ? (
                                <img 
                                  src={project.image} 
                                  alt={project.title}
                                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                                  <svg className="w-12 h-12 text-gray-600 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40"></div>
                              
                              {/* Responsive Badges */}
                              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                                <span className={`px-2 py-1 text-xs font-bold text-black rounded-full md:px-4 md:py-2 md:text-sm ${styling.badge} shadow-lg backdrop-blur-sm`}>
                                  {project.year}
                                </span>
                              </div>

                              <div className="absolute top-3 right-3 md:top-4 md:right-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full border backdrop-blur-md md:px-3 md:py-1.5 ${styling.categoryBadge}`}>
                                  {project.category === 'uiux' ? 'UI/UX' : 'Frontend'}
                                </span>
                              </div>

                              {/* Category Icon */}
                              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                                <div className={`w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center border md:w-10 md:h-10 ${project.category === 'uiux' ? 'border-orange-500/30' : 'border-cyan-500/30'}`}>
                                  {project.category === 'uiux' ? (
                                    <svg className="w-4 h-4 text-orange-400 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                                    </svg>
                                  ) : (
                                    <svg className="w-4 h-4 text-cyan-400 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Responsive Content Section */}
                            <div className="flex flex-col flex-1 p-4 bg-gray-950/50 backdrop-blur-xl md:p-6 lg:p-8">
                              <h3 className={`mb-3 text-lg font-bold transition-colors duration-300 md:mb-4 md:text-xl lg:text-2xl ${styling.title}`}>
                                {project.title}
                              </h3>
                              <p className="flex-1 mb-4 text-xs leading-relaxed text-gray-300 md:mb-6 md:text-sm lg:mb-8 line-clamp-3">
                                {project.description}
                              </p>
                              
                              {/* Responsive Action Buttons */}
                              <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:flex-wrap sm:gap-3 md:mb-6">
                                {/* Primary Action */}
                                {project.caseStudy?.hasDetailedStudy ? (
                                  <Link
                                    to={`/case-study/${project.id}`}
                                    className={`inline-flex items-center justify-center px-4 py-2.5 space-x-2 text-xs font-semibold transition-all duration-300 rounded-xl md:px-6 md:py-3 md:text-sm ${styling.primaryButton} shadow-lg hover:shadow-xl hover:scale-105`}
                                  >
                                    <Eye size={16} className="md:w-5 md:h-5" />
                                    <span>Case Study</span>
                                  </Link>
                                ) : (
                                  project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center justify-center px-4 py-2.5 space-x-2 text-xs font-semibold transition-all duration-300 rounded-xl md:px-6 md:py-3 md:text-sm ${styling.primaryButton} shadow-lg hover:shadow-xl hover:scale-105`}
                                    >
                                      <ExternalLink size={16} className="md:w-5 md:h-5" />
                                      <span>Live Website</span>
                                    </a>
                                  )
                                )}
                                
                                {/* Secondary Actions - Stack on mobile */}
                                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                                  {project.caseStudy?.hasDetailedStudy && project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center justify-center px-4 py-2.5 space-x-2 text-xs font-semibold transition-all duration-300 border-2 rounded-xl md:px-6 md:py-3 md:text-sm ${styling.secondaryButton} hover:scale-105`}
                                    >
                                      <ExternalLink size={16} className="md:w-5 md:h-5" />
                                      <span>Live Website</span>
                                    </a>
                                  )}
                                  
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center justify-center px-4 py-2.5 space-x-2 text-xs font-semibold transition-all duration-300 border-2 rounded-xl md:px-6 md:py-3 md:text-sm ${styling.secondaryButton} hover:scale-105`}
                                    >
                                      <Github size={16} className="md:w-5 md:h-5" />
                                      <span>Code</span>
                                    </a>
                                  )}

                                  {project.figmaUrl && (
                                    <a
                                      href={project.figmaUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center justify-center px-4 py-2.5 space-x-2 text-xs font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-600 border-2 border-purple-400 rounded-xl hover:from-purple-600 hover:to-pink-700 hover:scale-105 md:px-6 md:py-3 md:text-sm"
                                    >
                                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
                                      </svg>
                                      <span>Figma</span>
                                    </a>
                                  )}
                                </div>
                              </div>

                              {/* Responsive Technologies Section */}
                              {project.caseStudy?.technologies && project.caseStudy.technologies.length > 0 && (
                                <div className="pt-4 border-t border-gray-700/50 md:pt-6">
                                  <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase md:mb-3">Technologies</p>
                                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {project.caseStudy.technologies.slice(0, 4).map((tech, techIndex) => (
                                      <span 
                                        key={techIndex}
                                        className={`px-2 py-1 text-xs font-medium rounded-lg md:px-3 md:py-1.5 ${project.category === 'uiux' ? 'bg-orange-900/30 text-orange-300 border border-orange-500/20' : 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/20'}`}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {project.caseStudy.technologies.length > 4 && (
                                      <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800/50 border border-gray-600/30 rounded-lg md:px-3 md:py-1.5">
                                        +{project.caseStudy.technologies.length - 4}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Responsive Call to Action */}
                {filteredProjects.length > 0 && (
                  <motion.div
                    className="mt-12 text-center md:mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className={`max-w-2xl p-6 mx-auto border-2 bg-gradient-to-br backdrop-blur-xl rounded-3xl md:p-10 ${selectedCategory === 'uiux' ? 'from-orange-500/10 to-pink-500/10 border-orange-500/30' : 'from-cyan-500/10 to-blue-500/10 border-cyan-500/30'}`}>
                      <h3 className={`mb-4 text-xl font-bold md:mb-6 md:text-2xl lg:text-3xl ${selectedCategory === 'uiux' ? 'text-orange-400' : 'text-cyan-400'}`}>
                        Interested in working together?
                      </h3>
                      <p className="mb-6 text-sm text-gray-300 md:mb-8 md:text-base lg:text-lg">
                        I'm always open to discussing new opportunities and exciting projects.
                      </p>
                      <Link
                        to="/contact"
                        className={`inline-flex items-center px-6 py-3 space-x-2 text-sm font-bold transition-all duration-300 border-3 rounded-2xl hover:scale-105 shadow-xl hover:shadow-2xl md:px-10 md:py-5 md:space-x-3 md:text-base lg:text-lg ${selectedCategory === 'uiux' ? 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black' : 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'}`}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Let's Connect</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksPage;