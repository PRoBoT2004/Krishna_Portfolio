import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Palette, Github, Instagram } from "lucide-react";

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactInfo = [
  {
    icon: <Mail size={24} className="text-orange-400" />,
    title: "Email",
    value: "krishna200428@gmail.com",
    link: "mailto:krishna200428@gmail.com"
  },
  {
    icon: <Phone size={24} className="text-orange-400" />,
    title: "Phone",
    value: "+91 9016116357",
    link: "tel:+919016116357"
  },
  {
    icon: <MapPin size={24} className="text-orange-400" />,
    title: "Location",
    value: "India",
    link: "/"
  }
];

  const socialLinks = [
  {
    name: "Behance",
    icon: <Palette size={20} className="text-orange-400" />,
    url: "https://behance.net/krishna",
    color: "hover:text-purple-400"
  },
  {
    name: "GitHub",
    icon: <Github size={20} className="text-orange-400" />,
    url: "https://github.com/PRoBoT2004",
    color: "hover:text-gray-400"
  },
  {
    name: "Instagram",
    icon: <Instagram size={20} className="text-orange-400" />,
    url: "https://instagram.com/krishna_2004_28",
    color: "hover:text-pink-400"
  }
];

  return (
    <section 
      id="contact" 
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
            Let's Work Together
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          
          {/* Mobile Layout */}
          <div className="space-y-12 lg:hidden">
            
            {/* Mobile Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="mb-8 text-2xl font-bold text-center text-orange-400">
                Get In Touch
              </h3>
              
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="relative group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    {/* Mobile glow */}
                    <div className="absolute transition-opacity duration-300 opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-md group-hover:opacity-100 -z-10"></div>
                    
                    <div className="relative p-4 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl hover:border-orange-500/40">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{info.icon}</div>
                        <div>
                          <h4 className="font-semibold text-orange-300">{info.title}</h4>
                          <p className="text-gray-300">{info.value}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Mobile Social Links */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="mb-6 text-xl font-bold text-orange-400">
                Follow Me
              </h3>
              
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute transition-opacity duration-300 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-md group-hover:opacity-100 -z-10"></div>
                    
                    <div className="relative p-3 transition-all duration-300 border rounded-full bg-gray-900/30 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40">
                      <span className="text-xl">{social.icon}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Mobile Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="mb-8 text-2xl font-bold text-center text-orange-400">
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-lg font-semibold text-black transition-all duration-300 bg-orange-500 shadow-lg rounded-xl hover:bg-orange-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            
            {/* Desktop Left - Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h3 className="mb-8 text-3xl font-bold text-orange-400">
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="relative block group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      {/* Desktop glow */}
                      <div className="absolute transition-opacity duration-300 opacity-0 -inset-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl blur-lg group-hover:opacity-100 -z-10"></div>
                      
                      <div className="relative p-6 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl hover:border-orange-500/40">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{info.icon}</div>
                          <div>
                            <h4 className="text-xl font-semibold text-orange-300">{info.title}</h4>
                            <p className="text-lg text-gray-300">{info.value}</p>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Desktop Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="mb-6 text-2xl font-bold text-orange-400">
                  Follow Me
                </h3>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <div className="absolute transition-opacity duration-300 rounded-full opacity-0 -inset-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 blur-lg group-hover:opacity-100 -z-10"></div>
                      
                      <div className="relative p-4 transition-all duration-300 border rounded-full bg-gray-900/30 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40">
                        <span className="text-2xl">{social.icon}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Desktop Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="mb-8 text-3xl font-bold text-orange-400">
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative group">
                    <input
                                            type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 text-lg text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 text-lg text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 text-lg text-white placeholder-gray-400 transition-all duration-300 border bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="8"
                    className="w-full px-4 py-4 text-lg text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-gray-900/30 backdrop-blur-sm border-orange-500/20 rounded-xl focus:border-orange-500/60 focus:outline-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-xl font-semibold text-black transition-all duration-300 bg-orange-500 shadow-lg rounded-xl hover:bg-orange-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="pt-12 mt-20 text-center border-t border-orange-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mb-4 text-gray-400">
            © 2024 Krishna. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Designed & Developed with ❤️ using React & Tailwind CSS
          </p>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-orange-500/3 blur-3xl"></div>
      <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/3 blur-3xl"></div>
    </section>
  );
};

export default ContactSection;