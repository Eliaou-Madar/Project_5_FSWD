import React from 'react';

export default function PostItem({ 
  post, 
  onSelect, 
  isSelected,
  isEditing,
  editingTitle,
  editingBody,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onDelete,
  onEditingTitleChange,
  onEditingBodyChange
}) {
  return (
    <li className={isSelected ? 'selected' : ''}>
      <span className="post-id">{post.id}.</span>
      <span className="post-title">{post.title}</span>
      <div className="post-actions">
        <button onClick={() => onSelect(post)}>
          {isSelected ? 'Désélectionner' : 'Sélectionner'}
        </button>
        <button onClick={() => onStartEditing(post)}>✏️</button>
        <button onClick={() => onDelete(post.id)}>🗑️</button>
      </div>
      
      {/* Inline edit */}
      {isEditing && (
        <div className="post-edit">
          <input
            value={editingTitle}
            onChange={e => onEditingTitleChange(e.target.value)}
            placeholder="Titre du post"
          />
          <textarea
            value={editingBody}
            onChange={e => onEditingBodyChange(e.target.value)}
            placeholder="Contenu du post"
          />
          <button onClick={() => onSaveEditing(post.id)}>💾</button>
          <button onClick={onCancelEditing}>✖️</button>
        </div>
      )}
    </li>
  );
}