import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ 
  todos, 
  editingId,
  editingTitle,
  onToggle,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onDelete,
  onEditingTitleChange
}) {
  return (
    <ul className="todos-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          isEditing={editingId === todo.id}
          editingTitle={editingTitle}
          onToggle={onToggle}
          onStartEditing={onStartEditing}
          onSaveEditing={onSaveEditing}
          onCancelEditing={onCancelEditing}
          onDelete={onDelete}
          onEditingTitleChange={onEditingTitleChange}
        />
      ))}
    </ul>
  );
}