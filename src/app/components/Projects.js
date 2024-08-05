'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaTimes } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: "AI Assistant",
    description: "A conversational AI assistant powered by GPT-3",
    status: "Completed",
    tech: ["Python", "OpenAI API", "Flask"],
    githubUrl: "https://github.com/yourusername/ai-assistant",
    liveUrl: "https://ai-assistant-demo.com",
    detailedDescription: "This project showcases the power of GPT-3 in creating human-like conversations...",
    demoUrl: "https://www.youtube.com/watch?v=demovideoID",
    image: "/path-to-project-image.jpg"
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

const ProjectCard = ({ project, onExpand }) => {
  return (
    <motion.div 
      className="project-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="project-image" style={{backgroundImage: `url(${project.image})`}} />
      <h3>{project.name}</h3>
      <p>{project.description}</p>
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
        <button onClick={() => onExpand(project)}>
          <FaInfoCircle />
        </button>
      </div>
    </motion.div>
  );
};

const ProjectDetails = ({ project, onClose }) => {
  return (
    <motion.div 
      className="project-details"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>{project.name}</h2>
      <p>{project.detailedDescription}</p>
      <div className="tech-stack">
        <h3>Tech Stack:</h3>
        <ul>
          {project.tech.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      {project.demoUrl && (
        <div className="demo-section">
          <h3>Demo:</h3>
          <iframe 
            width="560" 
            height="315" 
            src={project.demoUrl} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          />
        </div>
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

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const completedProjects = projects.filter(project => project.status === "Completed");
  const activeProjects = projects.filter(project => project.status === "In Progress");

  const expandProject = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section className="projects-section" id="projects">
      <Parallax translateY={[-20, 20]}>
        <AnimatedTitle text="PROJECTS" />
      </Parallax>
      
      <div className="projects-subsection">
        <h3>Completed Projects</h3>
        <div className="projects-grid">
          {completedProjects.map(project => (
            <ProjectCard key={project.id} project={project} onExpand={expandProject} />
          ))}
        </div>
      </div>
      
      <div className="projects-subsection">
        <h3>Active Projects</h3>
        <div className="projects-grid">
          {activeProjects.map(project => (
            <ProjectCard key={project.id} project={project} onExpand={expandProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-details-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProjectDetails project={selectedProject} onClose={closeProjectDetails} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;