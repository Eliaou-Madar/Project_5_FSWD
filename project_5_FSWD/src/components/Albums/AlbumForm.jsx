import React, { useState } from 'react';

export default function AlbumForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New album title"
      />
      <button type="submit">Add Album</button>
    </form>
  );
}
