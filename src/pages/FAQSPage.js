import React, { useState } from 'react';
import './FAQSPage.css';
import Header from './Header';
import SearchBar from './SearchBar';
import AnotherFooter from './AnotherFooter'

const FAQSPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'You can return any item within 30 days of purchase for a full refund.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping typically takes 5-7 business days.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Additional fees may apply.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking number via email.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, PayPal, and other major payment methods.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Header />
      <SearchBar />
      <div className="faq-content">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
      <AnotherFooter />
    </div>
  );
};

export default FAQSPage;