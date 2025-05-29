import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nouveau todo..."
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}