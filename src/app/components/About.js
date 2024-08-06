'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      const angle = i * 0.5;  // Adjust this value to change the spiral tightness
      const radius = 5 * i;   // Adjust this value to change the spiral size
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        rotate: angle * (180 / Math.PI),
        scale: 1 - i * 0.02,  // Makes words smaller as they go out
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
      </div>
    </section>
  );
};

export default KineticTypography;