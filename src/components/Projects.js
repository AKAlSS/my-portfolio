'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt, FaPlay, FaFigma } from 'react-icons/fa';import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

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
    name: "UX/UI Design Portfolio",
    description: "A comprehensive showcase of my UX/UI design projects and process.",
    backgroundGif: "/designproto.gif",
    tags: ["UX Design", "UI Design", "User Research", "Prototyping", "Figma", "Hotjar", "Google Analytics"],
    detailedDescription: "This portfolio showcases my journey and expertise in UX/UI design, featuring projects from my professional work. It demonstrates my approach to user-centered design, from initial research and wireframing to high-fidelity prototypes and user testing.",
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/7q9ajRGqtvywzJRGQwEPZj/Projects-Showcase?node-id=12-4682&starting-point-node-id=5%3A1102&hide-ui=1&t=QlvzIBPeKCo3QnRe-8",
    methodology: "Each project in this portfolio follows a comprehensive UX process: user research, persona creation, journey mapping, wireframing, prototyping, and iterative design based on user feedback.",
    achievements: [
      "Led UX redesign projects resulting in 30% increase in user engagement",
      "Nurtured an A/B testing culture which earned over $1M in projected revenue",
      "Implemented design system that improved team efficiency by 40%",
      "Conducted user research that informed product strategy, leading to 25% increase in customer satisfaction"
    ]
  },
  {
    id: 2,
    name: "Personal Portfolio Website",
    description: "An innovative personal portfolio website developed entirely through AI interactions.",
    backgroundGif: "/PersonalPorfolio.gif",
    tags: ["Code Generation", "Web Development", "Next.js", "React", "JavaScript", "CSS", "AI-Generated Content", "UI/UX Design"],
    detailedDescription: "This project is all about combining creativity with technology. I used AI tools to build every part of this website, from the code to the visuals and even the content. Built with Next.js and React, it’s more than just a portfolio—it’s an interactive experience that showcases my technical skills and the projects I’m passionate about.",
    methodology: "The process was a collaboration between me and AI. I set the vision and provided the context, and the AI handled the heavy lifting by generating the code and assets for each part of the site. From the hero section to the services, projects, and about me sections, everything was designed to be modular, making it easy to update and maintain.",
    achievements: [
      "AI-generated components: Created a complete website using AI, with all code, design, and content generated by multiple large language models (LLMs).",
      "Interactive user experience: Integrated AI-generated interactive elements, such as animations and responsive layouts, enhancing the overall user experience.",
      "AI-driven performance optimization: Used AI to optimize the website’s performance, particularly improving load times on mobile devices.",
      "AI-assisted SEO optimization: Implemented AI-driven SEO strategies to improve the website's visibility and performance in search engines."
    ],
    github: "",
  },
  {
    id: 3,
    name: "Content Story V1: Automated Multimedia Storytelling",
    description: "An automated system for converting written articles into engaging video narratives.",
    backgroundGif: "/ContentStoryV1.gif",
    tags: ["Automated Workflow", "AI Code Generation", "ElevenLabs", "Airtable", "Make.com"],
    detailedDescription: "Content Story V1 is a project where I explored the potential of automated digital storytelling. I combined AI tools to turn written content into engaging video narratives. This involved scripting, generating voiceovers, and adding visual effects—all working together to create a seamless storytelling experience.",
    methodology: "The process starts with selecting articles, which are then converted into scripts using ChatGPT. ElevenLabs takes care of the voiceovers, making them sound natural and engaging. For visuals, I used Midjourney and Leonardo.ai to create the right mood and look. The workflow is managed in Airtable, with custom scripts automating the video creation from start to finish.",
    innovation: "Future improvements focus on reducing operational costs by incorporating local open-source LLMs such as Llama 3.1 or Mistral as alternatives to ChatGPT.",
    achievements: [
      "Automated video creation: The entire process—from script to final video—is automated, making it efficient and repeatable.",
      "Smart use of AI tools: I integrated multiple AI technologies to handle different parts of the project, each playing a specific role.",
      "Scalable production: The system is built to handle large volumes of content, making it suitable for scaling up as needed."
    ],
    github: "https://github.com/AKAlSS/Content-Story-V1",
    videoDemo: "/ContentStoryVideoDemo.mp4"
  },
  {
    id: 4,
    name: "AI Learning Hub",
    description: "An interactive game created using ChatDev to teach AI concepts through gamification.",
    backgroundGif: "/AiLearningHub.gif",
    tags: ["AI-Agent Development", "Multi-Agent Systems", "Workflow Automation", "chatDEV", "Python"],
    detailedDescription: "AI Adventure Quest is an interactive project aimed at making learning about artificial intelligence fun and engaging. It’s designed to teach AI concepts through a game-like experience that keeps users interested and motivated.",
    methodology: "The project combines lessons, quizzes, coding challenges, and mini-games to create a well-rounded learning environment. Built with Python’s Tkinter library, it features a user-friendly graphical interface that guides users through different educational modules.",
    achievements: [
      "Modular learning experience: The project breaks down complex AI topics into manageable modules, making it easier to grasp.",
      "Hands-on coding challenges: Users get to apply what they learn by tackling real coding challenges.",
      "Continuous learning with saved progress: The game keeps track of progress, allowing users to pick up right where they left off.",
      "User interaction tracking: The project includes tracking features to analyze how users interact with the content, helping to improve the experience."
    ],
    github: "https://github.com/AKAlSS/AiLearningHub",
  },
  {
    id: 5,
    name: "Advanced AI Generated Art & Community Engagement",
    description: "A project blending AI innovation with different art styles to create unique, engaging art.",
    backgroundGif: "/TimelessCultureVid.gif",
    tags: ["AI Image Generation", "Midjourney", "ChatGPT", "Text-To-Image"],
    detailedDescription: "This project blends AI with dark fantasy, anime, 8-bit, and other classic aesthetics to create unique artworks that resonate with fans of these genres. Using Midjourney, I’ve crafted a series of visually striking pieces that stand out in the creative community.",
    methodology: "I use a streamlined workflow involving ChatGPT, Discord, and Midjourney. ChatGPT generates prompts that maintain consistency with the theme, ensuring each piece aligns with the project's aesthetic. These prompts are then sent to Midjourney through Discord, where the final images are created and shared with the community.",
    innovation: "Future steps include creating a custom solution to replace paid services like make.com and Airtable in the autonomous process.",
    achievements: [
      "Growing audience: Built a following of over 20,000 on TikTok, showcasing the appeal of AI-generated art.",
      "Monetization: Established a successful monetization model through sponsorships and Patreon, turning creativity into income.",
      "Proven commercial potential: Demonstrated the commercial viability of AI-generated art, making a case for its place in the art world."
    ],
    artSamples: ["/4.png", "/1.png", "/3.png", "/2.png", "/6.png", "/5.png", "/7.png", "/11.png", "/19.png", "/26.png", "/8.png", "/24.png", "/28.png", "/27.png", "/14.png", "/9.png", "/13.png", "/25.png", "/16.png", "/15.png"]
  },
  {
    id: 6,
    name: "Creative Dreamlike AI Generated Videos",
    description: "A project transforming dreamlike and weirdcore concepts into visually stunning video artworks.",
    backgroundGif: "/DreamlikeVid.gif",
    tags: ["Midjourney", "ChatGPT", "AI Video Generation", "AI Image Generation"],
    detailedDescription: "This project showcases the full process of creating high-quality videos using AI tools, from generating prompts to producing the final product. It’s an exploration of how multiple AI technologies can come together to create something unique and visually compelling.",
    methodology: "The workflow starts with ChatGPT generating image prompts, which are then brought to life using Midjourney. To add motion to these static visuals, I use Pika to animate them, transforming them into dynamic video content.",
    innovation: "Future enhancements include incorporating ElevenLabs for high-quality voiceovers and fine-tuning advanced video generation models.",
    achievements: [
      "AI technology integration: Successfully combined multiple AI tools to create a cohesive video production process.",
      "Unique, dreamlike visuals: Produced video content with a distinctive, dreamlike quality that stands out.",
      "Showcase of AI's creative potential: Demonstrated how AI can be harnessed for innovative and artistic video production."
    ],
    videoDemos: ["/Sarkaden1.mp4", "/Sarkaden2.mp4", "/Sarkaden4.mp4"]
  },
  {
    id: 7,
    name: "Customer Solutions Multi-Agent Service",
    description: "A multi-agent customer service system for e-commerce companies using the crewAI framework.",
    backgroundGif: "/43.gif",
    tags: ["crewAI", "Multi-Agent Systems", "Customer Service", "E-commerce"],
    detailedDescription: "This ongoing project is focused on building advanced multi-agent customer service systems specifically designed for e-commerce companies. The goal is to enhance customer interactions by leveraging AI to manage different service tasks efficiently.",
    methodology: "I’m using the crewAI framework to develop a network of AI agents, each specialized in handling various aspects of customer service within the e-commerce space. These agents work together to create a seamless customer experience.",
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
  const [isMobile, setIsMobile] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    setIsExpanded(false);
    setIsHovered(false);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    setIsExpanded(false);
    setIsHovered(false);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: nextProject,
    onSwipedRight: prevProject,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      prevProject();
    } else if (event.key === 'ArrowRight') {
      nextProject();
    }
  }, [prevProject, nextProject]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderTags = (tags) => {
    const duplicatedTags = [...tags, ...tags]; // Duplicate tags for seamless scrolling
    return (
      <div className="project-tags">
        <div className="scrolling-tags">
          {duplicatedTags.map((tag, index) => (
            <span key={`${index}-${tag}`} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderFigmaEmbed = (embedUrl) => {
    return (
      <div className="figma-embed">
        <iframe 
          width="100%" 
          height="450" 
          src={embedUrl} 
          allowFullScreen
        />
      </div>
    );
  };

  const currentProject = projects[currentIndex];

  return (
    <section className="project-showcase-slider" id="project-showcase-slider">
      <AnimatedTitle text="PROJECTS" />
      <motion.div className={`slider-container ${isMobile ? 'mobile' : ''}`} layout {...handlers}>
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
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
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
              {!isMobile && (
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
              )}
              {renderTags(currentProject.tags)}
              <div className="project-links">
                {currentProject.figmaEmbed && (
                  <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} className="project-link figma-link">
                    <FaFigma /> View Design
                  </button>
                )}
                {currentProject.github && (
                  <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                    <FaGithub /> GitHub
                  </a>
                )}
                {currentProject.liveDemo && (
                  <a href={currentProject.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link live-demo-link">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {currentProject.videoDemo && (
                  <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} className="project-link video-demo-link">
                    <FaPlay /> Video Demo
                  </button>
                )}
              </div>
              </motion.div>
            {isExpanded && (
              <motion.div
                className="project-details"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-details" onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}>
                  &times;
                </button>
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
                    <ul className="achievements-list">
                      {currentProject.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </>
                )}
                {currentProject.figmaEmbed && (
                  <div className="figma-portfolio">
                    <h4>Design Portfolio</h4>
                    {renderFigmaEmbed(currentProject.figmaEmbed)}
                  </div>
                )}
                <div className="project-links">
                  {currentProject.github && (
                    <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {currentProject.liveDemo && (
                    <a href={currentProject.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link live-demo-link">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
                {currentProject.videoDemo && (
                  <div className="video-demo">
                    <h4>Video Demo</h4>
                    <video controls width="100%" onClick={(e) => e.stopPropagation()}>
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
                          onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
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
                        <video key={index} controls width="300" onClick={(e) => e.stopPropagation()}>
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
          </motion.div>
        </AnimatePresence>
        {!isMobile && (
          <>
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
          </>
        )}
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