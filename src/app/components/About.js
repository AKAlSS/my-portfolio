'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Background shapes component
const BackgroundShapes = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="background-shapes">
      <motion.div className="shape shape1" style={{ y: y1, rotate }} />
      <motion.div className="shape shape2" style={{ y: y2 }} />
      <motion.div className="shape shape3" style={{ y: y1, rotate }} />
    </div>
  );
};

const AnimatedText = ({ text }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          className="animated-word"
          whileHover={{ scale: 1.1, color: '#00a8ff' }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  );
};

const HobbyItem = ({ hobby, description, icon }) => {
  const [ref, isVisible] = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="hobby-item"
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span className="hobby-icon">{icon}</span>
      <strong>{hobby}</strong>
      {isHovered && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

const AboutSection = () => {
  const [backgroundColor, setBackgroundColor] = useState('rgb(18, 18, 18)');
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollPercentage = scrollPosition / sectionHeight;
      
      // Gradient transition from dark to slightly lighter
      const r = Math.floor(18 + (scrollPercentage * 20));
      const g = Math.floor(18 + (scrollPercentage * 20));
      const b = Math.floor(18 + (scrollPercentage * 20));
      
      setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt.",
    "I like getting my hands dirty and find things out the hard way.",
    "It's just my way of challenging myself and trusting my beliefs while adopting the student mindset...",
    "I could always be wrong (very rare).",
    "If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message."
  ];

  const hobbies = [
    { hobby: "BJJ, Kickboxing, MMA", description: "It's pretty cool I guess 🤷‍♂️😏", icon: "🥋" },
    { hobby: "Hockey, Soccer, Basketball", description: "Something I typically look forward to, keeps me fresh", icon: "⚽" },
    { hobby: "Running, Gym", description: "This makes me happy", icon: "🏃" },
    { hobby: "Games", description: "You'd think this helps me relax but it's actually the complete opposite", icon: "🎮" },
    { hobby: "Psychology, Neuroscience, Philosophy, History, Religion", description: "The more I learn the more I realize how stupid I am", icon: "🧠" }
  ];

  return (
    <ParallaxProvider>
      <section className="about-section" ref={sectionRef} style={{ backgroundColor }}>
        <BackgroundShapes />
        
        <Parallax speed={-5}>
          <motion.h2
            className="about-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </Parallax>

        <div className="about-content">
          {sections.map((text, index) => (
            <Parallax key={index} speed={5}>
              <AnimatedText text={text} />
            </Parallax>
          ))}
        </div>

        <Parallax speed={10}>
          <div className="hobbies-section">
            <h3>My Hobbies</h3>
            {hobbies.map((hobby, index) => (
              <HobbyItem key={index} {...hobby} />
            ))}
          </div>
        </Parallax>

        <Parallax speed={-5}>
          <AnimatedText text="Come back soon! 👋" />
        </Parallax>
      </section>
    </ParallaxProvider>
  );
};

export default AboutSection;