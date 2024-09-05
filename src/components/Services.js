'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const services = [
  {
    title: 'UX Management & Web Development',
    details: [
      'UX/UI Design',
      'Conversion Rate Optimization',
      'Customer Experience Mapping',
      'Sitemaps, User Flow, Low & Hi-Fi Wireframes',
      'Figma, Figjam, Hotjar, Google Analytics',
      'Next.js, React, JavaScript, HTML5/CSS, Three.js',
      'WooCommerce, Shopify, Webflow'
    ]
  },
  {
    title: 'AI Generation',
    details: [
      'Image Generation',
      'Video Generation',
      'Audio Generation',
      'Code Generation',
      'ChatGPT, Claude, Llama, Gemini, Mixstral',
      'Midjourney, Leonardo, DALL-E',
      'SD Webui, ComfyUI, Fooocus, SD, SDXL',
      'LoRA, Checkpoint, Luma, Pika, ElevenLabs'
    ]
  },
  {
    title: 'AI Development',
    details: [
      'Multi-Agent Systems',
      'AI-Agent Development',
      'Human-Agent Interaction',
      'ChatBots',
      'Workflow Automation',
      'Model Fine-tuning',
      'PyTorch & TensorFlow',
      'Python, crewAI, LangChain, LangGraph'
    ]
  }
];

const ServiceCard = React.memo(({ title, details, isExpanded, onClick }) => {
  return (
    <motion.div
      className="service-card"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <motion.h3 className="service-title">{title}</motion.h3>
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
      {!isExpanded && (
        <motion.div className="card-arrow">
          <FaChevronDown />
        </motion.div>
      )}
    </motion.div>
  );
});

const AnimatedTitle = React.memo(({ text }) => {
  return (
    <h2 className="section-header">
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          className="animated-letter"
          whileHover={{ 
            scale: 1.2, 
            color: '#FFFFFF',
            textShadow: '0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF',
          }}
          transition={{ duration: 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
});

const Particle = React.memo(({ style }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [0, Math.random() * window.innerWidth],
      y: [0, Math.random() * window.innerHeight],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
      }
    });
  }, [controls]);

  return (
    <motion.div
      className="particle"
      style={style}
      animate={controls}
    />
  );
});

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const generateParticles = useCallback((isMobile) => {
    const particlesCount = isMobile ? 25 : 50;
    return Array.from({ length: particlesCount }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 4 + 1}px`,
        height: `${Math.random() * 4 + 1}px`,
        opacity: Math.random() * 0.5 + 0.1,
      }
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setParticles(generateParticles(mobile));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateParticles]);

  const handleClick = useCallback((index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  }, []);

  const memoizedServices = useMemo(() => services.map((service, index) => (
    <ServiceCard
      key={index}
      title={service.title}
      details={service.details}
      isExpanded={expandedIndex === index}
      onClick={() => handleClick(index)}
    />
  )), [expandedIndex, handleClick]);

  const memoizedParticles = useMemo(() => particles.map((particle) => (
    <Particle key={particle.id} style={particle.style} />
  )), [particles]);

  return (
    <section className="services" id="services">
      {memoizedParticles}
      <AnimatedTitle text="SERVICES" />
      <div className="services-container">
        {memoizedServices}
      </div>
    </section>
  );
}