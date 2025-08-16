import React, { useEffect, useState, useRef } from 'react';
import './Hero.scss';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Technology for Humanitarian Impact";
  const [showCursor, setShowCursor] = useState(true);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0]);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const animationRef = useRef(null);

  // Enhanced typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowCursor(false);
          animateStats();
        }, 1000);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Cursor blinking
  useEffect(() => {
    if (!showCursor) return;
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, [showCursor]);

  // Animated statistics counter
  const animateStats = () => {
    const targets = [50, 15, 1000];
    const duration = 2000;
    const steps = 60;
    
    targets.forEach((target, index) => {
      let current = 0;
      const increment = target / steps;
      let step = 0;
      
      const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps || current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, duration / steps);
    });
  };

  // Interactive Canvas Animation System for Humanitarian Technology
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Humanitarian-focused particle system
    const particles = [];
    const mouse = { x: 0, y: 0 };

    class HumanitarianParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.color = this.getHumanitarianColor();
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.type = Math.floor(Math.random() * 4); // Different humanitarian symbols
      }

      getHumanitarianColor() {
        const colors = [
          'rgba(0, 98, 155, 0.6)',    // IEEE Blue - Technology
          'rgba(0, 132, 61, 0.6)',   // IEEE Green - Sustainability
          'rgba(74, 144, 226, 0.5)',  // Hope Blue - Clean Water
          'rgba(46, 125, 50, 0.6)',   // Life Green - Health/Environment
          'rgba(255, 152, 0, 0.4)'    // Warm Orange - Community
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Gentle movement
        this.x += this.vx;
        this.y += this.vy;

        // Boundary collision with soft bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;

        // Keep particles within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Gentle pulsing effect
        this.pulsePhase += this.pulseSpeed;
        this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 0.5;

        // Subtle mouse interaction for humanitarian connection
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          this.vx += dx * force * 0.0005;
          this.vy += dy * force * 0.0005;
          this.opacity = Math.min(0.8, this.opacity + force * 0.3);
        } else {
          this.opacity = Math.max(0.3, this.opacity - 0.005);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Draw humanitarian-themed particles
        if (this.type === 0) {
          // Heart symbol for humanitarian aid
          this.drawHeart();
        } else if (this.type === 1) {
          // Leaf symbol for sustainability
          this.drawLeaf();
        } else if (this.type === 2) {
          // Water droplet for clean water initiatives
          this.drawWaterDrop();
        } else {
          // Simple circle for general connectivity
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }

      drawHeart() {
        ctx.fillStyle = 'rgba(244, 67, 54, 0.5)'; // Red for humanitarian aid
        ctx.beginPath();
        const size = this.currentRadius * 0.8;
        ctx.moveTo(this.x, this.y + size / 2);
        ctx.bezierCurveTo(this.x - size, this.y - size / 2, this.x - size * 2, this.y + size / 3, this.x, this.y + size * 1.5);
        ctx.bezierCurveTo(this.x + size * 2, this.y + size / 3, this.x + size, this.y - size / 2, this.x, this.y + size / 2);
        ctx.fill();
      }

      drawLeaf() {
        ctx.fillStyle = 'rgba(76, 175, 80, 0.5)'; // Green for sustainability
        ctx.beginPath();
        const size = this.currentRadius;
        ctx.ellipse(this.x, this.y, size * 1.5, size * 0.8, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      drawWaterDrop() {
        ctx.fillStyle = 'rgba(33, 150, 243, 0.5)'; // Blue for water
        ctx.beginPath();
        const size = this.currentRadius;
        ctx.arc(this.x, this.y + size / 2, size, 0, Math.PI, false);
        ctx.bezierCurveTo(this.x - size, this.y + size / 2, this.x - size / 2, this.y - size, this.x, this.y - size);
        ctx.bezierCurveTo(this.x + size / 2, this.y - size, this.x + size, this.y + size / 2, this.x + size, this.y + size / 2);
        ctx.fill();
      }
    }

    // Create humanitarian particles
    for (let i = 0; i < 60; i++) {
      particles.push(new HumanitarianParticle());
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw gentle connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.2;
            ctx.strokeStyle = `rgba(0, 98, 155, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle connections to mouse (representing human interaction)
      particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = (130 - distance) / 130 * 0.3;
          ctx.strokeStyle = `rgba(0, 132, 61, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Interactive Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="interactive-canvas"
      />

      {/* Humanitarian Technology SVG Icons */}
      <div className="humanitarian-icons">
        {/* Global Connectivity Icon */}
        <div className="floating-icon" style={{ top: '15%', left: '10%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <path d="M2 12h20" stroke="var(--primary-color)" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Clean Energy Icon */}
        <div className="floating-icon" style={{ top: '25%', right: '15%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="var(--sight-green)" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3" fill="var(--sight-green)" opacity="0.3"/>
          </svg>
        </div>

        {/* Healthcare Icon */}
        <div className="floating-icon" style={{ bottom: '35%', left: '8%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="2" fill="var(--accent-primary)"/>
          </svg>
        </div>

        {/* Education Icon */}
        <div className="floating-icon" style={{ top: '45%', right: '20%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"/>
            <circle cx="12" cy="8" r="2" fill="var(--text-secondary)" opacity="0.5"/>
          </svg>
        </div>

        {/* Water/Sanitation Icon */}
        <div className="floating-icon" style={{ bottom: '20%', right: '10%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5"/>
            <circle cx="12" cy="14" r="2" fill="var(--accent-primary)" opacity="0.4"/>
          </svg>
        </div>
      </div>

      <div className="container">
        <div className="hero-inner">
          <div className="hero-content reveal-up">
            <h1 className="typing-text">
              {typedText.includes('Impact') ? (
                <>
                  Technology for<br />
                  Humanitarian <span className="highlight glow-effect">Impact</span>
                </>
              ) : (
                <>
                  {typedText}
                  {showCursor && <span className="cursor pulse-cursor">|</span>}
                </>
              )}
            </h1>
            
            <p className="lead reveal-up delay-1 fade-in-up">
              A global network of IEEE volunteers partnering with underserved communities to leverage technology for sustainable development.
            </p>
            
            <div className="hero-stats reveal-up delay-2">
              <div className="stat stat-animate">
                <span className="stat-number count-up">
                  {animatedStats[0]}+
                </span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat stat-animate">
                <span className="stat-number count-up">
                  {animatedStats[1]}+
                </span>
                <span className="stat-label">Community Projects</span>
              </div>
              <div className="stat stat-animate">
                <span className="stat-number count-up">
                  {animatedStats[2]}+
                </span>
                <span className="stat-label">Lives Impacted</span>
              </div>
            </div>
            
            <div className="hero-ctas reveal-up delay-3">
              <a href="#activities" className="btn primary pulse-btn hover-lift">
                <span>View Activities</span>
              </a>
              <a href="#about" className="btn secondary hover-slide">
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Interactive SVG Network */}
      <svg 
        id="interactive-graphic" 
        viewBox="0 0 500 400" 
        className="interactive-svg floating-animation"
        ref={svgRef}
      >
        {/* Network connections representing global humanitarian network */}
        <path 
          className="arc arc-1" 
          d="M 50 200 Q 150 100 250 200 T 450 200" 
          stroke="var(--primary-color)"
        />
        <path 
          className="arc arc-2" 
          d="M 100 150 Q 200 50 300 150 T 400 150" 
          stroke="var(--accent-primary)"
        />
        <path 
          className="arc arc-3" 
          d="M 75 250 Q 175 350 275 250 T 425 250" 
          stroke="var(--sight-green)"
        />
        
        {/* Humanitarian technology nodes */}
        <circle className="node node-1" cx="100" cy="200" r="6" fill="var(--primary-color)" />
        <circle className="node node-2" cx="200" cy="150" r="6" fill="var(--accent-primary)" />
        <circle className="node node-3" cx="300" cy="200" r="6" fill="var(--sight-green)" />
        <circle className="node node-4" cx="400" cy="180" r="6" fill="var(--text-secondary)" />
        <circle className="node node-5" cx="150" cy="250" r="6" fill="var(--sight-green)" />
        <circle className="node node-6" cx="350" cy="220" r="6" fill="var(--primary-color)" />
      </svg>
    </section>
  );
};

export default Hero;
