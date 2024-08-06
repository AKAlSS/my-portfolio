'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <nav>
        <ul className="nav-list">
          <li><Link href="#hero" className="nav-link">Home</Link></li>
          <li><Link href="#services" className="nav-link">Services</Link></li>
          <li><Link href="#projects" className="nav-link">Projects</Link></li>
          <li><Link href="#about" className="nav-link">About</Link></li>
          <li><Link href="#contact" className="nav-link">Contact</Link></li>
          <li><a href="/path-to-your-cv.pdf" download className="nav-link cv-link">CV</a></li>
        </ul>
      </nav>
    </header>
  );
}