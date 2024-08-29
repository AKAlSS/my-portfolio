import React from 'react';

const BlogPost = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatContent = (content) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('•')) {
        const listItems = paragraph.split('•').filter(item => item.trim() !== '');
        return (
          <ul key={index}>
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item.trim()}</li>
            ))}
          </ul>
        );
      } else if (paragraph.match(/^\d+\./)) {
        const listItems = paragraph.split(/\d+\./).filter(item => item.trim() !== '');
        return (
          <ol key={index}>
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item.trim()}</li>
            ))}
          </ol>
        );
      } else if (paragraph.startsWith('#')) {
        return <h3 key={index}>{paragraph.replace('#', '').trim()}</h3>;
      } else {
        return <p key={index}>{paragraph}</p>;
      }
    });
  };

  return (
    <article className="blog-post">
      <div className="post-date">
        <span>{formatDate(post.date)}</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <div className="post-content">{formatContent(post.content)}</div>
    </article>
  );
};

export default BlogPost;