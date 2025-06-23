import ContactSection from '../components/sections/ContactSection';
import InteractiveBackground from '../components/common/InteractiveBackground';

const ContactPage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <InteractiveBackground />
      <div className="relative z-10 pt-16">
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactPage;