import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalProjects } from '../hooks/useLocalProjects';
import InteractiveBackground from '../components/common/InteractiveBackground';

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { projects, loading } = useLocalProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = projects.filter(p => p.category === selectedCategory);
      setFilteredProjects(filtered);
    }
  }, [selectedCategory, projects]);

  const uiuxProjects = projects.filter(p => p.category === 'uiux');
  const frontendProjects = projects.filter(p => p.category === 'frontend');

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10 pt-24">
        {!selectedCategory ? (
          // 50-50 Split Selection Screen
          <div className="flex h-screen">
            {/* UI/UX Side */}
            <motion.div
              className="relative w-1/2 h-full cursor-pointer group"
              onClick={() => setSelectedCategory('uiux')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10"></div>
              
              <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 border rounded-full bg-orange-500/20 border-orange-500/30">
                      <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="mb-6 text-5xl font-bold text-orange-400">
                    UI/UX Design
                  </h2>
                  <p className="max-w-md mb-8 text-xl text-gray-300">
                    Explore my design projects, user research, and interface solutions
                  </p>
                  <div className="text-gray-400">
                    <span className="text-2xl font-bold text-orange-500">{uiuxProjects.length}</span> Projects
                  </div>
                </motion.div>
              </div>

              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-orange-500/10 group-hover:opacity-100"></div>
              <div className="absolute top-0 right-0 w-px h-full bg-orange-500/30"></div>
            </motion.div>

            {/* Frontend Development Side */}
            <motion.div
              className="relative w-1/2 h-full cursor-pointer group"
              onClick={() => setSelectedCategory('frontend')}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-orange-500/20 to-orange-600/10"></div>
              
              <div className="relative flex flex-col items-center justify-center h-full px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 border rounded-full bg-orange-500/20 border-orange-500/30">
                      <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="mb-6 text-5xl font-bold text-orange-400">
                    Frontend Development
                  </h2>
                  <p className="max-w-md mb-8 text-xl text-gray-300">
                    Discover my web applications, interactive experiences, and code solutions
                  </p>
                  <div className="text-gray-400">
                    <span className="text-2xl font-bold text-orange-500">{frontendProjects.length}</span> Projects
                  </div>
                </motion.div>
              </div>

              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-orange-500/10 group-hover:opacity-100"></div>
            </motion.div>
          </div>
        ) : (
          // Projects Display Screen
          <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center mb-8 space-x-2 text-orange-400 transition-colors duration-300 hover:text-orange-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Categories</span>
            </motion.button>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-orange-400">Loading projects...</div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-2 text-4xl font-bold text-orange-400">
                  {selectedCategory === 'uiux' ? 'UI/UX Design Projects' : 'Frontend Development Projects'}
                </h1>
                <p className="mb-12 text-gray-300">
                  {selectedCategory === 'uiux' 
                    ? 'A collection of my design work and user experience solutions'
                    : 'Web applications and interactive experiences I\'ve built'
                  }
                </p>

                {filteredProjects.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="mb-4 text-lg text-gray-400">No projects found in this category</div>
                    <p className="text-gray-500">Projects will appear here once added through the admin panel</p>
                    <a 
                      href="/admin" 
                      className="inline-block px-6 py-3 mt-4 text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
                    >
                      Go to Admin Panel
                    </a>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        {/* Glow Effect */}
                        <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-md group-hover:opacity-100 -z-10"></div>
                        
                        {/* Project Card */}
                        <div className="relative overflow-hidden transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl hover:border-orange-500/40">
                          <div className="relative overflow-hidden bg-gray-800 aspect-video">
                            {project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gray-800">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                              <span className="px-2 py-1 text-xs font-medium text-black rounded-full bg-orange-500/80">
                                {project.year}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="mb-2 text-xl font-bold text-orange-400">{project.title}</h3>
                            <p className="mb-4 text-sm text-gray-300">{project.description}</p>
                            
                            <div className="flex space-x-3">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 text-sm font-medium text-black transition-colors duration-300 bg-orange-500 rounded-lg hover:bg-orange-600"
                                >
                                  Live Demo
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 text-sm font-medium text-orange-400 transition-all duration-300 border border-orange-400 rounded-lg hover:bg-orange-400 hover:text-black"
                                >
                                  GitHub
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPage;