import React from 'react';

export default function CommentItem({ 
  comment, 
  isEditing,
  editingBody,
  canEdit,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onDelete,
  onEditingBodyChange
}) {
  return (
    <li>
      {isEditing ? (
        <>
          <textarea
            value={editingBody}
            onChange={e => onEditingBodyChange(e.target.value)}
            placeholder="Your comment..."
          />
          <div className="comment-actions">
            <button onClick={() => onSaveEditing(comment.id)}>💾</button>
            <button onClick={onCancelEditing}>✖️</button>
          </div>
        </>
      ) : (
        <>
          <p className="comment-body">{comment.body}</p>
          <p className="comment-meta">
            — {comment.name} ({comment.email})
          </p>
          {canEdit && (
            <div className="comment-actions">
              <button onClick={() => onStartEditing(comment)}>✏️</button>
              <button onClick={() => onDelete(comment.id)}>🗑️</button>
            </div>
          )}
        </>
      )}
    </li>
  );
}