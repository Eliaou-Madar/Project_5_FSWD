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
        placeholder="Titre du post"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Contenu du post"
      />
      <button type="submit">Ajouter Post</button>
    </form>
  );
}