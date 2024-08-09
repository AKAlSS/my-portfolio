'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

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

const ServiceCard = ({ title, details, isExpanded, onClick }) => {
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
};

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleClick = (index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <AnimatedTitle text="SERVICES" />
      <div className="services-container">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            details={service.details}
            isExpanded={expandedIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </section>
  );
}