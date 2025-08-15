import React, { useRef, useEffect, useState } from 'react';
import './BackgroundEffects.scss';

const BackgroundEffects = () => {
  const canvasRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReduced, setIsReduced] = useState(false);

  // Check for reduced motion preference and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    setIsReduced(mediaQuery.matches || isMobile);

    const handleChange = () => setIsReduced(mediaQuery.matches || window.innerWidth < 768);
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  // Particle animation system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReduced) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 20 : 40;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.5 ? '#E87722' : '#00629B'
      }));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
        
        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [isReduced]);

  // Mouse tracking for glow effect
  useEffect(() => {
    if (isReduced) return;

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReduced]);

  if (isReduced) {
    return (
      <div className="background-effects reduced">
        <div className="simple-gradient" />
      </div>
    );
  }

  return (
    <div className="background-effects">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Mouse glow effect */}
      <div 
        className="mouse-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />
      
      {/* Geometric shapes */}
      <div className="geometric-shapes">
        <div className="shape circle" style={{ top: '20%', left: '10%' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,98,155,0.2)" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(232,119,34,0.3)" strokeWidth="1"/>
          </svg>
        </div>
        
        <div className="shape hexagon" style={{ bottom: '30%', right: '15%' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <polygon points="40,10 60,25 60,55 40,70 20,55 20,25" 
                     fill="none" stroke="rgba(0,132,61,0.2)" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffects;
