import React, { useState } from 'react';

export default function CommentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !body) return;
    onAdd({ name, email, body });
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}
