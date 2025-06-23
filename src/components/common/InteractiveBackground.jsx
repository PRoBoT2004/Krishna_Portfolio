import { useEffect, useRef } from 'react'

const InteractiveBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    
    window.addEventListener('mousemove', handleMouseMove)

    // Optimized particles system
    const particles = []
    const particleCount = 80
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 60 + 15 // Orange range: 15-75
      })
    }

    // Floating orbs for depth
    const orbs = []
    for (let i = 0; i < 5; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.1 + 0.05
      })
    }

    let time = 0
    let frame = 0

    const animate = () => {
      time += 0.008
      frame++
      
      // Clear with deep black
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Create dynamic gradient base
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.7, canvas.width
      )
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.03)')
      gradient.addColorStop(0.4, 'rgba(255, 69, 0, 0.02)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Mouse interaction - glowing orange effect
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      
      if (mouseX && mouseY) {
        const mouseGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 300
        )
        mouseGradient.addColorStop(0, 'rgba(255, 140, 0, 0.15)')
        mouseGradient.addColorStop(0.3, 'rgba(255, 69, 0, 0.08)')
        mouseGradient.addColorStop(0.6, 'rgba(255, 140, 0, 0.03)')
        mouseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = mouseGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Animate floating orbs (only every 2nd frame for performance)
      if (frame % 2 === 0) {
        orbs.forEach(orb => {
          orb.x += orb.speedX
          orb.y += orb.speedY
          
          if (orb.x > canvas.width + orb.size) orb.x = -orb.size
          if (orb.x < -orb.size) orb.x = canvas.width + orb.size
          if (orb.y > canvas.height + orb.size) orb.y = -orb.size
          if (orb.y < -orb.size) orb.y = canvas.height + orb.size
          
          const orbGradient = ctx.createRadialGradient(
            orb.x, orb.y, 0,
            orb.x, orb.y, orb.size
          )
          orbGradient.addColorStop(0, `rgba(255, 140, 0, ${orb.opacity})`)
          orbGradient.addColorStop(0.7, `rgba(255, 69, 0, ${orb.opacity * 0.3})`)
          orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          
          ctx.fillStyle = orbGradient
          ctx.beginPath()
          ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // Animate particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
        
        // Pulsing effect
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + index * 0.1)
        const currentOpacity = particle.opacity * pulse
        
        // Draw particle with glow
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsl(${particle.hue}, 100%, 50%)`
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${currentOpacity})`
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      // Connect particles with orange lines
      if (frame % 3 === 0) { // Every 3rd frame for performance
        particles.forEach((particle, index) => {
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.3
              ctx.strokeStyle = `rgba(255, 140, 0, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })
        })
      }

      // Add subtle animated waves
      ctx.strokeStyle = 'rgba(255, 140, 0, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.5 + 
                   Math.sin((x * 0.01) + (time * 2) + (i * 2)) * 50 +
                   Math.sin((x * 0.005) + (time * 1.5) + (i * 1.5)) * 30
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default InteractiveBackground