import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend or newsletter service
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </section>
  );
};

export default Newsletter;