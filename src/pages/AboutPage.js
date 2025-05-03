import React from 'react';
import './AboutPage.css';
import Header from './Header';
import SearchBar from './SearchBar';
import AnotherFooter from './AnotherFooter'

const AboutPage = () => {
  return (
    <div className="about-page">
    <Header />
    <SearchBar/> 
      <div className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our journey, mission, and values.</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            Welcome to OnlineStore, your one-stop destination for all your shopping needs. 
            We are committed to providing you with the best products at competitive prices, 
            backed by exceptional customer service.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make online shopping easy, accessible, and enjoyable for everyone. 
            We strive to bring you a wide range of high-quality products while ensuring a seamless 
            shopping experience.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become the most trusted and customer-centric e-commerce platform, 
            empowering people to shop with confidence and convenience.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Customer Satisfaction: We put our customers first in everything we do.</li>
            <li>Integrity: We operate with honesty and transparency.</li>
            <li>Innovation: We continuously improve to meet your needs.</li>
            <li>Quality: We ensure the highest standards in our products and services.</li>
          </ul>
        </section>
      </div>
    <AnotherFooter />
    </div> 
  );
};

export default AboutPage;