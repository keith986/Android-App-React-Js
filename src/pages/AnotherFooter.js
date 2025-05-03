import React from 'react';
import { Link } from 'react-router-dom';
import * as icons from 'react-bootstrap-icons';
import './AnotherFooter.css';

const AnotherFooter = () => {
  return (
    <div className="footers">
      <div className="footer-containers">
        <div className="footer-section"> 
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/support">Contact Us</Link></li>
            <li><Link to="/FAQs">FAQs</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@onlinestore.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 E-commerce St, Online City</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><icons.Facebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><icons.Twitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><icons.Instagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><icons.Linkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OnlineStore. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AnotherFooter;