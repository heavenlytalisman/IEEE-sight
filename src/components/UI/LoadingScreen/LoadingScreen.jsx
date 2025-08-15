import React, { useState, useEffect } from 'react';
import './LoadingScreen.scss';

// Import both logos
import ieeeLogo from '../../../assets/images/IEEElogo.png';
import sightLogo from '../../../assets/images/logo.png';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoErrors, setLogoErrors] = useState({ ieee: false, sight: false });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
        document.body.style.overflowX = 'hidden';
      }, 600);
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  const handleLogoLoad = (logoType) => {
    console.log(`✅ Loading screen ${logoType} logo loaded successfully`);
    setLogoErrors(prev => ({ ...prev, [logoType]: false }));
  };

  const handleLogoError = (logoType) => {
    console.error(`❌ Loading screen ${logoType} logo failed to load`);
    setLogoErrors(prev => ({ ...prev, [logoType]: true }));
  };

  if (!isLoading) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-background">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="loading-particle"></div>
        ))}
      </div>
      
      <div className="logo-animation">
        <div className="logos-container">
          {/* IEEE Logo */}
          <div className="logo-wrapper">
            {!logoErrors.ieee ? (
              <img 
                src={ieeeLogo} 
                alt="IEEE Logo" 
                className="main-logo-loading ieee-logo-loading"
                onLoad={() => handleLogoLoad('ieee')}
                onError={() => handleLogoError('ieee')}
              />
            ) : (
              <div className="logo-text-loading ieee-text-loading">IEEE</div>
            )}
          </div>

          {/* SIGHT Logo */}
          <div className="logo-wrapper">
            {!logoErrors.sight ? (
              <img 
                src={sightLogo} 
                alt="SIGHT Logo" 
                className="main-logo-loading sight-logo-loading"
                onLoad={() => handleLogoLoad('sight')}
                onError={() => handleLogoError('sight')}
              />
            ) : (
              <div className="logo-text-loading sight-text-loading">SIGHT</div>
            )}
          </div>
        </div>
        
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
