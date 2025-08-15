import React, { useState, useEffect } from 'react';
import './LoadingScreen.scss';
import ieeelogo from '../../../assets/images/IEEElogo.png';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Simulate loading process
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        // IMPORTANT: Restore scrolling
        document.body.style.overflow = '';
        document.body.style.overflowX = 'hidden'; // Prevent horizontal scroll
      }, 800);
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Ensure scrolling is restored even if component unmounts
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-background">
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
      </div>
      
      <div className="logo-animation">
        <img 
          src={ieeelogo} 
          alt="IEEE Logo" 
          className="main-logo-loading"
          onLoad={() => console.log('IEEE logo loaded')}
          onError={() => console.warn('IEEE logo failed to load')}
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
