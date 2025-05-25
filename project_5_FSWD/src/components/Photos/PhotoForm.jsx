import React, { useState } from 'react';

export default function PhotoForm({ onAdd }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!url || !title) return;
    onAdd({ url, title });
    setUrl('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Photo URL"
      />
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Photo title"
      />
      <button type="submit">Add Photo</button>
    </form>
  );
}
