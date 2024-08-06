'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedTitle = ({ text }) => {
  return (
    <h2 className="section-header">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          className="animated-letter"
          whileHover={{ 
            scale: 1.2, 
            color: '#00e6ff',
            textShadow: '0 0 10px #00e6ff, 0 0 20px #00e6ff, 0 0 30px #00e6ff',
            transition: { duration: 0.1 }
          }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
};

const ScrollOpacityText = ({ text }) => {
  const { scrollYProgress } = useScroll();
  const words = text.split(' ');
  
  return (
    <p className="scroll-opacity-text">
      {words.map((word, index) => {
        const opacity = useTransform(
          scrollYProgress,
          [index / words.length, (index + 1) / words.length],
          [0, 1]
        );
        return (
          <motion.span key={index} style={{ opacity }} className="fade-in-word">
            {word}{' '}
          </motion.span>
        );
      })}
    </p>
  );
};

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="interactive-background">
      <motion.div
        className="glow"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      />
    </div>
  );
};

const HobbyWheel = ({ hobbies }) => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div className="hobby-wheel" style={{ rotate }}>
      {hobbies.map((hobby, index) => {
        const angle = (index / hobbies.length) * 360;
        return (
          <motion.div
            key={index}
            className="hobby-item"
            style={{
              rotate: -angle,
              transformOrigin: '50% 150px', // Adjust based on wheel size
            }}
          >
            <span className="hobby-icon">{hobby.icon}</span>
            <span className="hobby-name">{hobby.hobby}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const AboutSection = () => {
  const aboutText = "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt. I like getting my hands dirty and find things out the hard way. It's just my way of challenging myself and trusting my beliefs while adopting the student mindset... I could always be wrong (very rare). If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message.";

  const hobbies = [
    { hobby: "BJJ, Kickboxing, MMA", icon: "🥋" },
    { hobby: "Hockey, Soccer, Basketball", icon: "⚽" },
    { hobby: "Running, Gym", icon: "🏃" },
    { hobby: "Games", icon: "🎮" },
    { hobby: "Psychology, Neuroscience", icon: "🧠" },
  ];

  return (
    <section className="about-section">
      <InteractiveBackground />
      <AnimatedTitle text="ABOUT ME" />
      <div className="about-content">
        <ScrollOpacityText text={aboutText} />
      </div>
      <HobbyWheel hobbies={hobbies} />
    </section>
  );
};

export default AboutSection;