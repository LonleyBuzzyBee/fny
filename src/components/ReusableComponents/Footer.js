import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/imgs/logoFNY.png';

const Footer = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-logo-section">
          <img src={logo} alt="Fresh New You Logo" className="footer-logo" />
          <span className="footer-brand-name">FRESH NEW YOU</span>
        </div>
        <div className="footer-subscribe-section">
          <p className="footer-subscribe-text">
            Subscribe to receive science-backed tips, access to special offers, and new innovations.
          </p>
          <form className="footer-email-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-email-input"
              required
            />
            <button type="submit" className="footer-email-submit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Middle Section - Links */}
      <div className="footer-links">
        <div className="footer-link-column">
          <h4 className="footer-link-title">Company</h4>
          <ul className="footer-link-list">
            <li><a href="#careers" className="footer-link">Careers</a></li>
            <li><a href="#about" className="footer-link">About</a></li>
          </ul>
        </div>
        <div className="footer-link-column">
          <h4 className="footer-link-title">Customer care</h4>
          <ul className="footer-link-list">
            <li><a href="#tracking" className="footer-link">Tracking a shipment</a></li>
            <li><a href="#faq" className="footer-link">FAQ</a></li>
            <li><a href="#contact" className="footer-link">Contact us</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <hr className="footer-divider" />
      <div className="footer-social">
        <h3 className="footer-social-title">Follow us on social</h3>
        <div className="footer-social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 Fresh New You. All rights reserved.</p>
        <div className="footer-legal-links">
          <a href="#privacy" className="footer-legal-link">Privacy policy</a>
          <a href="#terms" className="footer-legal-link">Terms & Conditions</a>
          <a href="#accessibility" className="footer-legal-link">Accessibility</a>
          <a href="#cookies" className="footer-legal-link">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

