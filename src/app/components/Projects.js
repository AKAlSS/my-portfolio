'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: "AI Image Generator",
    description: "A tool that generates images using AI",
    status: "Completed",
    tech: ["Python", "TensorFlow", "React"],
    githubUrl: "https://github.com/yourusername/ai-image-generator",
    liveUrl: "https://ai-image-generator-demo.com",
    summary: "An AI-powered tool that creates unique images based on text descriptions.",
    problem: "The need for quick, customizable image creation for various purposes.",
    solution: "Utilizing advanced machine learning models to generate high-quality images from text input.",
    images: [
      "/path-to-image1.jpg",
      "/path-to-image2.jpg",
      "/path-to-image3.jpg",
      "/path-to-image4.jpg",
      "/path-to-image5.jpg"
    ],
    demoUrl: "https://www.youtube.com/watch?v=demovideoID"
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "My personal portfolio website (this one!)",
    status: "Completed",
    tech: ["React", "Next.js", "Framer Motion"],
    githubUrl: "https://github.com/yourusername/portfolio",
    detailedDescription: "A showcase of my skills and projects, built with modern web technologies...",
    image: "/path-to-project-image.jpg"
  },
  {
    id: 3,
    name: "AI-Powered Trading Bot",
    description: "A machine learning model for stock prediction",
    status: "In Progress",
    tech: ["Python", "TensorFlow", "Alpaca API"],
    githubUrl: "https://github.com/yourusername/trading-bot",
    detailedDescription: "This ongoing project aims to leverage machine learning for stock market predictions...",
    image: "/path-to-project-image.jpg"
  },
  // Add more projects as needed
];

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const nextImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <motion.div 
      className={`project-card ${isExpanded ? 'expanded' : ''}`}
      layout
      transition={{ duration: 0.3 }}
      whileHover={{ scale: isExpanded ? 1 : 1.05 }}
    >
      <motion.div className="project-header" onClick={toggleExpand}>
        <h3>{project.name}</h3>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </motion.div>
      <p>{project.description}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="project-details"
          >
            <h4>Summary</h4>
            <p>{project.summary}</p>
            <h4>Problem</h4>
            <p>{project.problem}</p>
            <h4>Solution</h4>
            <p>{project.solution}</p>
            
            {project.images && project.images.length > 0 && (
              <div className="project-images">
                <img src={project.images[currentImageIndex]} alt={`Project image ${currentImageIndex + 1}`} />
                {project.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="image-nav prev"><FaArrowLeft /></button>
                    <button onClick={nextImage} className="image-nav next"><FaArrowRight /></button>
                  </>
                )}
              </div>
            )}
            
            {project.images && project.images.length > 1 && (
              <div className="image-indicator">
                {project.images.map((_, index) => (
                  <span 
                    key={index} 
                    className={index === currentImageIndex ? 'active' : ''}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="project-links">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt />
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const completedProjects = projects.filter(project => project.status === "Completed");
  const activeProjects = projects.filter(project => project.status === "In Progress");

  return (
    <section className="projects-section" id="projects">
      <h2 className="section-header">PROJECTS</h2>
      
      <div className="projects-subsection">
        <h3>Completed Projects</h3>
        <div className="projects-grid">
          {completedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      
      <div className="projects-subsection">
        <h3>Active Projects</h3>
        <div className="projects-grid">
          {activeProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;