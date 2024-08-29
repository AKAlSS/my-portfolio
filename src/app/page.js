"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [initialLoad, setInitialLoad] = useState(true);
  const pathname = usePathname();

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  useEffect(() => {
    if (initialLoad) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setContentVisible(true);
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [initialLoad]);

  useEffect(() => {
    if (!initialLoad) {
      setContentVisible(true);
    }
  }, [pathname, initialLoad]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <AnimatePresence mode="wait">
        {loading && initialLoad && (
          <Preloader key="preloader" onLoadingComplete={() => {
            handleLoadingComplete();
            setInitialLoad(false);
          }} />
        )}
      </AnimatePresence>
      {contentVisible && (
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
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
        </motion.div>
      )}
    </main>
  );
}