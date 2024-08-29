import React from 'react';

const BlogPost = ({ post }) => {
  return (
    <article className="blog-post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
      <div className="post-content">{post.content}</div>
    </article>
  );
};

export default BlogPost;