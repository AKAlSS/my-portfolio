'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedTitle = ({ text }) => {
  return (
    <h2 className="section-header">
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="animated-letter"
              whileHover={{ 
                scale: 1.2, 
                color: '#FFFFFF',
                textShadow: '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF',
                transition: { duration: 0.1 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  );
};

const ScrollOpacityText = ({ text }) => {
  return (
    <motion.p 
      className="scroll-opacity-text"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true, amount: 0.8 }}
    >
      {text}
    </motion.p>
  );
};

const HobbyCard = ({ hobby, icon, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="hobby-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="hobby-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="hobby-card-front">
          <span className="hobby-icon">{icon}</span>
          <h3 className="hobby-title">{hobby}</h3>
        </div>
        <div className="hobby-card-back">
          <p>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const AboutSection = () => {
  const aboutText = "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt. I like getting my hands dirty and finding things out the hard way. It's just my way of challenging myself and trusting my beliefs while adopting the student mindset... I could always be wrong (very rare). If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message.";

  const hobbies = [
    { icon: '🥋', name: 'BJJ, Kickboxing, MMA', description: "It's pretty cool I guess 🤷‍♂️😏" },
    { icon: '⚽', name: 'Hockey, Soccer, Basketball', description: "Something I typically look forward to, keeps me fresh." },
    { icon: '🏃', name: 'Running, Gym', description: "Some people hate running but it's something I do every single day." },
    { icon: '🎮', name: 'Games', description: "You'd think this helps me relax but it's actually the complete opposite." },
    { icon: '🧠', name: 'Psychology, Neuroscience, Philosophy, History, Religion', description: "The more I learn the more I realize how stupid I am." }
  ];

  return (
    <section className="about-section">
      <BackgroundAnimation />
      <AnimatedTitle text="ABOUT ME" />
      <div className="about-content">
        <ScrollOpacityText text={aboutText} />
      </div>
      <div className="hobbies-container">
        <h3 className="hobbies-title">My Hobbies</h3>
        <motion.div 
          className="hobbies-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {hobbies.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HobbyCard {...hobby} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;