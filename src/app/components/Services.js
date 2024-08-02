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

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleClick = (index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <BackgroundAnimation />
      <h2 className="section-header">SERVICES</h2>
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