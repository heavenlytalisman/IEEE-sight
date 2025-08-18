import React from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone } from 'react-icons/hi';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#committee", label: "Committee" },
    { href: "#activities", label: "Activities" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="ieee-text">IEEE</span>
              <span className="sight-text">SIGHT</span>
            </div>
            <p>
              The Special Interest Group on Humanitarian Technology connects IEEE volunteers 
              globally to leverage technology for sustainable development and community impact.
            </p>
            <div className="contact-hint">
              <motion.a
                className="contact-link"
                href="mailto:sight@ieee-sbcek.org"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HiMail className="contact-icon" />
                sight@ieee-sbcek.org
              </motion.a>
              <motion.a
                className="contact-link"
                href="tel:+919876543210"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <HiPhone className="contact-icon" />
                +91 98765 43210
              </motion.a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="footer-legal">
            <p>&copy; {currentYear} IEEE SIGHT Chapter. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
