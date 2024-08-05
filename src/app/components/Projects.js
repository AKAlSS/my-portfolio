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
  {
    id: 3,
    name: "Content Story V1: Automated Multimedia Storytelling",
    description: "Content Story V1 showcases my role in pioneering automated digital storytelling, where I blend AI scripting, voice generation, and visual effects to create seamless video narratives from written content.",
    status: "Completed",
    tags: ["Automated Workflow", "AI Code Generation", "ElevenLabs", "Airtable", "Make.com"],
    githubUrl: "https://github.com/AKAlSS/Content-Story-V1",
    liveUrl: "",
    largerDescription: "Content Story V1 is an innovative project where I've developed a fully automated system to convert written articles into engaging video narratives. The process begins with sourcing input articles, which are then processed through ChatGPT, to generate dynamic scripts that capture the essence and key points of the original text. These scripts serve as the backbone for the narrative structure of each video. Following script generation, the AI-driven ElevenLabs tool is employed to create realistic voiceovers, giving life to the written words with human-like speech. Visual content is generated using Midjourney and/or Leonardo.ai to visually represent the script's content, ensuring that each scene is perfectly synchronized with the voiceover. We then utilize Airtable to manage the workflow and keep track of the production stages, ensuring a seamless transition from script to screen. Custom scripts integrate the various technologies and automate the video assembly process, stitching together voiceovers, visuals, and background scores into a final video that is not only informative but also visually captivating and professional. This entire process is monitored and optimized continuously, using feedback loops to refine AI outputs and improve the system's efficiency and quality. The end product is a series of polished, high-quality videos that are ready for broadcasting across various media platforms, effectively transforming static text into dynamic, multimedia stories that attract and retain viewer attention.",
    innovation: "The scope for improvement relies on reducing the cost of operation. Local open-source LLMs such as Llama 3.1 or Mistral could be used in replacement to ChatGPT.",
    videoUrl: "/path-to-showcase-video.mp4",
  },
  {
    id: 4,
    name: "AI Learning Hub",
    description: "This project was an interactive game I created using ChatDev to help me better understand AI Agents, AI Agentic workflows, AI Agent frameworks and any relevant topics.",
    status: "Completed",
    tags: ["AI-Agent Development", "Multi-Agent Systems", "Workflow Automation", "chatDEV", "Python"],
    githubUrl: "https://github.com/AKAlSS/AiLearningHub",
    liveUrl: "",
    largerDescription: "AI Adventure Quest is an interactive educational project designed to teach users about artificial intelligence (AI) concepts through an engaging and gamified experience. The project uses a combination of lessons, quizzes, coding challenges, and mini-games to create a comprehensive learning environment. The primary interface is built using Python's Tkinter library, offering a graphical user interface (GUI) that allows users to navigate through various educational modules and track their progress. The core methodology of AI Adventure Quest is to integrate learning with interactive elements to enhance user engagement. The project employs a modular approach, breaking down complex AI topics into digestible lessons and quizzes. Each module covers different aspects of AI, such as neural networks, decision trees, and k-means clustering, providing hands-on coding challenges to reinforce the learning material. The system also includes a database component to save and load the user's game state, ensuring continuity in learning. Logging is extensively used to track user interactions and game state changes, facilitating debugging and user behavior analysis.",
    innovation: "",
    images: ["/path-to-game-screenshot-1.jpg", "/path-to-game-screenshot-2.jpg"],
  },
  {
    id: 5,
    name: "Video-Concatenation",
    description: "The Video Concatenation project is designed to merge multiple video files seamlessly into a single video file. This tool is ideal for creating continuous video sequences from separate clips without requiring complex video editing software.",
    status: "Completed",
    tags: ["Video Generation", "Code Generation", "Workflow Automation", "AI Integration", "Python", "OpenCV", "MoviePY", "ML"],
    githubUrl: "https://github.com/AKAlSS/video-concatenation",
    liveUrl: "",
    largerDescription: "The Video Concatenation project is designed to automate the creation of themed video clips by seamlessly integrating audio segments from podcasts with video clips extracted from anime episodes. The workflow begins with transcribing the podcast audio into text using the `transcribe.py` script. Key points and practical use cases are then highlighted in the transcription with the help of an AI assistant. These highlights are used to generate timestamps, which are fed into the `audioseg.py` script to create corresponding audio segments. On the video side, the `vidtoclips.py` script processes the anime episodes to detect scenes, classifying them into categories such as training, fight, struggle, and victory. The `extract_frames.py` script is used to extract specific frames for manual classification or model training. Finally, the `combine_audio_visual.py` script merges the extracted audio segments with the classified video clips to create cohesive and engaging final clips, ready for sharing on social media. This methodology ensures an efficient and automated workflow, leveraging the power of AI and Python scripting to produce high-quality, thematic video content.",
    innovation: "",
  },
  {
    id: 6,
    name: "Personal Portfolio Website",
    description: "My Portfolio is an innovative personal portfolio website developed entirely through AI interactions. In this unique project, I leveraged AI tools to generate every component of the website, from the underlying code to the visual elements and written content.",
    status: "Completed",
    tags: ["Code Generation", "Web Development", "Next.js", "React", "JavaScript", "CSS", "AI-Generated Content", "UI/UX Design"],
    githubUrl: "",
    liveUrl: "https://your-portfolio-url.com",
    largerDescription: "The methodology for this project involved a collaborative process with the AI, where I would specify requirements and context, and the AI would generate the corresponding code and assets. This included creating components for various sections such as the hero, services, projects, and about me sections, each designed to be modular and easy to maintain. The `Projects` section dynamically presents completed and ongoing projects with detailed descriptions, images, and links to live demos and GitHub repositories, all generated by AI. The `About` section features interactive elements that reveal more information on hover, and the `Contact` section includes real-time updates and links to social profiles. This approach demonstrates the potential of AI in web development, showcasing a seamless integration of AI-generated content with guidance and understanding to create a professional portfolio.",
    innovation: "",
    videoUrl: "/path-to-build-process-video.mp4",
  },
  {
    id: 7,
    name: "Customer Service Multi-Agent System",
    description: "A future project built with crewAI",
    status: "In Progress",
    tags: ["crewAI", "Multi-Agent Systems", "Customer Service"],
    githubUrl: "",
    liveUrl: "",
    largerDescription: "This project is currently in the planning stages.",
    innovation: "",
  }
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
      transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      onClick={toggleExpand}
    >
      <motion.div className="project-header">
        <h3>{project.name}</h3>
        <motion.div
          className="expand-icon"
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            className="project-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>{project.description.substring(0, 100)}...</p>
            <div className="project-tags">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
              {project.tags.length > 3 && <span className="tag">+{project.tags.length - 3}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="project-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <h4>Detailed Description</h4>
            <p>{project.largerDescription}</p>
            {project.innovation && (
              <>
                <h4>Innovation</h4>
                <p>{project.innovation}</p>
              </>
            )}
            
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
            
            <div className="project-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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