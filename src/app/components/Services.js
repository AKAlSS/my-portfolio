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


const GlowingOrb = () => {
  const speed = Math.random() < 0.5 ? 'fast' : 'slow';
  const direction = Math.random() < 0.5 ? 'left-to-right' : 'right-to-left';
  const color = ['white', 'grey', 'black'][Math.floor(Math.random() * 3)];

  return (
    <div className={`glowing-orb-container ${speed} ${direction}`}>
      <div className={`glowing-orb ${color}`}></div>
      <div className="orb-trail">
        {[...Array(5)].map((_, index) => (
          <div key={index} className={`trail-particle ${color}`} style={{animationDelay: `${index * 0.1}s`}}></div>
        ))}
      </div>
    </div>
  );
};

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showOrb, setShowOrb] = useState(false);

  const handleClick = (index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOrb(true);
      setTimeout(() => setShowOrb(false), 3000); // Orb visible for 3 seconds
    }, Math.random() * 2000 + 3000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="services" id="services">
      <ParticleBackground />
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
      {showOrb && <GlowingOrb />}
    </section>
  );
}