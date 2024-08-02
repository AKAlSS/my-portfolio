'use client';

import { useRef, useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';

const projects = [
  { title: 'AI Assistant', description: 'A conversational AI assistant', imageUrl: '/placeholder.jpg', projectUrl: '#', githubUrl: '#' },
  { title: 'Web Portfolio', description: 'Interactive personal portfolio', imageUrl: '/placeholder.jpg', projectUrl: '#', githubUrl: '#' },
  { title: 'Data Visualization', description: 'Interactive data charts', imageUrl: '/placeholder.jpg', githubUrl: '#' },
  { title: '3D Animation', description: 'Three.js based 3D animation', imageUrl: '/placeholder.jpg', projectUrl: '#' },
  { title: 'AI Model API', description: 'RESTful API for AI model integration', imageUrl: '/placeholder.jpg', githubUrl: '#' },
];

export default function Projects() {
  const containerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(true);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollable = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  return (
    <section className="projects" id="projects">
      <Parallax translateY={[-15, 15]}>
        <h2 className="projects-title">Projects</h2>
      </Parallax>
      <div className="projects-container" ref={containerRef}>
        {projects.map((project, index) => (
          <Parallax key={index} translateX={[10, -10]} speed={-2}>
            <div className="project-card">
              <div className="project-image">
                <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-buttons">
                  {project.projectUrl && (
                    <a href={project.projectUrl} className="btn" target="_blank" rel="noopener noreferrer">View Project</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="btn btn-github" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Parallax>
        ))}
      </div>
      {isScrollable && (
        <>
          <button className="scroll-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
            ←
          </button>
          <button className="scroll-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
            →
          </button>
        </>
      )}
    </section>
  );
}