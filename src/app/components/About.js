'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';

const hobbies = [
  { icon: '🥋', name: 'BJJ, Kickboxing, MMA', description: "It's pretty cool I guess 🤷‍♂️😏" },
  { icon: '⚽', name: 'Hockey, Soccer, Basketball', description: "Something I typically look forward to, keeps me fresh." },
  { icon: '🏃', name: 'Running, Gym', description: "Some people hate running but it's something I do every single day." },
  { icon: '🎮', name: 'Games', description: "You'd think this helps me relax but it's actually the complete opposite." },
  { icon: '🧠', name: 'Psychology, Neuroscience, Philosophy, History, Religion', description: "The more I learn the more I realize how stupid I am." }
];

const HobbyIcon = ({ hobby }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="hobby-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <span className="icon">{hobby.icon}</span>
      <span className="name">{hobby.name}</span>
      {isHovered && (
        <motion.div
          className="description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {hobby.description}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function About() {
  return (
    <section className="about" id="about">
      <Parallax translateY={[-20, 20]}>
        <h2>About Me</h2>
      </Parallax>
      <Parallax translateY={[-10, 10]} speed={-3}>
        <p className="about-intro">
          I have to always keep myself busy, could be some coping mechanism but we'll give myself the benefit of doubt. I like getting my hands dirty and find things out the hard way. It's just my way of challenging myself and trusting my beliefs while adopting the student mindset... I could always be wrong (very rare). If you did take the time to read this I appreciate that, I would also like to let you know that I stole 15 seconds of your time. If you want it back, just shoot me a message.
        </p>
      </Parallax>
      <div className="hobbies-container">
        {hobbies.map((hobby, index) => (
          <Parallax key={index} translateY={[20, -20]} speed={-2}>
            <HobbyIcon hobby={hobby} />
          </Parallax>
        ))}
      </div>
    </section>
  );
}