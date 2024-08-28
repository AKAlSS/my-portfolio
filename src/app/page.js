"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'));
const Projects = dynamic(() => import('@/components/Projects'));
const About = dynamic(() => import('@/components/About'));
const Contact = dynamic(() => import('@/components/Contact'));

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadingComplete = () => {
    console.log('Preloader complete');
    setLoading(false);
    setTimeout(() => {
      console.log('Setting content visible');
      setContentVisible(true);
    }, 100);
  };

  useEffect(() => {
    console.log('Home component mounted');
    const timeout = setTimeout(() => {
      console.log('Failsafe timeout triggered');
      setLoading(false);
      setContentVisible(true);
    }, 8000);

    return () => {
      clearTimeout(timeout);
      console.log('Home component unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('Content visible:', contentVisible);
  }, [contentVisible]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {contentVisible && (
        <>
          <Header />
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
        </>
      )}
    </main>
  );
}