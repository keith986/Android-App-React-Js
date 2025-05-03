import React from 'react';
import './TermsAndConditions.css';
import Header from './Header';
import SearchBar from './SearchBar';
import AnotherFooter from './AnotherFooter'

const TermsAndConditions = () => {
  return ( 
    <div className="terms-page">
      <Header />
      <SearchBar />
      <div className="terms-content">
        <h1 className="terms-title">Terms and Conditions</h1>
        <p>
          Welcome to our online store. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>
        <h2>1. General</h2>
        <p>
          These terms and conditions govern your use of our website and services. By using our website, you accept these terms in full. If you disagree with any part of these terms, you must not use our website.
        </p>
        <h2>2. Products and Pricing</h2>
        <p>
          All prices are listed in USD and are subject to change without notice. We reserve the right to modify or discontinue products at any time without prior notice.
        </p>
        <h2>3. Orders and Payments</h2>
        <p>
          By placing an order, you agree to provide accurate and complete information. Payment must be made at the time of purchase. We accept Visa, MasterCard, PayPal, and other major payment methods.
        </p>
        <h2>4. Shipping and Returns</h2>
        <p>
          Shipping times are estimates and may vary. Returns are accepted within 30 days of purchase, provided the item is in its original condition. Refunds will be processed within 7 business days.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          We are not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
        </p>
        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms and conditions at any time. Changes will be effective immediately upon posting on our website.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these terms, please contact us at support@onlinestore.com.
        </p>
      </div>
      <AnotherFooter />
    </div>
  );
};

export default TermsAndConditions;