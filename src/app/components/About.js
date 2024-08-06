'use client'

import React from 'react';
import { motion } from 'framer-motion';

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

const HobbyItem = ({ hobby, icon, description }) => {
  return (
    <motion.div 
      className="hobby-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="hobby-icon">{icon}</div>
      <div className="hobby-content">
        <h3 className="hobby-title">{hobby}</h3>
        <p className="hobby-description">{description}</p>
      </div>
    </motion.div>
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
      <AnimatedTitle text="ABOUT ME" />
      <div className="about-content">
        <ScrollOpacityText text={aboutText} />
      </div>
      <div className="hobbies-container">
        <h3 className="hobbies-title">My Hobbies</h3>
        <div className="hobbies-list">
          {hobbies.map((hobby, index) => (
            <HobbyItem key={index} hobby={hobby.name} icon={hobby.icon} description={hobby.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;