import React, { useState, useEffect } from 'react';
import './Header.scss';

// Import your logo (adjust path as needed)
import ieeelogo from '../../assets/images/IEEElogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#committee', label: 'Committee', id: 'committee' },
    { href: '#activities', label: 'Activities', id: 'activities' },
    { href: '#achievements', label: 'Achievements', id: 'achievements' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  // Optimized scroll tracking with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);

          // Find active section
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
      const headerOffset = 80;
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

  // Debug logo loading
  const handleLogoLoad = () => {
    console.log('✅ IEEE logo loaded successfully');
    setLogoError(false);
  };

  const handleLogoError = () => {
    console.error('❌ IEEE logo failed to load');
    setLogoError(true);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a 
          href="#home" 
          className="branding" 
          onClick={(e) => { 
            e.preventDefault(); 
            handleNavClick('#home', 'home'); 
          }}
        >
          <div className="logo-placeholder">
            {!logoError ? (
              <img 
                src={ieeelogo} 
                alt="IEEE Logo" 
                className="logo ieee-master-logo"
                onLoad={handleLogoLoad}
                onError={handleLogoError}
              />
            ) : (
              <div className="logo-fallback">IEEE</div>
            )}
          </div>
          <span className="logo-seperator">|</span>
          <span className="site-title">SIGHT</span>
        </a>
        
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
