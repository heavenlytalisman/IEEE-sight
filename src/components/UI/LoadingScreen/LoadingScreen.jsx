import React, { useState, useEffect } from 'react';
import './LoadingScreen.scss';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Simulate loading process - much shorter for development
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        // CRITICAL: Restore scrolling
        document.body.style.overflow = '';
        document.body.style.overflowX = 'hidden'; // Prevent horizontal scroll only
      }, 800);
    }, 1500); // Reduced from 2000 to 1500

    return () => {
      clearTimeout(timer);
      // Ensure scrolling is restored
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-background">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="loading-particle"></div>
        ))}
      </div>
      
      <div className="logo-animation">
        <img 
          src="/assets/images/IEEElogo.png"
          alt="IEEE Logo" 
          className="main-logo-loading"
          onLoad={() => console.log('✅ IEEE logo loaded')}
          onError={(e) => {
            console.warn('⚠️ IEEE logo failed to load, trying fallback');
            e.target.src = '/logo192.png'; // Fallback to React logo
          }}
        />
        <div className="logo-circle-animation">
          <div className="circle-ring"></div>
          <div className="circle-ring-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
