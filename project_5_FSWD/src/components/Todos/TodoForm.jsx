import React, { useState } from 'react';

export default function TodoForm({ 
  onAdd,
  sortBy,
  setSortBy,
  filterId,
  setFilterId,
  filterTitle,
  setFilterTitle,
  filterStatus,
  setFilterStatus
}) {
  const [title, setTitle] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false });
    setTitle('');
  };

  return (
    <div className="todo-form-container">
      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Todo..."
        />
        <button type="submit">Add</button>
      </form>

      {/* Contrôles de tri et filtrage */}
      <div className="todos-controls">
        <label>
          Sort by:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
          </select>
        </label>

        <label>
          Filter by ID:
          <input
            value={filterId}
            onChange={e => setFilterId(e.target.value)}
            placeholder="Filter by ID..."
          />
        </label>

        <label>
          Filter by Title:
          <input
            value={filterTitle}
            onChange={e => setFilterTitle(e.target.value)}
            placeholder="Searching..."
          />
        </label>

        <label>
          Status:
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
    </div>
  );
}