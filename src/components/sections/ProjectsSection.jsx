import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    id: "colorpencil",
    title: "Color Pencil",
    description: "Revamping an educational platform with modern UI/UX principles and enhanced user experience.",
    image: "/assets/1.png",
    route: "/works/colorpencil-case-study",
    figmaLink: "https://www.figma.com/design/yEkNHJQZbO5gnhIc0QcMSF/Color-Pencil-Pages?node-id=0-1",
    type: "UI/UX Design",
    year: "2024"
  },
  {
    id: "launchpad",
    title: "Launchpad",
    description: "Helping a global school with a modern web presence for better interaction and engagement.",
    image: "/assets/2.png",
    route: "/works/launchpad-case-study",
    figmaLink: "https://www.figma.com/design/DsGMoqInLzYyDGChRvXSDa/Launchpad?node-id=0-1",
    type: "Web Development",
    year: "2024"
  },
  {
    id: "enda",
    title: "Enda",
    description: "Designing a mobile app for a sustainable sportswear brand with focus on user engagement.",
    image: "/assets/3.png",
    route: "/works/enda-case-study",
    figmaLink: "https://www.figma.com/design/Pv13MUB4JVLSDxbbf5b5hn/Enda?node-id=0-1",
    type: "Mobile App",
    year: "2023"
  },
];

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ maxWidth: '100vw', background: 'transparent' }}
    >
      <div className="w-full max-w-full px-4 py-20 mx-auto sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-orange-500 sm:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            A showcase of my design and development work, from concept to completion
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-20 lg:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-full max-w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Mobile Layout */}
              <div className="w-full max-w-full lg:hidden">
                {/* Mobile Image */}
                <div className="relative mb-6 group">
                  {/* Subtle glow behind */}
                  <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-md group-hover:opacity-100 -z-10"></div>
                  
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="relative object-cover w-full h-64 shadow-2xl cursor-pointer rounded-xl"
                    onClick={() => window.open(project.figmaLink, "_blank")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                  
                  {/* Mobile type badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-black rounded-full bg-orange-500/80">
                      {project.type}
                    </span>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="text-center">
                  <h3 className="mb-3 text-2xl font-bold text-orange-400">
                    {project.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-300">
                    {project.description}
                  </p>
                  
                  {/* Mobile Buttons */}
                  <div className="flex flex-col w-full gap-3">
                    <button
                      onClick={() => navigate(project.route)}
                      className="w-full px-6 py-3 text-lg font-semibold text-black transition-all duration-300 bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 hover:scale-105"
                    >
                      View Case Study
                    </button>
                    <button
                      onClick={() => window.open(project.figmaLink, "_blank")}
                      className="w-full px-6 py-3 text-lg font-semibold text-orange-400 transition-all duration-300 border-2 border-orange-400 rounded-lg hover:bg-orange-400 hover:text-black backdrop-blur-sm"
                    >
                      View Design
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Perfect 50-50 Split */}
              <div className={`hidden lg:flex items-center w-full max-w-full min-h-[500px] ${
                index % 2 !== 0 ? "flex-row-reverse" : ""
              }`}>
                {/* Content Section - Exactly 50% */}
                <div className="flex flex-col justify-center w-1/2 h-full px-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-sm font-medium text-orange-300 rounded-full bg-orange-500/20">
                      {project.type}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  
                  <h3 className="mb-6 text-4xl font-bold text-orange-400 lg:text-5xl">
                    {project.title}
                  </h3>
                  
                  <p className="mb-8 text-xl leading-relaxed text-gray-300">
                    {project.description}
                  </p>
                  
                  {/* Desktop Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(project.route)}
                      className="px-8 py-4 text-lg font-semibold text-black transition-all duration-300 bg-orange-500 shadow-lg rounded-xl hover:bg-orange-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30"
                    >
                      View Case Study
                    </button>
                    <button
                      onClick={() => window.open(project.figmaLink, "_blank")}
                      className="px-8 py-4 text-lg font-semibold text-orange-400 transition-all duration-300 border-2 border-orange-400 rounded-xl hover:bg-orange-400 hover:text-black backdrop-blur-sm hover:scale-105"
                    >
                      View Design
                    </button>
                  </div>
                </div>

                {/* Image Section - Exactly 50% */}
                <div className="flex items-center justify-center w-1/2 h-full px-8">
                  <div className="relative w-full max-w-lg group">
                    {/* Subtle glow behind */}
                    <div className="absolute transition-opacity duration-500 opacity-0 -inset-2 bg-gradient-to-r from-orange-500/8 to-orange-600/8 rounded-xl blur-lg group-hover:opacity-100 -z-10"></div>
                    
                    {/* Image container */}
                    <motion.div
                      className="relative w-full overflow-hidden shadow-2xl cursor-pointer rounded-2xl"
                      onClick={() => window.open(project.figmaLink, "_blank")}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-auto"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="mb-6 text-lg text-gray-400">
            Interested in working together?
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 text-lg font-semibold text-orange-400 transition-all duration-300 border-2 border-orange-400 rounded-xl hover:bg-orange-400 hover:text-black backdrop-blur-sm hover:scale-105"
          >
            Let's Create Something Amazing
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;