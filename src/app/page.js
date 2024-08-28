"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import { Analytics } from "@vercel/analytics/react"

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'));
const Projects = dynamic(() => import('@/components/Projects'));
const About = dynamic(() => import('@/components/About'));
const Contact = dynamic(() => import('@/components/Contact'));

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>
      {!loading && (
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