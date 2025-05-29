import React from 'react';

export default function TodoItem({ 
  todo, 
  isEditing,
  editingTitle,
  onToggle,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onDelete,
  onEditingTitleChange
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {isEditing ? (
        <>
          <input
            value={editingTitle}
            onChange={e => onEditingTitleChange(e.target.value)}
            placeholder="Titre du todo..."
          />
          <button onClick={() => onSaveEditing(todo.id)}>💾</button>
          <button onClick={onCancelEditing}>✖️</button>
        </>
      ) : (
        <>
          <span className="todo-id">{todo.id}</span>
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <div className="todo-actions">
            <button onClick={() => onStartEditing(todo)}>✏️</button>
            <button onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </>
      )}
    </li>
  );
}