'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaintBrush, FaCode } from 'react-icons/fa';

const services = [
  {
    title: 'AI Development',
    icon: <FaRobot />,
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
    icon: <FaPaintBrush />,
    details: [
      'Image Generation',
      'Code Generation',
      'Video Generation',
      'Audio Generation',
      'ChatGPT, Claude, Llama, Gemini, Mixstral, Local LLMs via Ollama, Midjourney, Leonardo, DALL-E, SD Webui, ComfyUI, Fooocus, SD, SDXL, LoRA, Checkpoint, Luma, Pika, ElevenLabs'
    ]
  },
  {
    title: 'Web Development',
    icon: <FaCode />,
    details: [
      'Customer Experience Mapping',
      'UI/UX Design',
      'Conversion Optimization',
      'Figma, Next.js, React, JavaScript, HTML5/CSS, Three.js'
    ]
  }
];

const ServiceCard = ({ title, icon, details, isExpanded, onClick, color }) => {
  return (
    <motion.div
      className="service-card"
      whileHover={{ scale: isExpanded ? 1 : 1.05 }}
      onClick={onClick}
      animate={{
        backgroundColor: isExpanded ? color : '#ffffff',
        color: isExpanded ? '#ffffff' : '#333333',
      }}
    >
      <motion.div
        className="service-icon"
        animate={{ scale: isExpanded ? 1.2 : 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      >
        {icon}
      </motion.div>
      <h3>{title}</h3>
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
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

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const colors = ['#3498db', '#e74c3c', '#2ecc71'];

  const handleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="services" id="services">
      <h2>Services</h2>
      <motion.div 
        className="services-container"
        animate={{ 
          backgroundColor: expandedIndex !== null ? colors[expandedIndex] : '#f5f5f5'
        }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            icon={service.icon}
            details={service.details}
            isExpanded={expandedIndex === index}
            onClick={() => handleClick(index)}
            color={colors[index]}
          />
        ))}
      </motion.div>
    </section>
  );
}