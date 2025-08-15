import React, { useState, useEffect } from 'react';
import './Header.scss';

// Import your logos
import ieeeLogo from '../../assets/images/IEEElogo.png';
import sightLogo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoErrors, setLogoErrors] = useState({ ieee: false, sight: false });

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#committee', label: 'Committee', id: 'committee' },
    { href: '#activities', label: 'Activities', id: 'activities' },
    { href: '#achievements', label: 'Achievements', id: 'achievements' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  // Enhanced scroll tracking
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const homeSection = document.getElementById('home');
          
          if (homeSection) {
            const heroHeight = homeSection.offsetHeight;
            const transitionPoint = heroHeight * 0.8;
            setIsScrolled(window.scrollY > transitionPoint);
          } else {
            setIsScrolled(window.scrollY > 300);
          }

          // Active section detection
          const sections = navItems.map(item => ({
            id: item.id,
            element: document.getElementById(item.id)
          })).filter(section => section.element);

          let currentSection = 'home';
          
          for (const section of sections) {
            const rect = section.element.getBoundingClientRect();
            if (rect.top <= 100 && rect.top + rect.height > 100) {
              currentSection = section.id;
            }
          }

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, sectionId) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleLogoError = (logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: true }));
  };

  const handleLogoLoad = (logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: false }));
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div 
          className="branding" 
          onClick={() => handleNavClick('#home', 'home')}
        >
          <div className="logos-container">
            {/* IEEE Logo */}
            <div className="logo-wrapper">
              {!logoErrors.ieee ? (
                <img 
                  src={ieeeLogo} 
                  alt="IEEE Logo" 
                  className="logo ieee-logo"
                  onLoad={() => handleLogoLoad('ieee')}
                  onError={() => handleLogoError('ieee')}
                />
              ) : (
                <div className="logo-fallback ieee-fallback">IEEE</div>
              )}
            </div>

            {/* Minimal Logo Separator */}
            <div className="logo-separator" aria-hidden="true" />

            {/* SIGHT Logo */}
            <div className="logo-wrapper">
              {!logoErrors.sight ? (
                <img 
                  src={sightLogo} 
                  alt="SIGHT Logo" 
                  className="logo sight-logo"
                  onLoad={() => handleLogoLoad('sight')}
                  onError={() => handleLogoError('sight')}
                />
              ) : (
                <div className="logo-fallback sight-fallback">SIGHT</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick(item.href, item.id); 
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
