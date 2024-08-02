'use client';

import { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Parallax } from 'react-scroll-parallax';

export default function Hero() {
  const splineRef = useRef();

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

  return (
    <section className="hero" id="hero">
      <Spline
        ref={splineRef}
        scene="https://prod.spline.design/aMcJqKwiEiI8NQ0W/scene.splinecode"
        className="spline-viewer"
      />
      <Parallax translateY={[-10, 10]}>
        <div className="hero-content">
        </div>
      </Parallax>
      <div className="scroll-indicator">&darr;</div>
    </section>
  );
}