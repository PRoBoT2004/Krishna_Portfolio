import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import SkillsSection from '../components/sections/SkillsSection'  
import ContactSection from '../components/sections/ContactSection'

const HomePage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      {/* Other sections will go here */}
    </div>
  )
}

export default HomePage