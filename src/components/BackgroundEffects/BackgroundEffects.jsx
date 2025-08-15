import React, { useRef, useEffect, useState } from 'react';
import './BackgroundEffects.scss';

const BackgroundEffects = () => {
  const canvasRef = useRef();
  const shapesRef = useRef([]);
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

  // IEEE brand colors
  const ieeeColors = {
    blue: '#00629B',
    orange: '#E87722'
  };

  // Simplified particle system for better performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReduced) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const createParticles = () => {
      // Reduced particle count for performance
      const count = window.innerWidth < 768 ? 15 : 25;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.5 ? ieeeColors.orange : '#ffffff'
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
        
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
        
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

  // Simplified mouse tracking (throttled)
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

  // Simplified moving text (reduced count)
  const movingTexts = [
    'IEEE SIGHT',
    'HUMANITARIAN TECH',
    'COMMUNITY IMPACT',
    'TECHNOLOGY FOR GOOD'
  ];

  // Simplified geometric shapes (only 2 for performance)
  const geometricShapes = [
    {
      type: 'circle',
      svg: `
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(0,98,155,0.1)" stroke-width="2"/>
          <circle cx="75" cy="75" r="30" fill="none" stroke="rgba(232,119,34,0.2)" stroke-width="1"/>
          <circle cx="75" cy="75" r="5" fill="rgba(0,98,155,0.6)"/>
        </svg>
      `,
      style: { top: '20%', left: '10%' },
      depth: 0.5
    },
    {
      type: 'hexagon',
      svg: `
        <svg width="120" height="120" viewBox="0 0 120 120">
          <polygon points="60,10 90,30 90,70 60,90 30,70 30,30" 
                   fill="none" stroke="rgba(0,132,61,0.2)" stroke-width="2"/>
          <circle cx="60" cy="50" r="3" fill="rgba(232,119,34,0.5)"/>
        </svg>
      `,
      style: { bottom: '30%', right: '15%' },
      depth: 0.3
    }
  ];

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
      
      {/* Simplified moving text */}
      <div className="text-background">
        {movingTexts.map((text, index) => (
          <div 
            key={index}
            className="moving-text"
            style={{ 
              '--duration': `${20 + index * 5}s`,
              animationDelay: `${-index * 3}s`,
              top: `${15 + index * 25}%`
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Simplified gradient */}
      <div className="gradient-overlay" />
      
      {/* Only 2 simple shapes */}
      {geometricShapes.map((shape, index) => (
        <div
          key={index}
          ref={el => shapesRef.current[index] = el}
          className={`geometric-shape shape-${shape.type}`}
          style={shape.style}
          dangerouslySetInnerHTML={{ __html: shape.svg }}
        />
      ))}

      {/* Simplified mouse glow */}
      <div 
        className="mouse-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
