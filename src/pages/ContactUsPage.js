import React from 'react';
import './ContactUsPage.css';
import Header from './Header';
import SearchBar from './SearchBar';
import * as icons from 'react-bootstrap-icons';
import AnotherFooter from './AnotherFooter'

const ContactUsPage = () => {
  return (
    <div className='contact-page' style={{ padding: '0px', fontFamily: 'Arial, sans-serif' }}>
       <Header/>
       <SearchBar/> 
      <div>
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>

      <h3>WhatsApp</h3>
      <p>
        <a
          href="https://wa.me/1234567890" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: '#25D366' }}
        >
        <icons.Whatsapp /> Chat with us on WhatsApp
        </a>
      </p>

      <h3>Follow Us on Social Media</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <a
            href="https://facebook.com/yourpage" // Replace with your Facebook page URL
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#4267B2' }}
          >
            <icons.Facebook /> Facebook
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/yourprofile" // Replace with your Instagram profile URL
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#C13584' }}
          >
           <icons.Instagram /> Instagram
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/yourhandle" // Replace with your Twitter handle URL
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#1DA1F2' }}
          >
           <icons.Twitter /> Twitter
          </a>
        </li>
      </ul>

      <h3>Email</h3>
      <p>
        <a
          href="mailto:support@yourstore.com" // Replace with your support email
          style={{ textDecoration: 'none', color: '#000' }}
        >
          <icons.EnvelopePaper /> support@yourstore.com
        </a>
      </p>
      </div>

      <AnotherFooter />
    </div>
  );
};

export default ContactUsPage;