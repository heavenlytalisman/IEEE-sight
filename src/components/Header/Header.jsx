import React, { useState, useEffect, useCallback } from 'react';
import './Header.scss';

// Import your logos
import ieeeLogo from '../../assets/images/IEEElogo.png';
import sightLogo from '../../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoErrors, setLogoErrors] = useState({ ieee: false, sight: false });
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#Execom', label: 'Execom', id: 'Execom' },
    { href: '#activities', label: 'Activities', id: 'activities' },
    { href: '#achievements', label: 'Achievements', id: 'achievements' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  // Enhanced scroll tracking - separate from section detection
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
          
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
    };

    const observerCallback = (entries) => {
      if (isNavigating) return;

      let maxRatio = 0;
      let activeId = 'home';

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (maxRatio < 0.1) {
        let closestDistance = Infinity;
        let closestId = 'home';

        navItems.forEach(item => {
          const element = document.getElementById(item.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestId = item.id;
            }
          }
        });

        activeId = closestId;
      }

      setActiveSection(activeId);
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToObserve = [];
    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
        elementsToObserve.push(element);
      }
    });

    return () => {
      elementsToObserve.forEach(element => {
        observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [isNavigating]);

  // Enhanced navigation with glitch prevention
  const handleNavClick = (href, sectionId) => {
    const element = document.querySelector(href);
    if (element) {
      setIsNavigating(true);
      
      const navbar = document.querySelector('.navbar');
      navbar?.classList.add('navigating');
      
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      setActiveSection(sectionId);
      setIsMenuOpen(false);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const scrollDuration = Math.min(Math.abs(offsetPosition - window.pageYOffset) / 2, 1000);
      
      setTimeout(() => {
        setIsNavigating(false);
        navbar?.classList.remove('navigating');
        
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
          }
        }, 100);
      }, scrollDuration);
    }
  };

  const handleLogoError = useCallback((logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: true }));
  }, []);

  const handleLogoLoad = useCallback((logoType) => {
    setLogoErrors(prev => ({ ...prev, [logoType]: false }));
  }, []);

  // Handle initial page load section detection
  useEffect(() => {
    const detectInitialSection = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace('#', '');
        const navItem = navItems.find(item => item.id === sectionId);
        if (navItem) {
          setActiveSection(sectionId);
          return;
        }
      }
      
      const scrollY = window.scrollY;
      if (scrollY < 100) {
        setActiveSection('home');
      }
    };

    detectInitialSection();
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace('#', '');
        const navItem = navItems.find(item => item.id === sectionId);
        if (navItem) {
          handleNavClick(hash, sectionId);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mobile menu accessibility and outside click handling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      const firstLink = document.querySelector('.nav-links a');
      firstLink?.focus();
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isNavigating ? 'navigating' : ''} ${isLoading ? 'loading' : ''}`}>
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

        {/* Mobile Menu Button - IEEE SB CEK Style */}
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon">
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
