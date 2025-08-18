import React, { useEffect, useState, useRef } from 'react';
import './Hero.scss';

const Hero = () => {
  const fullTextLine1 = "Technology for";
  const fullTextLine2 = "Humanitarian Impact";
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0]);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const animationRef = useRef(null);

  // Typed heading animation
  useEffect(() => {
    let idx1 = 0, idx2 = 0, typingPhase = 1;
    let timer;
    function type() {
      if (typingPhase === 1 && idx1 < fullTextLine1.length) {
        setLine1(fullTextLine1.slice(0, idx1 + 1));
        idx1++; return;
      }
      if (typingPhase === 1 && idx1 >= fullTextLine1.length) typingPhase = 2;
      if (typingPhase === 2 && idx2 < fullTextLine2.length) {
        setLine2(fullTextLine2.slice(0, idx2 + 1));
        idx2++; return;
      }
      if (typingPhase === 2 && idx2 === fullTextLine2.length) {
        setIsComplete(true);
        clearInterval(timer);
        setTimeout(() => {
          setShowCursor(false);
          animateStats();
        }, 1000);
      }
    }
    timer = setInterval(type, 80);
    return () => clearInterval(timer);
  }, []);

  // Blink cursor
  useEffect(() => {
    if (!showCursor) return;
    const cursorTimer = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(cursorTimer);
  }, [showCursor]);

  // Animated statistics counter
  const animateStats = () => {
    const targets = [50, 15, 1000], duration = 2000, steps = 60;
    targets.forEach((target, index) => {
      let current = 0, increment = target / steps, step = 0;
      const timer = setInterval(() => {
        current += increment; step++;
        if (step >= steps || current >= target) { current = target; clearInterval(timer); }
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
    const particles = [];
    const mouse = { x: -1000, y: -1000 };

    class HumanitarianParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 2.5;
        this.baseOpacity = Math.random() * 0.2 + 0.35;
        this.opacity = this.baseOpacity;
        this.color = this.getHumanitarianColor();
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.type = Math.floor(Math.random() * 4);
      }

      getHumanitarianColor() {
        const colors = [
          'rgba(0, 98, 155, 0.8)',
          'rgba(245, 152, 58, 0.8)',
          'rgba(74, 144, 226, 0.7)',
          'rgba(26, 132, 191, 0.8)',
          'rgba(255, 152, 0, 0.6)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
        this.pulsePhase += this.pulseSpeed;
        this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 1.0;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Enhanced interactivity - stronger attraction to mouse
        if (distance < 120) {
          const force = (120 - distance) / 120;
          this.vx += dx * force * 0.004; // Increased from 0.002 for more responsiveness
          this.vy += dy * force * 0.004;
          this.opacity = Math.min(0.95, this.baseOpacity + force * 0.7);
        } else {
          this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        if (this.type === 0) this.drawHeart();
        else if (this.type === 1) this.drawLeaf();
        else if (this.type === 2) this.drawWaterDrop();
        else {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      drawHeart() {
        ctx.fillStyle = 'rgba(245, 152, 58, 0.7)';
        ctx.beginPath();
        const size = this.currentRadius * 0.8;
        ctx.moveTo(this.x, this.y + size / 2);
        ctx.bezierCurveTo(this.x - size, this.y - size / 2, this.x - size * 2, this.y + size / 3, this.x, this.y + size * 1.5);
        ctx.bezierCurveTo(this.x + size * 2, this.y + size / 3, this.x + size, this.y - size / 2, this.x, this.y + size / 2);
        ctx.fill();
      }

      drawLeaf() {
        ctx.fillStyle = 'rgba(26, 132, 191, 0.7)';
        ctx.beginPath();
        const size = this.currentRadius;
        ctx.ellipse(this.x, this.y, size * 1.5, size * 0.8, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      }

      drawWaterDrop() {
        ctx.fillStyle = 'rgba(0, 98, 155, 0.7)';
        ctx.beginPath();
        const size = this.currentRadius;
        ctx.arc(this.x, this.y + size / 2, size, 0, Math.PI, false);
        ctx.bezierCurveTo(this.x - size, this.y + size / 2, this.x - size / 2, this.y - size, this.x, this.y - size);
        ctx.bezierCurveTo(this.x + size / 2, this.y - size, this.x + size, this.y + size / 2, this.x + size, this.y + size / 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new HumanitarianParticle());

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Click burst effect - particles explode away from click
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      particles.forEach(particle => {
        const dx = particle.x - mx;
        const dy = particle.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 120) { // Burst effect for nearby particles
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * 2;
          particle.vy += Math.sin(angle) * 2;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Inter-particle connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.5;
            ctx.strokeStyle = `rgba(0, 98, 155, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Mouse connection lines
      particles.forEach(particle => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 130) {
          const opacity = (130 - distance) / 130 * 0.6;
          ctx.strokeStyle = `rgba(245, 152, 58, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="interactive-canvas" />
      <div className="humanitarian-icons">
        <div className="floating-icon" style={{ top: '15%', left: '10%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg education">
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <path d="M2 12h20" stroke="var(--primary-color)" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="floating-icon" style={{ top: '25%', right: '15%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg infrastructure">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="var(--sight-orange)" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3" fill="var(--sight-orange)" opacity="0.3"/>
          </svg>
        </div>
        <div className="floating-icon" style={{ bottom: '35%', left: '8%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg health">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="2" fill="var(--accent-primary)"/>
          </svg>
        </div>
        <div className="floating-icon" style={{ top: '45%', right: '20%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg education">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="none" stroke="var(--primary-color)" strokeWidth="1.5"/>
            <circle cx="12" cy="8" r="2" fill="var(--primary-color)" opacity="0.5"/>
          </svg>
        </div>
        <div className="floating-icon" style={{ bottom: '20%', right: '10%' }}>
          <svg viewBox="0 0 24 24" className="icon-svg infrastructure">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="none" stroke="var(--sight-orange)" strokeWidth="1.5"/>
            <circle cx="12" cy="14" r="2" fill="var(--sight-orange)" opacity="0.4"/>
          </svg>
        </div>
      </div>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content reveal-up">
            <h1 className="typing-text">
              <span>{line1}</span>
              <br />
              <span className={isComplete ? "highlight glow-effect" : ""}>{line2}</span>
              {showCursor && <span className="cursor pulse-cursor">|</span>}
            </h1>
            <p className="lead reveal-up delay-1 fade-in-up">
              A global network of IEEE volunteers partnering with underserved communities to leverage technology for sustainable development.
            </p>
            <div className="hero-stats reveal-up delay-2">
              <div className="stat stat-animate">
                <span className="stat-number count-up">{animatedStats[0]}+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat stat-animate">
                <span className="stat-number count-up">{animatedStats[1]}+</span>
                <span className="stat-label">Community Projects</span>
              </div>
              <div className="stat stat-animate">
                <span className="stat-number count-up">{animatedStats[2]}+</span>
                <span className="stat-label">Lives Impacted</span>
              </div>
            </div>
            <div className="hero-ctas reveal-up delay-3">
              <a href="#activities" className="btn primary pulse-btn hover-lift"><span>View Activities</span></a>
              <a href="#about" className="btn secondary hover-slide"><span>Learn More</span></a>
            </div>
          </div>
        </div>
      </div>
      <svg
        id="interactive-graphic"
        viewBox="0 0 500 400"
        className="interactive-svg floating-animation"
        ref={svgRef}
      >
        <path className="arc arc-1" d="M 50 200 Q 150 100 250 200 T 450 200" stroke="var(--primary-color)" />
        <path className="arc arc-2" d="M 100 150 Q 200 50 300 150 T 400 150" stroke="var(--accent-primary)" />
        <path className="arc arc-3" d="M 75 250 Q 175 350 275 250 T 425 250" stroke="var(--sight-orange)" />
        <circle className="node node-1" cx="100" cy="200" r="6" fill="var(--accent-primary)" />
        <circle className="node node-2" cx="200" cy="150" r="6" fill="var(--primary-color)" />
        <circle className="node node-3" cx="300" cy="200" r="6" fill="var(--sight-orange)" />
        <circle className="node node-4" cx="400" cy="180" r="6" fill="var(--accent-primary)" />
        <circle className="node node-5" cx="150" cy="250" r="6" fill="var(--secondary-color)" />
        <circle className="node node-6" cx="350" cy="220" r="6" fill="var(--primary-color)" />
      </svg>
    </section>
  );
};

export default Hero;
