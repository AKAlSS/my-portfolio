'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaFigma, FaClock, FaRss } from 'react-icons/fa';
import Link from 'next/link';

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
          <FaFigma className="footer-icon" />
          <a href="https://www.figma.com/proto/7q9ajRGqtvywzJRGQwEPZj/Projects-Showcase?node-id=5-1102&starting-point-node-id=5%3A1102&hide-ui=1&t=QlvzIBPeKCo3QnRe-8" target="_blank" rel="noopener noreferrer">figma.com/ahmadkaiss</a>
        </div>
        <div className="footer-item">
          <FaClock className="footer-icon" />
          <span>{time}</span>
        </div>
        <div className="footer-item">
          <FaRss className="footer-icon" />
          <Link href="/blog">Blog & Newsletter</Link>
        </div>
        <div className="footer-item">
          <a href="/Ahmad_Kaiss_Resume.pdf" download className="cv-button">CV</a>
        </div>
      </div>
      <div className="copyright">© 2024 Ahmad Kaiss. All rights reserved.</div>
    </footer>
  );
}