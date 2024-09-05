'use client'

import { useRef, useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Parallax } from 'react-scroll-parallax';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="loading">Loading 3D model...</div>
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                          || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className={`spline-container ${isMobile ? 'mobile' : 'desktop'}`}>
        <Suspense fallback={<div className="loading">Loading 3D model...</div>}>
          <Spline
            scene={isMobile 
              ? "https://prod.spline.design/r5pk6y7R59Afv5Ml/scene.splinecode"
              : "https://prod.spline.design/aMcJqKwiEiI8NQ0W/scene.splinecode"}
            className={`spline-viewer ${isMobile ? 'mobile' : 'desktop'}`}
          />
        </Suspense>
      </div>
      <Parallax translateY={[-10, 10]}>
        <div className="hero-content">
          {/* Add your hero content here if needed */}
        </div>
      </Parallax>
      <div className="scroll-indicator">&darr;</div>
    </section>
  );
}