import React from 'react';
import { motion } from 'framer-motion';

const BlogPost = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const contentSections = post.content.split('\n\n').map((section, index) => {
    if (section.startsWith('•')) {
      return (
        <ul key={index} className="blog-post-list">
          {section.split('\n').map((item, itemIndex) => (
            <li key={itemIndex}>{item.replace('• ', '')}</li>
          ))}
        </ul>
      );
    }
    return <p key={index}>{section}</p>;
  });

  return (
    <article className="blog-post">
      <motion.div 
        className="blog-post-date"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="date-day">{new Date(post.date).getDate()}</span>
        <span className="date-month">{formatDate(post.date).split(' ')[0]}</span>
        <span className="date-year">{new Date(post.date).getFullYear()}</span>
      </motion.div>
      <div className="blog-post-content">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-content">
          {contentSections}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;