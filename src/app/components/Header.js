'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.classList.contains('mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        <div className={`nav-list-container ${isMobileMenuOpen ? 'mobile-open' : ''}`} ref={mobileMenuRef}>
          <ul className="nav-list">
            <li><Link href="#hero" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link href="#services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
            <li><Link href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
            <li><Link href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li><Link href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>
        <a href="/path-to-your-cv.pdf" download className="cv-button">CV</a>
      </nav>
    </header>
  );
}