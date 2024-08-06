'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

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
            transition: { duration: 0.1 }
          }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
};

const projects = [
  {
    id: 1,
    name: "Personal Portfolio Website",
    description: "An innovative personal portfolio website developed entirely through AI interactions.",
    image: "/path-to-portfolio-image.jpg",
    tags: ["Code Generation", "Web Development", "Next.js", "React", "JavaScript", "CSS", "AI-Generated Content", "UI/UX Design"],
    detailedDescription: "This unique project leverages AI tools to generate every component of the website, from the underlying code to the visual elements and written content. Built with Next.js and React, the portfolio showcases my skills and projects in a dynamic and interactive manner.",
    methodology: "The methodology involved a collaborative process with AI, where I would specify requirements and context, and the AI would generate the corresponding code and assets. This included creating components for various sections such as the hero, services, projects, and about me sections, each designed to be modular and easy to maintain.",
    achievements: [
      "AI-generated components for all sections",
      "Dynamic project presentation",
      "Interactive elements in the About section",
      "Real-time updates in the Contact section"
    ],
    github: "",
    liveDemo: "https://your-portfolio-url.com",
    videoDemo: "/path-to-build-process-video.mp4"
  },
  {
    id: 2,
    name: "Content Story V1: Automated Multimedia Storytelling",
    description: "An automated system for converting written articles into engaging video narratives.",
    image: "/path-to-content-story-image.jpg",
    tags: ["Automated Workflow", "AI Code Generation", "ElevenLabs", "Airtable", "Make.com"],
    detailedDescription: "Content Story V1 showcases my role in pioneering automated digital storytelling, blending AI scripting, voice generation, and visual effects to create seamless video narratives from written content.",
    methodology: "The process begins with sourcing input articles, which are processed through ChatGPT to generate dynamic scripts. AI-driven ElevenLabs creates realistic voiceovers, while visual content is generated using Midjourney and/or Leonardo.ai. Airtable manages the workflow, and custom scripts automate the video assembly process.",
    innovation: "Future improvements focus on reducing operational costs by incorporating local open-source LLMs such as Llama 3.1 or Mistral as alternatives to ChatGPT.",
    achievements: [
      "Fully automated system for video narrative creation",
      "Integration of multiple AI technologies",
      "Scalable and efficient production process"
    ],
    github: "https://github.com/yourusername/content-story-v1",
    videoDemo: "/path-to-content-story-demo.mp4"
  },
  {
    id: 3,
    name: "AI Learning Hub",
    description: "An interactive game created using ChatDev to teach AI concepts through gamification.",
    image: "/path-to-ai-learning-hub-image.jpg",
    tags: ["AI-Agent Development", "Multi-Agent Systems", "Workflow Automation", "chatDEV", "Python"],
    detailedDescription: "AI Adventure Quest is an interactive educational project designed to teach users about artificial intelligence concepts through an engaging and gamified experience.",
    methodology: "The project uses a combination of lessons, quizzes, coding challenges, and mini-games to create a comprehensive learning environment. Built with Python's Tkinter library, it offers a graphical user interface for navigating through various educational modules.",
    achievements: [
      "Modular approach to complex AI topics",
      "Hands-on coding challenges",
      "Persistent game state for continuous learning",
      "User interaction tracking for analysis and improvement"
    ],
    github: "https://github.com/yourusername/ai-learning-hub",
    screenshots: ["/path-to-screenshot1.jpg", "/path-to-screenshot2.jpg"]
  },
  {
    id: 4,
    name: "Advanced AI Generated Art and Community Engagement",
    description: "A project blending AI innovation with dark fantasy and anime to create unique, engaging art.",
    image: "/path-to-ai-art-image.jpg",
    tags: ["AI Image Generation", "Midjourney", "ChatGPT", "Text-To-Image"],
    detailedDescription: "This project is a creative fusion of AI and classic dark fantasy anime aesthetics, utilizing Midjourney to generate unique artworks that resonate with fans of the genre.",
    methodology: "I developed a system that automates the generation process using make.com and Airtable, enabling consistent production without sacrificing creativity. ChatGPT is used for prompt tweaking to maintain fresh and evolving artistic output.",
    innovation: "Future steps include creating a custom solution to replace paid services like make.com and Airtable in the autonomous process.",
    achievements: [
      "Over 20,000 followers on TikTok",
      "Established monetization model through sponsorships and Patreon",
      "Demonstrated commercial viability of AI-generated art"
    ],
    artSamples: ["/path-to-art-sample1.jpg", "/path-to-art-sample2.jpg", "/path-to-art-sample3.jpg"]
  },
  {
    id: 5,
    name: "Creative Dreamlike AI Generated Videos",
    description: "A project transforming dreamlike and weirdcore concepts into visually stunning video artworks.",
    image: "/path-to-dreamlike-video-image.jpg",
    tags: ["Midjourney", "ChatGPT", "AI Video Generation", "AI Image Generation"],
    detailedDescription: "This project highlights the entire workflow from prompt generation to final video production, showcasing the innovative use of multiple AI tools to create high-quality videos.",
    methodology: "The process begins with ChatGPT generating image prompts, which are then visualized using Midjourney. Pika is used to animate these static images into moving visuals.",
    innovation: "Future enhancements include incorporating ElevenLabs for high-quality voiceovers and fine-tuning advanced video generation models.",
    achievements: [
      "Seamless integration of multiple AI technologies",
      "Creation of unique, dreamlike video content",
      "Demonstration of AI's potential in creative video production"
    ],
    videoDemo: "/path-to-dreamlike-video-demo.mp4"
  },
  {
    id: 6,
    name: "Video-Concatenation",
    description: "A tool designed to merge multiple video files seamlessly into a single video file.",
    image: "/path-to-video-concatenation-image.jpg",
    tags: ["Video Generation", "Code Generation", "Workflow Automation", "AI Integration", "Python", "OpenCV", "MoviePY", "ML"],
    detailedDescription: "The Video Concatenation project automates the creation of themed video clips by integrating audio segments from podcasts with video clips extracted from anime episodes.",
    methodology: "The workflow includes transcribing podcast audio, highlighting key points with AI assistance, extracting and classifying video scenes, and merging audio and visual elements into cohesive clips.",
    achievements: [
      "Automated workflow for themed video creation",
      "Integration of audio transcription and video scene detection",
      "AI-assisted content highlighting and classification"
    ],
    github: "https://github.com/AKAlSS/video-concatenation"
  },
  {
    id: 7,
    name: "Customer Solutions Multi-Agent Service",
    description: "A multi-agent customer service system for e-commerce companies using the crewAI framework.",
    image: "/path-to-customer-service-image.jpg",
    tags: ["crewAI", "Multi-Agent Systems", "Customer Service", "E-commerce"],
    detailedDescription: "This ongoing project aims to create sophisticated multi-agent customer service systems tailored for e-commerce companies.",
    methodology: "Utilizing the crewAI framework to develop a network of AI agents capable of handling various aspects of customer service in an e-commerce context.",
    status: "In Progress",
    goals: [
      "Develop a scalable multi-agent system",
      "Improve customer service efficiency and quality",
      "Integrate seamlessly with existing e-commerce platforms"
    ]
  }
];

const ProjectShowcaseSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const slideRef = useRef(null);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setIsExpanded(false);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setIsExpanded(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      prevProject();
    } else if (event.key === 'ArrowRight') {
      nextProject();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <section className="project-showcase-slider">
      <AnimatedTitle text="PROJECTS" />
      <motion.div className="slider-container" layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            ref={slideRef}
            className="project-slide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div 
              className="project-info"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3>{currentProject.name}</h3>
              <p>{currentProject.description}</p>
              <div className="project-tags">
                {currentProject.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="project-details"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4>Detailed Description</h4>
                  <p>{currentProject.detailedDescription}</p>
                  {currentProject.methodology && (
                    <>
                      <h4>Methodology</h4>
                      <p>{currentProject.methodology}</p>
                    </>
                  )}
                  {currentProject.innovation && (
                    <>
                      <h4>Innovation</h4>
                      <p>{currentProject.innovation}</p>
                    </>
                  )}
                  {currentProject.achievements && (
                    <>
                      <h4>Key Achievements</h4>
                      <ul>
                        {currentProject.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </>
                  )}
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
                    {currentProject.videoDemo && (
                      <a href={currentProject.videoDemo} target="_blank" rel="noopener noreferrer">
                        <FaPlay /> Video Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        <motion.button 
          className="nav-btn prev" 
          onClick={prevProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
        </motion.button>
        <motion.button 
          className="nav-btn next" 
          onClick={nextProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowRight />
        </motion.button>
      </motion.div>
      <div className="progress-bar">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcaseSlider;