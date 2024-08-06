'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaFileDownload, FaClock } from 'react-icons/fa';

export default function Footer() {
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
        <a href="mailto:ahmadkkaiss@gmail.com" className="footer-item">
          <FaEnvelope className="footer-icon" />
          <span>ahmadkkaiss@gmail.com</span>
        </a>
        <a href="https://github.com/AKAlSS" target="_blank" rel="noopener noreferrer" className="footer-item">
          <FaGithub className="footer-icon" />
          <span>github.com/AKAlSS</span>
        </a>
        <a href="/path-to-your-cv.pdf" download className="footer-item">
          <FaFileDownload className="footer-icon" />
          <span>Download CV</span>
        </a>
        <div className="footer-item">
          <FaClock className="footer-icon" />
          <span>Open for work | {time} EST</span>
        </div>
      </div>
      <div className="copyright">© 2023 Ahmad Kaiss. All rights reserved.</div>
    </footer>
  );
}