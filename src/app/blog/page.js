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
    // Fetch blog posts from an API or load from a local file
    // This is a placeholder. Replace with actual data fetching logic
    const fetchBlogPosts = async () => {
      const posts = [
        { id: 1, title: 'Getting Started with AI Development', content: 'Lorem ipsum...', date: '2024-03-01' },
        { id: 2, title: 'The Future of Web Design', content: 'Lorem ipsum...', date: '2024-03-05' },
        { id: 3, title: 'Optimizing User Experience in AI Applications', content: 'Lorem ipsum...', date: '2024-03-10' },
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