'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'AI Development',
    details: [
      'Multi-Agent Systems',
      'Workflow Automation',
      'AI-Agent Development',
      'Human-Agent Interaction',
      'Model Fine-tuning',
      'PyTorch & TensorFlow',
      'Python, R, crewAI, MetaGPT, AutoGPT, chatDEV'
    ]
  },
  {
    title: 'AI Generation',
    details: [
      'Image Generation',
      'Code Generation',
      'Video Generation',
      'Audio Generation',
      'ChatGPT, Claude, Llama, Gemini, Mixstral',
      'Local LLMs via Ollama',
      'Midjourney, Leonardo, DALL-E',
      'SD Webui, ComfyUI, Fooocus, SD, SDXL',
      'LoRA, Checkpoint, Luma, Pika, ElevenLabs'
    ]
  },
  {
    title: 'Web Development',
    details: [
      'Customer Experience Mapping',
      'UI/UX Design',
      'Conversion Optimization',
      'Figma, Next.js, React',
      'JavaScript, HTML5/CSS, Three.js'
    ]
  }
];

const ServiceCard = ({ title, details, isExpanded, onClick, custom }) => {
  return (
    <motion.div
      className={`service-card ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: custom * 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(192, 192, 192, 0.2)' }}
    >
      <motion.h3 
        className="service-title"
        animate={{ y: isExpanded ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {details.map((detail, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {detail}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      {[...Array(40)].map((_, i) => (
        <div key={i} className={`particle particle-${i % 4}`} />
      ))}
    </div>
  );
};

const Particle = ({ style }) => (
  <motion.div
    className="particle"
    style={style}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  />
);

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particlesCount = 50;
    const newParticles = Array.from({ length: particlesCount }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        opacity: Math.random() * 0.5 + 0.1,
        animationDuration: `${Math.random() * 40 + 20}s`,
        animationDelay: `${Math.random() * 5}s`
      }
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <Particle key={particle.id} style={particle.style} />
      ))}
    </>
  );
};


const AnimatedTitle = ({ text }) => {
  return (
    <h2 className="section-header">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          className="animated-letter"
          whileHover={{ 
            scale: 1.2, 
            color: '#414141',
            transition: { duration: 0.1 }
          }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
};

const movementPatterns = [
  { start: { x: 0, y: 'random' }, end: { x: '100%', y: 'random' } },    // left to right
  { start: { x: '100%', y: 'random' }, end: { x: 0, y: 'random' } },    // right to left
  { start: { x: 'random', y: '100%' }, end: { x: 'random', y: 0 } },    // bottom to top
  { start: { x: 'random', y: 0 }, end: { x: 'random', y: '100%' } },    // top to bottom
  { start: { x: 0, y: '100%' }, end: { x: '100%', y: 0 } },             // bottom left to top right
  { start: { x: '100%', y: '100%' }, end: { x: 0, y: 0 } },             // bottom right to top left
  { start: { x: 0, y: 0 }, end: { x: '100%', y: '100%' } },             // top left to bottom right
  { start: { x: '100%', y: 0 }, end: { x: 0, y: '100%' } }              // top right to bottom left
];

const ShootingOrb = ({ pattern }) => {
  const duration = Math.random() * 2 + 3; // 3-5 seconds
  const size = Math.random() * 2 + 1; // 1-3px
  const opacity = Math.random() * 0.5 + 0.5; // 0.5-1 opacity

  const start = {
    x: pattern.start.x === 'random' ? `${Math.random() * 100}%` : pattern.start.x,
    y: pattern.start.y === 'random' ? `${Math.random() * 100}%` : pattern.start.y
  };

  const end = {
    x: pattern.end.x === 'random' ? `${Math.random() * 100}%` : pattern.end.x,
    y: pattern.end.y === 'random' ? `${Math.random() * 100}%` : pattern.end.y
  };

  return (
    <motion.div 
      className="shooting-orb"
      initial={start}
      animate={end}
      transition={{ duration, ease: "linear" }}
      style={{
        width: size,
        height: size,
        opacity,
        background: '#fff',
        borderRadius: '50%',
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <motion.div 
        className="orb-streak"
        style={{
          position: 'absolute',
          width: '50px',
          height: '2px',
          background: 'linear-gradient(to left, rgba(255,255,255,0.3), transparent)',
          transformOrigin: 'left center',
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) }}
      />
    </motion.div>
  );
};

const SpaceBackground = () => {
  const [orbs, setOrbs] = useState([]);
  const [lastPattern, setLastPattern] = useState(null);

  useEffect(() => {
    const createOrb = () => {
      if (orbs.length >= 2) return; // Limit to 2 orbs at a time

      let newPattern;
      do {
        newPattern = movementPatterns[Math.floor(Math.random() * movementPatterns.length)];
      } while (newPattern === lastPattern);

      setLastPattern(newPattern);
      const newOrb = { id: Math.random(), pattern: newPattern };
      setOrbs(prevOrbs => [...prevOrbs, newOrb]);

      setTimeout(() => {
        setOrbs(prevOrbs => prevOrbs.filter(orb => orb.id !== newOrb.id));
      }, 5000); // Remove orb after 5 seconds
    };

    const interval = setInterval(createOrb, 2000); // Try to create new orb every 2 seconds

    return () => clearInterval(interval);
  }, [orbs, lastPattern]);

  return (
    <div className="space-background">
      {orbs.map(orb => <ShootingOrb key={orb.id} pattern={orb.pattern} />)}
    </div>
  );
};

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleClick = (index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <SpaceBackground />
      <ParticleBackground />
      <BackgroundAnimation />
      <AnimatedTitle text="SERVICES" />
      <div className="services-container">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            details={service.details}
            isExpanded={expandedIndex === index}
            onClick={() => handleClick(index)}
            custom={index}
          />
        ))}
      </div>
    </section>
  );
}