'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleNavigation = (e, id) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <nav className="nav-container">
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="logo">
          <Link href="/">AK</Link>
        </div>
        <div className={`nav-list-container ${isMobileMenuOpen ? 'mobile-open' : ''}`} ref={mobileMenuRef}>
          <ul className="nav-list">
            <li><a href="#services" onClick={(e) => handleNavigation(e, 'services')} className="nav-link">Services</a></li>
            <li><a href="#project-showcase-slider" onClick={(e) => handleNavigation(e, 'project-showcase-slider')} className="nav-link">Projects</a></li>
            <li><a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="nav-link">About</a></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
            <li><a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="nav-link">Contact</a></li>
          </ul>
        </div>
        <a href="/Ahmad_Kaiss_Resume.pdf" download className="cv-button">CV</a>
      </nav>
    </header>
  );
}