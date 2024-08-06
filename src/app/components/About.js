'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HandsAnimation = () => {
  const [showHands, setShowHands] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHands(true), 9000); // Start after seesaw animation
    return () => clearTimeout(timer);
  }, []);

  const handPath = "M10,50 Q25,40 40,50 Q50,60 60,50 Q75,40 90,50 L90,90 Q75,80 60,90 Q50,100 40,90 Q25,80 10,90 Z";
  const handprintPath = "M20,20 Q40,10 60,20 Q80,30 100,20 V80 Q80,70 60,80 Q40,90 20,80 Z";

  return (
    <motion.div 
      className="hands-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: showHands ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <svg width="200" height="200" viewBox="0 0 100 100">
        <motion.path
          d={handPath}
          fill="#00a8ff"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showHands ? 0 : 100, opacity: showHands ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d={handprintPath}
          fill="#00a8ff"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: showHands ? [0, 1.2, 1] : 0, 
            opacity: showHands ? 1 : 0,
            transition: { 
              duration: 1, 
              delay: 1.5,
              times: [0, 0.8, 1]
            }
          }}
        />
      </svg>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showHands ? 1 : 0, y: showHands ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        I like getting my hands dirty
      </motion.p>
    </motion.div>
  );
};


const SeesawAnimation = () => {
  const [seesaw, setSeesaw] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSeesaw(true), 6000); // Start after spiral animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div className="seesaw-container" animate={{ opacity: seesaw ? 1 : 0 }}>
      <motion.div
        className="seesaw"
        animate={{ rotate: seesaw ? [-5, 5] : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <motion.span className="seesaw-left">coping mechanism</motion.span>
        <motion.span className="seesaw-right">benefit of doubt</motion.span>
      </motion.div>
    </motion.div>
  );
};

const KineticTypography = () => {
  const [words, setWords] = useState([]);
  const [animationState, setAnimationState] = useState('initial');
  const text = "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt.";

  useEffect(() => {
    setWords(text.split(' '));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
    scattered: {
      transition: { staggerChildren: 0.05 },
    },
    spiral: {
      transition: { staggerChildren: 0.03, delayChildren: 0.5 },
    },
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    scattered: (i) => ({
      x: Math.random() * 800 - 400,
      y: Math.random() * 300 - 150,
      rotate: Math.random() * 360,
      transition: { type: 'spring', damping: 10, stiffness: 100 },
    }),
    spiral: (i) => {
      const angle = i * 0.5;
      const radius = 5 * i;
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        rotate: angle * (180 / Math.PI),
        scale: 1 - i * 0.02,
        transition: { type: 'spring', damping: 15, stiffness: 150 },
      };
    },
  };

  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationState('scattered');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationState('spiral');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationState('hidden');
    };
    sequence();
  }, []);

  return (
    <section className="about-section">
      <motion.h2
        className="about-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        About Me
      </motion.h2>
      <div className="about-paragraph">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animationState}
        >
          <AnimatePresence>
            {words.map((word, index) => (
              <motion.span
                key={word + index}
                className="about-word"
                variants={wordVariants}
                custom={index}
                whileHover={{
                  scale: 1.2,
                  color: '#00a8ff',
                  transition: { duration: 0.2 },
                }}
              >
                {word}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
        <SeesawAnimation />
        <HandsAnimation />
      </div>
    </section>
  );
};

export default KineticTypography;