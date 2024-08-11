"use client";  // This line makes the entire file a client component

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';
import Preloader from '@/components/Preloader';;

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Services = lazy(() => import('@/components/Services'));
const Projects = lazy(() => import('@/components/Projects'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time (you can adjust the time or make it dynamic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Matches the timing of the Preloader's phase

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Hero />
        <Suspense fallback={<div>Loading Services...</div>}>
          <Services />
        </Suspense>
        <Suspense fallback={<div>Loading Projects...</div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div>Loading About...</div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div>Loading Contact...</div>}>
          <Contact />
        </Suspense>
      </Suspense>
    </main>
  );
}
