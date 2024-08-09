'use client';

import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Parallax } from 'react-scroll-parallax';

export default function Hero() {
  const splineRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className={`spline-container ${isMobile ? 'mobile' : ''}`}>
        {isMobile ? (
          <Spline
            scene="https://prod.spline.design/r5pk6y7R59Afv5Ml/scene.splinecode"
            className="spline-viewer mobile"
          />
        ) : (
          <Spline
            ref={splineRef}
            scene="https://prod.spline.design/aMcJqKwiEiI8NQ0W/scene.splinecode"
            className="spline-viewer desktop"
          />
        )}
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