import React, { useEffect, useState, useRef } from 'react';
import './BackgroundEffects.scss';

const BackgroundEffects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // Detect reduced motion and load state
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    setIsReduced(mediaQuery.matches || isMobile);

    const handleChange = () => setIsReduced(
      mediaQuery.matches || window.innerWidth < 768
    );
    
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);
    
    setTimeout(() => setIsLoaded(true), 200);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  // Minimal mouse tracking for subtle interactivity
  useEffect(() => {
    if (isReduced) return;

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReduced]);

  // Simple section detection and scroll tracking
  useEffect(() => {
    if (isReduced) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Minimal section detection
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      if (scrollPercent < 0.15) setCurrentSection('hero');
      else if (scrollPercent < 0.35) setCurrentSection('about');
      else if (scrollPercent < 0.55) setCurrentSection('executive');
      else if (scrollPercent < 0.75) setCurrentSection('activities');
      else setCurrentSection('achievements');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReduced]);

  if (isReduced) {
    return (
      <div className="background-effects reduced">
        <div className="simple-bg" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`background-effects ${isLoaded ? 'loaded' : ''} section-${currentSection}`}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        '--scroll-progress': Math.min(scrollY / 1000, 1)
      }}
    >
      {/* Subtle IEEE SIGHT branded gradient */}
      <div className="humanitarian-gradient" />
      
      {/* Minimal floating tech elements */}
      <div className="tech-elements">
        <div className="tech-dot tech-dot-1" />
        <div className="tech-dot tech-dot-2" />
        <div className="tech-dot tech-dot-3" />
        <div className="tech-connection tech-connection-1" />
        <div className="tech-connection tech-connection-2" />
      </div>

      {/* Subtle wave for activities/achievements sections */}
      {['activities', 'achievements'].includes(currentSection) && (
        <svg className="minimal-wave" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(26, 132, 191, 0.1)" />
              <stop offset="50%" stopColor="rgba(245, 152, 58, 0.08)" />
              <stop offset="100%" stopColor="rgba(26, 132, 191, 0.1)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,50 Q300,20 600,40 Q900,60 1200,30 L1200,100 L0,100 Z" 
            fill="url(#waveGradient)"
          />
        </svg>
      )}

      {/* Humanitarian impact overlay for hero */}
      {currentSection === 'hero' && (
        <div className="impact-overlay">
          <div className="impact-circle impact-circle-1" />
          <div className="impact-circle impact-circle-2" />
        </div>
      )}
    </div>
  );
};

export default BackgroundEffects;
