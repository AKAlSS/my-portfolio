'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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




const FlipCard = ({ hobby, icon, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="flip-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="flip-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="flip-card-front">
          <span className="hobby-icon">{icon}</span>
          <h3>{hobby}</h3>
        </div>
        <div className="flip-card-back">
          <p>{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutSection = () => {
  const aboutText = "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt. I like getting my hands dirty and finding things out the hard way. It's just my way of challenging myself and trusting my beliefs while adopting the student mindset... I could always be wrong (very rare). If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message.";

  const hobbies = [
    { hobby: "BJJ, Kickboxing, MMA", icon: "🥋", description: "It's pretty cool I guess 🤷‍♂️😏" },
    { hobby: "Hockey, Soccer, Basketball", icon: "⚽", description: "Something I typically look forward to, keeps me fresh" },
    { hobby: "Running, Gym", icon: "🏃", description: "This makes me happy" },
    { hobby: "Games", icon: "🎮", description: "You'd think this helps me relax but it's actually the complete opposite" },
    { hobby: "Psychology, Neuroscience", icon: "🧠", description: "The more I learn the more I realize how stupid I am" },
  ];

  return (
    <section className="about-section">
      <AnimatedTitle text="ABOUT ME" />
      <div className="about-content">
        <ScrollOpacityText text={aboutText} />
      </div>
      <div className="hobbies-container">
        <h3 className="hobbies-title">My Hobbies</h3>
        <div className="hobbies-grid">
          {hobbies.map((hobby, index) => (
            <FlipCard key={index} {...hobby} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;