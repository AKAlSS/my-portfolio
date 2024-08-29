import React from 'react';

const BlogPost = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <article className="blog-post">
      <div className="post-date">
        <span>{formatDate(post.date)}</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <div className="post-content">{post.content}</div>
    </article>
  );
};

export default BlogPost;