'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: "Advanced AI Generated Art and Community Engagement Initiative",
    description: "This project blends AI innovation with a passion for dark fantasy and anime to create unique, engaging art. My work has built a lively community and opened paths to sustainable monetization, all through the power of art and AI image generation.",
    status: "Completed",
    tags: ["AI Image Generation", "Midjourney", "ChatGPT", "Text-To-Image"],
    githubUrl: "",
    liveUrl: "",
    largerDescription: "This project is a creative fusion of AI and classic dark fantasy anime aesthetics. This project utilizes Midjourney, an AI tool, to generate unique artworks that resonate deeply with fans of the genre. I developed a system that automates the generation process using make.com and Airtable, enabling consistent production without sacrificing the creativity and uniqueness of each piece. Through careful tweaking of prompts in ChatGPT, we maintain a fresh and evolving artistic output that keeps the community engaged. This project has not only grown to over 20,000 followers on TikTok but also established a monetization model through sponsorships and a Patreon community, demonstrating the commercial viability of AI-generated art.",
    innovation: "It's next steps consist of creating a custom solution outside of paid services such as make.com and airtable in replacement of it's autonomous process.",
    images: ["/path-to-ai-art-1.jpg", "/path-to-ai-art-2.jpg", "/path-to-ai-art-3.jpg"],
  },
  {
    id: 2,
    name: "Creative Dreamlike AI Generated Videos",
    description: "This project transforms dreamlike and weirdcore concepts into visually stunning artworks using a combination of AI-driven tools. This project highlights the entire workflow from prompt generation to final video production, showcasing the innovative use of multiple AI tools to create high quality videos.",
    status: "Completed",
    tags: ["Midjourney", "ChatGPT", "AI Video Generation", "AI Image Generation"],
    githubUrl: "",
    liveUrl: "",
    largerDescription: "The journey begins with generating multiple image prompts using ChatGPT, which are designed to evoke a dreamlike, weirdcore aesthetic. These prompts are then brought to life using Midjourney, an advanced AI tool, to create detailed and surreal images. The final step involves using Pika to animate these static images into moving visuals, adding a dynamic and mesmerizing layer to the artwork. This process not only demonstrates the creative potential of AI in art production but also emphasize the seamless integration of different AI technologies to enhance artistic expression.",
    innovation: "The next steps for enhancing the project involve incorporating high-quality voiceovers using ElevenLabs' text-to-speech technology to add compelling narratives to the visuals, enriching the experience. Simultaneously, we will fine-tune advanced video generation models available on platforms like Hugging Face and Civitai, leveraging a curated dataset of dreamlike and weirdcore content to achieve superior video quality. This combined approach will result in more immersive, coherent, and visually stunning outputs that seamlessly blend narrative and animation.",
    videoUrl: "/path-to-demo-video.mp4",
  },
  // ... Add other projects similarly
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
      <p className="project-description">{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="project-details"
          >
            <h4>Detailed Description</h4>
            <p>{project.largerDescription}</p>
            <h4>Innovation</h4>
            <p>{project.innovation}</p>
            
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
            
            {project.videoUrl && (
              <div className="project-video">
                <video controls src={project.videoUrl} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="project-links">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
            <FaGithub />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const completedProjects = projects.filter(project => project.status === "Completed");
  const activeProjects = [
    {
      id: 'future-1',
      name: "Customer Service Multi-Agent System",
      description: "A future project built with crewAI",
      status: "In Progress",
      tags: ["crewAI", "Multi-Agent Systems", "Customer Service"],
    }
  ];

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