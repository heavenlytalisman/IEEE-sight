import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="ieee-text">IEEE</span>
              <span className="sight-text">SIGHT</span>
            </div>
            <p>
              The Special Interest Group on Humanitarian Technology connects IEEE volunteers 
              globally to leverage technology for sustainable development and community impact.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#committee">Committee</a></li>
              <li><a href="#activities">Activities</a></li>
              <li><a href="#achievements">Achievements</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; {currentYear} IEEE SIGHT Chapter. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
