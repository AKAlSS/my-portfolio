'use client';

import { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Parallax } from 'react-scroll-parallax';

export default function Hero() {
  const splineRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { current: spline } = splineRef;

    const handleMouseOver = e => {
      if (e.target.name === 'Button') {
        document.body.style.cursor = 'pointer';
      }
    };

    const handleMouseOut = e => {
      if (e.target.name === 'Button') {
        document.body.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      console.log('Button clicked');
    };

    if (spline) {
      spline.addEventListener('mouseover', handleMouseOver);
      spline.addEventListener('mouseout', handleMouseOut);
      spline.addEventListener('buttonClicked', handleClick);
      return () => {
        spline.removeEventListener('mouseover', handleMouseOver);
        spline.removeEventListener('mouseout', handleMouseOut);
        spline.removeEventListener('buttonClicked', handleClick);
      };
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (splineRef.current) {
        const { clientX, clientY } = e;
        const event = new MouseEvent('mousemove', {
          clientX,
          clientY,
        });
        splineRef.current.dispatchEvent(event);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      <Parallax translateY={[-10, 10]}>
        <div className="hero-content">
          {/* Add your hero content here if needed */}
        </div>
      </Parallax>
      <div className="scroll-indicator">&darr;</div>
    </section>
  );
}