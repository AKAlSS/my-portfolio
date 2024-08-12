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
          {wordIndex < text.split(' ').length - 1 && ' '}
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
  const aboutText = "I'm Ahmad, and my journey into tech started in a frozen foods startup, where I transitioned from the production line to a part-time UI/UX designer by leveraging my design interest and psychology background. My passion for creating innovative user experiences led to a rapid progression to UX Manager and eventually Tech Project Lead, where I successfully led major projects while adapting to new challenges. A recent shift in my career sparked my interest in artificial intelligence. I began exploring AI by leading projects that utilized multiple AI tools and LLMs to build dynamic websites and optimize performance. One highlight was developing a website entirely through AI, from code to content, showcasing the power of these tools. Outside of work, I’m always learning and experimenting with side projects, whether it's diving into the latest AI advancements or launching new ventures like a final-mile logistics company. I thrive on taking risks and embracing challenges, and I’m eager to continue my pursuit with AI as I move forward in my career.";

  const hobbies = [
    { icon: '🥋', hobby: 'BJJ, Kickboxing, MMA', description: "It's pretty cool I guess 🤷‍♂️😏" },
    { icon: '🏒', hobby: 'Sports', description: "Something I typically look forward to, keeps me fresh." },
    { icon: '🏃', hobby: 'Running, Gym', description: "Makes me happy." },
    { icon: '🎮', hobby: 'Games', description: "You'd think this helps me relax but it's actually the complete opposite." },
    { icon: '🧠', hobby: 'Psychology, Neuroscience, Philosophy, History, Religion', description: "The more I learn the more I realize how stupid I am." }
  ];

  return (
    <section className="about-section" id="about">
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