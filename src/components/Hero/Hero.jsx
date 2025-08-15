import React, { useEffect, useState } from 'react';
import './Hero.scss';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Technology for Humanitarian Impact";
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;
    
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [showCursor]);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content reveal-up">
            <h1 className="typing-text">
              {typedText.includes('Impact') ? (
                <>
                  Technology for<br />
                  Humanitarian <span className="highlight">Impact</span>
                </>
              ) : (
                <>
                  {typedText}
                  {showCursor && <span className="cursor">|</span>}
                </>
              )}
            </h1>
            
            <p className="lead reveal-up delay-1">
              A global network of IEEE volunteers partnering with underserved communities to leverage technology for sustainable development.
            </p>
            
            <div className="hero-stats reveal-up delay-2">
              <div className="stat">
                <span className="stat-number" data-count="0">50+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-count="0">15+</span>
                <span className="stat-label">Community Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number" data-count="0">1000+</span>
                <span className="stat-label">Lives Impacted</span>
              </div>
            </div>
            
            <div className="hero-ctas reveal-up delay-3">
              <a href="#activities" className="btn primary pulse">
                View Activities
              </a>
              <a href="#about" className="btn secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive SVG */}
      <svg id="interactive-graphic" viewBox="0 0 400 300" className="interactive-svg">
        <path className="arc" d="M 50 150 A 100 100 0 0 1 250 150" stroke="#00629B" />
        <path className="arc" d="M 100 100 A 50 50 0 0 1 200 100" stroke="#0099CC" />
        <path className="arc" d="M 150 200 A 75 75 0 0 1 300 200" stroke="#E87722" />
        <circle className="node" cx="75" cy="150" r="8" fill="#E87722" />
        <circle className="node" cx="150" cy="100" r="8" fill="#0099CC" />
        <circle className="node" cx="225" cy="150" r="8" fill="#00629B" />
        <circle className="node" cx="275" cy="200" r="8" fill="#00843D" />
      </svg>
    </section>
  );
};

export default Hero;
