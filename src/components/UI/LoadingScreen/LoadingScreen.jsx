import React, { useState, useEffect } from 'react';
import ieeeLogo from '../../../assets/images/IEEElogo.png';
import sightLogo from '../../../assets/images/logo.png';
import './LoadingScreen.scss';

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

        // Scroll to home section after loading
        const homeSection = document.getElementById('home');
        if (homeSection) {
          homeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  const handleLogoLoad = (logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: false }));
  };

  const handleLogoError = (logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: true }));
  };

  if (!isLoading) return null;

  return (
    <div className={`loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <div className="logo-animation">
        <div className="logos-container">
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
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
