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

const ScrollOpacityText = ({ text, isExpanded, toggleExpand }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [height, setHeight] = useState("auto");
  const textRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const scrollHeight = textRef.current.scrollHeight;
      setHeight(isExpanded ? `${scrollHeight}px` : "150px");
    }
  }, [isExpanded, text]);

  return (
    <div className="scroll-opacity-text-container">
      <div 
        ref={textRef}
        className={`scroll-opacity-text ${isMobile ? 'mobile' : ''} ${isExpanded ? 'expanded' : ''}`}
        style={{ height: isMobile ? height : "auto" }}
      >
        {text}
      </div>
      {isMobile && (
        <div className="read-more-button-container">
          <button 
            className="read-more-btn"
            onClick={toggleExpand}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}
    </div>
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
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const aboutText = "My tech journey began in a frozen foods startup, where I transitioned from the production line to UI/UX design, leveraging my design interest and psychology background. This passion propelled me to UX Manager and then Tech Project Lead, where I led major initiatives and adapted to new challenges. My career took an exciting turn as I dove into artificial intelligence. I've led projects that integrate multiple AI tools and large language models (LLMs) to build dynamic websites and optimize performance. A standout achievement was developing an entire website through AI, from code to content, showcasing the potential of these technologies. Outside of work, I'm deeply invested in exploring the latest AI advancements, constantly learning and experimenting with new ideas. I'm excited to continue pushing the boundaries of what's possible with AI as I advance in my career.";

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
        <ScrollOpacityText 
          text={aboutText} 
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
        />
      </div>
      <h3 className="hobbies-title">My Hobbies</h3>
      <HobbiesSection hobbies={hobbies} />
    </section>
  );
};

export default AboutSection;