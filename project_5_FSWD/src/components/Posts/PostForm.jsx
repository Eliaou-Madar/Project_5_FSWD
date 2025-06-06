import React, { useState } from 'react';

export default function PostForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onAdd({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post Title"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Post content"
      />
      <button type="submit">Add Post</button>
    </form>
  );
}