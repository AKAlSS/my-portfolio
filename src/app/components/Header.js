'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <nav className="nav-container">
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="logo">
          <Link href="#hero">AK</Link>
        </div>
        <a href="/path-to-your-cv.pdf" download className="cv-button">CV</a>
        <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><Link href="#hero" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link href="#services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
          <li><Link href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
          <li><Link href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          <li><Link href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}