import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>We are a leading company providing innovative solutions to our customers worldwide.</p>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p><FaPhone /> +1 (123) 456-7890</p>
            <p><FaEnvelope /> info@company.com</p>
          </div>
         <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
