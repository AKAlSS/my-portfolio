'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: "Advanced AI Generated Art",
    description: "Blending AI innovation with dark fantasy and anime to create unique, engaging art.",
    image: "/path-to-ai-art-image.jpg",
    tags: ["AI", "Image Generation", "Midjourney", "ChatGPT"],
    detailedDescription: "This project is a creative fusion of AI and classic dark fantasy anime aesthetics...",
    challenge: "Developing a system for consistent, high-quality AI art generation.",
    solution: "Automated generation process using make.com and Airtable, with ChatGPT for prompt tweaking.",
    achievements: ["20,000+ TikTok followers", "Established monetization model", "Community engagement"],
    github: "https://github.com/yourusername/ai-art-project",
    liveDemo: "https://your-ai-art-demo.com"
  },
  // Add other projects here...
];

const ProjectShowcaseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setIsExpanded(false);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setIsExpanded(false);
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="project-showcase-slider">
      <h2 className="section-title">Projects</h2>
      <motion.div className="slider-container" layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="project-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundImage: `url(${currentProject.image})` }}
          >
            <div className="project-info">
              <h3>{currentProject.name}</h3>
              <p>{currentProject.description}</p>
              <div className="project-tags">
                {currentProject.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <button 
                className="learn-more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Learn More'}
              </button>
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="project-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4>Challenge</h4>
                  <p>{currentProject.challenge}</p>
                  <h4>Solution</h4>
                  <p>{currentProject.solution}</p>
                  <h4>Key Achievements</h4>
                  <ul>
                    {currentProject.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {currentProject.github && (
                      <a href={currentProject.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> GitHub
                      </a>
                    )}
                    {currentProject.liveDemo && (
                      <a href={currentProject.liveDemo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        <button className="nav-btn prev" onClick={prevProject} aria-label="Previous project">
          <FaArrowLeft />
        </button>
        <button className="nav-btn next" onClick={nextProject} aria-label="Next project">
          <FaArrowRight />
        </button>
      </motion.div>
      <div className="progress-bar">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcaseSlider;