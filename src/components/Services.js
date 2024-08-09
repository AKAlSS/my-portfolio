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

const ServiceItem = ({ service, isExpanded, onToggle }) => {
  return (
    <motion.div
      className={`service-item ${isExpanded ? 'expanded' : ''}`}
      onClick={onToggle}
      initial={false}
      animate={{ backgroundColor: isExpanded ? '#1a1a1a' : '#000000' }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-header">
        <h2>{service.title}</h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown />
        </motion.div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.details.map((detail, index) => (
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

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <h1 className="section-title">Services</h1>
      <div className="services-container">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            service={service}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;