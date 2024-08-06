'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

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

const HobbyIcon = ({ hobby, icon, description, isActive, onClick }) => {
  return (
    <div className={`hobby-icon-wrapper ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="hobby-icon">{icon}</div>
      <p className="hobby-name">{hobby}</p>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="hobby-description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HobbiesSection = ({ hobbies }) => {
  const [activeHobby, setActiveHobby] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length),
    onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + hobbies.length) % hobbies.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="hobbies-container" {...handlers}>
      {isMobile ? (
        <div className="hobbies-carousel">
          <HobbyIcon
            {...hobbies[currentIndex]}
            isActive={activeHobby === currentIndex}
            onClick={() => setActiveHobby(activeHobby === currentIndex ? null : currentIndex)}
          />
          <div className="carousel-indicators">
            {hobbies.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="hobbies-grid">
          {hobbies.map((hobby, index) => (
            <HobbyIcon
              key={index}
              {...hobby}
              isActive={activeHobby === index}
              onClick={() => setActiveHobby(activeHobby === index ? null : index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AboutSection = () => {
  const aboutText = "I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt. I like getting my hands dirty and finding things out the hard way. It's just my way of challenging myself and trusting my beliefs while adopting the student mindset... I could always be wrong (very rare). If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message.";

  const hobbies = [
    { icon: '🥋', hobby: 'BJJ, Kickboxing, MMA', description: "It's pretty cool I guess 🤷‍♂️😏" },
    { icon: '⚽', hobby: 'Hockey, Soccer, Basketball', description: "Something I typically look forward to, keeps me fresh." },
    { icon: '🏃', hobby: 'Running, Gym', description: "Some people hate running but it's something I do every single day." },
    { icon: '🎮', hobby: 'Games', description: "You'd think this helps me relax but it's actually the complete opposite." },
    { icon: '🧠', hobby: 'Psychology, Neuroscience, Philosophy, History, Religion', description: "The more I learn the more I realize how stupid I am." }
  ];

  return (
    <section className="about-section">
      <AnimatedTitle text="ABOUT ME" />
      <div className="about-content">
        <ScrollOpacityText text={aboutText} />
      </div>
      <h3 className="hobbies-title">My Hobbies</h3>
      <HobbiesSection hobbies={hobbies} />
    </section>
  );
};

export default AboutSection;