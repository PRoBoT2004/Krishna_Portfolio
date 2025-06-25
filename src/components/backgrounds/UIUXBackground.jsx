import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const UIUXBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  
  // Smooth mouse tracking with springs
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Deep sophisticated base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
      
      {/* Primary flowing wave layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useSpring(`radial-gradient(ellipse 140% 60% at ${springX}% 30%, 
            rgba(255, 165, 0, 0.12) 0%, 
            rgba(255, 140, 0, 0.06) 40%, 
            rgba(255, 120, 0, 0.02) 70%, 
            transparent 100%)`, 
            { stiffness: 80, damping: 25 })
        }}
      />

      {/* Secondary wave with offset timing */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse 120% 45% at 20% 60%, rgba(255, 140, 0, 0.08) 0%, transparent 70%)`,
            `radial-gradient(ellipse 120% 45% at 80% 60%, rgba(255, 140, 0, 0.08) 0%, transparent 70%)`,
            `radial-gradient(ellipse 120% 45% at 20% 60%, rgba(255, 140, 0, 0.08) 0%, transparent 70%)`
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      />

      {/* Tertiary wave layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse 100% 35% at 60% 80%, rgba(255, 165, 0, 0.06) 0%, transparent 60%)`,
            `radial-gradient(ellipse 100% 35% at 40% 20%, rgba(255, 165, 0, 0.06) 0%, transparent 60%)`,
            `radial-gradient(ellipse 100% 35% at 60% 80%, rgba(255, 165, 0, 0.06) 0%, transparent 60%)`
          ]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 2
        }}
      />

      {/* Interactive mouse-following layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useSpring(`radial-gradient(circle 400px at ${springX}% ${springY}%, 
            rgba(255, 165, 0, 0.08) 0%, 
            rgba(255, 140, 0, 0.04) 30%, 
            transparent 60%)`, 
            { stiffness: 100, damping: 30 })
        }}
      />

      {/* Sophisticated floating elements */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(circle 200px at 15% 25%, rgba(255, 165, 0, 0.04) 0%, transparent 70%)`,
            `radial-gradient(circle 200px at 85% 75%, rgba(255, 165, 0, 0.04) 0%, transparent 70%)`,
            `radial-gradient(circle 200px at 15% 25%, rgba(255, 165, 0, 0.04) 0%, transparent 70%)`
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />

      {/* Minimal professional accents */}
      <motion.div
        className="absolute w-1 h-8 top-12 left-12 bg-gradient-to-b from-orange-400/20 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute w-8 h-1 bottom-12 right-12 bg-gradient-to-r from-transparent to-orange-400/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Premium depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
    </div>
  );
};

export default UIUXBackground;