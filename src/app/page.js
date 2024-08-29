"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import { usePathname } from 'next/navigation';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'));
const Projects = dynamic(() => import('@/components/Projects'));
const About = dynamic(() => import('@/components/About'));
const Contact = dynamic(() => import('@/components/Contact'));
const Newsletter = dynamic(() => import('@/components/Newsletter'));

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
      setContentVisible(true);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {contentVisible && (
        <>
          <Header />
          {pathname === '/blog' ? (
            <Newsletter />
          ) : (
            <>
              <Hero />
              <Services />
              <Projects />
              <About />
            </>
          )}
          <Contact />
        </>
      )}
    </main>
  );
}