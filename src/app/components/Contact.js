'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaClock } from 'react-icons/fa';

export default function Contact() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-item">
          <FaEnvelope className="footer-icon" />
          <a href="mailto:ahmadkkaiss@gmail.com">ahmadkkaiss@gmail.com</a>
        </div>
        <div className="footer-item">
          <FaGithub className="footer-icon" />
          <a href="https://github.com/AKAlSS" target="_blank" rel="noopener noreferrer">github.com/AKAlSS</a>
        </div>
        <div className="footer-item">
          <FaClock className="footer-icon" />
          <span>{time}</span>
        </div>
      </div>
      <div className="copyright">© 2023 Ahmad Kaiss. All rights reserved.</div>
    </footer>
  );
}