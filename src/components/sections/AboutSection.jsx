import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const images = ["/assets/k1.jpg", "/assets/profile.jpg", "/assets/k3.jpg"];

const AboutSection = () => {
  const [aboutImageIndex, setAboutImageIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-20 bg-black sm:px-6 lg:flex-row lg:px-16"
    >
      {/* Mobile Layout - Experience Only */}
      <div className="w-full lg:hidden">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-orange-500">
            About Me
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-300">
            I create digital experiences that blend beautiful design with functional code.
          </p>
          
          {/* Mobile Experience */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold text-orange-400">Experience</h3>
            <div className="space-y-4">
              {[
                { title: "UI/UX Designer", company: "UMM Digital", duration: "2024 - Present", type: "design" },
                { title: "Frontend Developer", company: "College Projects", duration: "2023 - 2024", type: "dev" },
                { title: "Freelance Designer", company: "Self-Employed", duration: "2023 - 2024", type: "design" },
                { title: "Web Developer", company: "College Level", duration: "2022 - 2023", type: "dev" },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  className="p-4 border-l-4 border-orange-500 rounded-r-lg bg-gray-900/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h4 className="font-semibold text-orange-300">{job.title}</h4>
                  <p className="text-sm text-gray-400">{job.company} • {job.duration}</p>
                  <span className={`inline-block px-2 py-1 mt-2 text-xs rounded-full ${
                    job.type === 'design' 
                      ? 'bg-orange-500/20 text-orange-300' 
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {job.type === 'design' ? 'Design' : 'Development'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout - Full Content */}
      <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 lg:pr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-orange-500 lg:text-6xl">
            About Me
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-gray-300">
            I specialize in crafting intuitive digital experiences that blend aesthetics with functionality. 
            My passion lies in creating designs that are not only beautiful but also solve real problems 
            and enhance user experiences.
          </p>
          
          {/* Skills */}
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-semibold text-orange-400">What I Do</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 border rounded-lg border-orange-500/20 bg-orange-500/5">
                <h4 className="font-semibold text-orange-300">UI/UX Design</h4>
                <p className="text-sm text-gray-400">User research, wireframing, prototyping</p>
              </div>
              <div className="p-4 border rounded-lg border-orange-500/20 bg-orange-500/5">
                <h4 className="font-semibold text-orange-300">Frontend Development</h4>
                <p className="text-sm text-gray-400">React, JavaScript, responsive design</p>
              </div>
            </div>
          </div>

          {/* Desktop Experience */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-orange-400">Experience</h3>
            <div className="space-y-4">
              {[
                { title: "UI/UX Designer", company: "UMM Digital", duration: "2024 - Present", type: "design" },
                { title: "Frontend Developer", company: "College Projects", duration: "2023 - 2024", type: "dev" },
                { title: "Freelance Designer", company: "Self-Employed", duration: "2023 - 2024", type: "design" },
                { title: "Web Developer", company: "College Level", duration: "2022 - 2023", type: "dev" },
              ].map((job, index) => (
                <motion.div
                  key={index}
                  className="p-3 border-l-4 border-orange-500 rounded-r-lg bg-gray-900/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-orange-300">{job.title}</h4>
                      <p className="text-sm text-gray-400">{job.company} • {job.duration}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.type === 'design' 
                        ? 'bg-orange-500/20 text-orange-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {job.type === 'design' ? 'Design' : 'Development'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Image - Desktop Only */}
        <motion.div
          className="flex justify-center w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
            
            {/* Image container */}
            <div className="relative overflow-hidden border-2 border-orange-500/30 shadow-2xl rounded-2xl w-80 h-[450px]">
              <motion.img
                key={aboutImageIndex}
                src={images[aboutImageIndex]}
                alt="Krishna"
                className="object-cover w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Image indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === aboutImageIndex 
                      ? "bg-orange-500 scale-125" 
                      : "bg-gray-600 hover:bg-orange-400"
                  }`}
                  onClick={() => setAboutImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;