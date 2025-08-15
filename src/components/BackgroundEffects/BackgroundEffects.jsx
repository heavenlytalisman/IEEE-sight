import React, { useRef, useEffect } from 'react';
import './BackgroundEffects.scss';

const BackgroundEffects = () => {
  const canvasRef = useRef();
  const shapesRef = useRef([]);

  // IEEE brand colors for particles and effects
  const ieeeColors = {
    blue: '#00629B',
    darkBlue: '#004976',
    lightBlue: '#0099CC',
    green: '#00843D',
    orange: '#E87722'
  };

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 200 : 500;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.7 ? ieeeColors.orange : '#ffffff'
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
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
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
  }, []);

  // Moving text background (from your original)
  const movingTexts = [
    'IEEE SIGHT',
    'HUMANITARIAN TECHNOLOGY',
    'SUSTAINABLE DEVELOPMENT',
    'COMMUNITY IMPACT',
    'INNOVATION FOR GOOD',
    'TECHNOLOGY FOR HUMANITY',
    'GLOBAL NETWORK',
    'ENGINEERING SOLUTIONS'
  ];

  // Parallax shapes
  const shapes = [
    { 
      svg: `<svg width="200" height="200"><circle cx="100" cy="100" r="80" fill="rgba(0, 98, 155, 0.1)"/></svg>`,
      style: { top: '20%', left: '10%' },
      depth: 0.8
    },
    { 
      svg: `<svg width="150" height="150"><rect width="150" height="150" rx="75" fill="rgba(232, 119, 34, 0.08)"/></svg>`,
      style: { top: '60%', right: '15%' },
      depth: 0.6
    },
    { 
      svg: `<svg width="120" height="120"><polygon points="60,10 110,90 10,90" fill="rgba(0, 132, 61, 0.1)"/></svg>`,
      style: { bottom: '30%', left: '70%' },
      depth: 0.4
    }
  ];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          const depth = shapes[index].depth;
          const translateX = moveX * depth * 30;
          const translateY = moveY * depth * 30;
          shape.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="background-effects">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      {/* Moving text background from your original design */}
      <div className="text-background">
        {movingTexts.slice(0, window.innerWidth <= 768 ? 4 : 8).map((text, index) => (
          <div 
            key={index}
            className={`moving-text ${index > 5 ? 'vertical' : ''}`}
            style={{ 
              '--duration': `${25 + index * 5}s`,
              animationDelay: `${-index * 3}s`
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="gradient-overlay" />
      
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={el => shapesRef.current[index] = el}
          className="parallax-shape"
          style={shape.style}
          dangerouslySetInnerHTML={{ __html: shape.svg }}
        />
      ))}
      
      <div className="glow-effect" />
    </div>
  );
};

export default BackgroundEffects;
