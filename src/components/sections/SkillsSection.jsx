import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Skill Data - Updated with our theme
const skills = [
  { name: "UI/UX Design", level: "Expert", percentage: 95, color: "#ff8c00" },
  { name: "Frontend Development", level: "Advanced", percentage: 85, color: "#ff6b35" },
  { name: "Prototyping", level: "Advanced", percentage: 80, color: "#ff8c00" },
  { name: "Graphic Design", level: "Intermediate", percentage: 75, color: "#ff6b35" },
  { name: "Web Development", level: "Intermediate", percentage: 70, color: "#ff8c00" },
];

// Tools Data - Updated with our theme
const tools = [
  { name: "Figma", icon: "/assets/figma.png" },
  { name: "React", icon: "/assets/react.png" },
  { name: "Photoshop", icon: "/assets/photoshop.png" },
  { name: "JavaScript", icon: "/assets/javascript.png" },
  { name: "Illustrator", icon: "/assets/illustrator.png" },
  { name: "Tailwind", icon: "/assets/tailwind.png" },
];

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section 
      id="skills" 
      ref={ref}
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ maxWidth: '100vw', background: 'black' }}
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
            Skills & Expertise
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            My technical skills and the tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid w-full max-w-6xl grid-cols-1 gap-6 mx-auto mb-20 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {/* Glow effect behind */}
              <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-md group-hover:opacity-100 -z-10"></div>
              
              {/* Skill Card */}
              <div className="relative h-full p-6 transition-all duration-300 border bg-gray-900/50 backdrop-blur-sm border-orange-500/20 rounded-xl hover:border-orange-500/40">
                <div className="flex flex-col h-full">
                  <h3 className="mb-2 text-xl font-semibold text-orange-400">
                    {skill.name}
                  </h3>
                  
                  {/* Progress Bar */}
                  <div className="relative w-full h-3 mb-3 overflow-hidden bg-gray-800 rounded-full">
                    <motion.div 
                      className="absolute top-0 left-0 h-full rounded-full shadow-lg"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                      }}
                      initial={{ width: "0%" }}
                      animate={inView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-gray-400">{skill.level}</span>
                    <span className="text-sm font-medium text-orange-300">{skill.percentage}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="mb-12 text-3xl font-bold text-center text-orange-400 sm:text-4xl">
            Tools & Technologies
          </h3>

          {/* Mobile Tools Layout */}
          <div className="grid grid-cols-2 gap-6 sm:hidden">
            {tools.map((tool, index) => (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                {/* Mobile glow */}
                <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-md group-hover:opacity-100 -z-10"></div>
                
                <div className="relative p-4 text-center transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl hover:border-orange-500/40">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-orange-500/10">
                    <img 
                      src={tool.icon} 
                      alt={tool.name} 
                      className="object-contain w-8 h-8" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden w-8 h-8 rounded bg-orange-500/20"></div>
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tool.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Tools Layout */}
          <div className="hidden grid-cols-3 gap-8 sm:grid md:grid-cols-6 justify-items-center">
            {tools.map((tool, index) => (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Desktop glow */}
                <div className="absolute transition-opacity duration-300 opacity-0 -inset-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-lg group-hover:opacity-100 -z-10"></div>
                
                <div className="relative bg-gray-900/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 text-center hover:border-orange-500/40 transition-all duration-300 min-w-[120px]">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg bg-orange-500/10">
                    <img 
                      src={tool.icon} 
                      alt={tool.name} 
                      className="object-contain w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="items-center justify-center hidden w-10 h-10 rounded bg-orange-500/20">
                      <span className="text-xs font-bold text-orange-400">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-300">{tool.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mb-6 text-lg text-gray-400">
            Ready to work with these skills?
          </p>
          <button className="px-8 py-4 text-lg font-semibold text-orange-400 transition-all duration-300 border-2 border-orange-400 rounded-xl hover:bg-orange-400 hover:text-black backdrop-blur-sm hover:scale-105">
            Let's Collaborate
          </button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default SkillsSection;