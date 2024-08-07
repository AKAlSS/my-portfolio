'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

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
    backgroundGif: "/TimelessCulture.gif",
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
    backgroundGif: "/path-to-portfolio-gif.gif",
    tags: ["Midjourney", "ChatGPT", "AI Video Generation", "AI Image Generation"],
    detailedDescription: "This project highlights the entire workflow from prompt generation to final video production, showcasing the innovative use of multiple AI tools to create high-quality videos.",
    methodology: "The process begins with ChatGPT generating image prompts, which are then visualized using Midjourney. Pika is used to animate these static images into moving visuals.",
    innovation: "Future enhancements include incorporating ElevenLabs for high-quality voiceovers and fine-tuning advanced video generation models.",
    achievements: [
      "Seamless integration of multiple AI technologies",
      "Creation of unique, dreamlike video content",
      "Demonstration of AI's potential in creative video production"
    ],
    videoDemos: ["/path-to-dreamlike-video-demo1.mp4", "/path-to-dreamlike-video-demo2.mp4", "/path-to-dreamlike-video-demo3.mp4"]
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
    status: "Active - Ongoing Project",
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
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef(null);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setIsExpanded(false);
    setIsHovered(false);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setIsExpanded(false);
    setIsHovered(false);
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="background-gif-container">
              <Image
                src={currentProject.backgroundGif || currentProject.image}
                alt={`${currentProject.name} background`}
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
            <motion.div className="project-content">
              <h3 className="project-title">{currentProject.name}</h3>
              <AnimatePresence>
                {isHovered && (
                  <motion.p
                    className="project-description"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentProject.description}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="project-tags">
                {currentProject.tags.map((tag, index) => (
                  <span key={index} className="project-tag">{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {currentProject.github && (
                  <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                )}
                {currentProject.liveDemo && (
                  <a href={currentProject.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {currentProject.videoDemo && (
                  <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} className="project-link">
                    <FaPlay /> Video Demo
                  </button>
                )}
              </div>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="project-details"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
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
                  {currentProject.videoDemo && (
                    <div className="video-demo">
                      <h4>Video Demo</h4>
                      <video controls width="100%">
                        <source src={currentProject.videoDemo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  {currentProject.screenshots && (
                    <div className="project-screenshots">
                      <h4>Screenshots</h4>
                      <div className="screenshot-gallery">
                        {currentProject.screenshots.map((screenshot, index) => (
                          <Image 
                            key={index}
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            width={200}
                            height={150}
                            objectFit="cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {currentProject.artSamples && (
                    <div className="art-samples">
                      <h4>Art Samples</h4>
                      <div className="art-gallery">
                        {currentProject.artSamples.map((sample, index) => (
                          <Image 
                            key={index}
                            src={sample}
                            alt={`Art Sample ${index + 1}`}
                            width={200}
                            height={200}
                            objectFit="cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {currentProject.videoDemos && (
                    <div className="video-demos">
                      <h4>Video Demos</h4>
                      <div className="video-gallery">
                        {currentProject.videoDemos.map((video, index) => (
                          <video key={index} controls width="300">
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentProject.status && (
                    <div className="project-status">
                      <h4>Status</h4>
                      <p>{currentProject.status}</p>
                    </div>
                  )}
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