'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import BlogPost from '@/components/BlogPost';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = [
        {
          id: 1,
          title: 'The Future of AI in Web Development: Trends and Predictions',
          content: `Artificial Intelligence is revolutionizing the web development landscape, offering exciting possibilities for creating more intuitive, personalized, and efficient websites. As we look towards the future, several key trends are emerging:

• AI-Powered Design Assistance: AI tools are becoming increasingly sophisticated in generating layout suggestions, color schemes, and even entire design concepts based on user preferences and brand guidelines.

• Intelligent Chatbots and Virtual Assistants: Advanced NLP models are enabling more natural and context-aware conversational interfaces, enhancing user engagement and support.

• Predictive User Experience: AI algorithms are analyzing user behavior to anticipate needs and preferences, allowing for dynamic content personalization and improved navigation.

• Automated Code Generation: AI is streamlining the development process by generating boilerplate code, suggesting optimizations, and even creating entire components based on natural language descriptions.

• Enhanced Accessibility: AI is playing a crucial role in making websites more inclusive, automatically generating alt text for images and suggesting improvements for screen reader compatibility.

As these technologies continue to evolve, we can expect web development to become more efficient, creative, and user-centric. However, it's crucial for developers to stay informed and adapt their skills to harness the full potential of AI in web development.`,
          date: '2024-08-28'
        },
        {
          id: 2,
          title: 'Optimizing User Experience with AI: A Guide for Web Designers',
          content: `Artificial Intelligence is becoming an indispensable tool for web designers looking to create exceptional user experiences. Here's how AI can be leveraged to optimize UX:

• Personalized Content Delivery: AI algorithms can analyze user behavior and preferences to deliver tailored content, increasing engagement and satisfaction.

• Intelligent Search Functionality: AI-powered search engines can understand context and intent, providing more accurate and relevant results to users.

• Dynamic A/B Testing: AI can automate the process of A/B testing, continuously optimizing design elements based on user interactions and preferences.

• Emotion Recognition: Advanced AI can analyze user emotions through facial recognition or text sentiment analysis, allowing websites to adapt their tone and content accordingly.

• Predictive Design: AI tools can forecast design trends and user preferences, helping designers stay ahead of the curve and create forward-thinking interfaces.

Implementing these AI-driven strategies can significantly enhance the user experience, leading to increased engagement, higher conversion rates, and improved customer satisfaction. As AI continues to evolve, it's crucial for web designers to embrace these technologies and integrate them thoughtfully into their design process.`,
          date: '2024-08-27'
        },
        {
          id: 3,
          title: 'Ethical Considerations in AI-Driven Web Development',
          content: `As AI becomes more prevalent in web development, it's crucial to address the ethical implications of these powerful technologies. Here are key considerations for developers and designers:

• Data Privacy and Security: AI systems often require large amounts of user data. Ensuring the ethical collection, storage, and use of this data is paramount.

• Transparency and Explainability: Users should be informed when interacting with AI systems, and the decision-making processes of these systems should be as transparent as possible.

• Bias and Fairness: AI models can inadvertently perpetuate or amplify biases. Regular auditing and diverse training data are essential to ensure fair treatment of all users.

• Accessibility: While AI can enhance accessibility, care must be taken to ensure that AI-driven features don't inadvertently create new barriers for users with disabilities.

• Human Oversight: Despite AI's capabilities, human judgment remains crucial. Implementing systems for human review and intervention is essential, especially for critical decisions.

• Environmental Impact: The computational resources required for AI can have significant environmental costs. Developers should consider the energy efficiency of their AI implementations.

By thoughtfully addressing these ethical considerations, developers can harness the power of AI to create web experiences that are not only innovative and efficient but also responsible and inclusive. As AI continues to evolve, ongoing dialogue and adaptation of ethical guidelines will be crucial in shaping a positive future for AI in web development.`,
          date: '2024-08-26'
        }
      ];
      setBlogPosts(posts);
    };

    fetchBlogPosts();
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      className="blog-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header />
      <main className="blog-content">
        <h1 className="blog-title">Blog & Newsletter</h1>
        <section className="blog-posts">
          {blogPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </section>
        <Newsletter />
      </main>
      <Contact />
    </motion.div>
  );
}