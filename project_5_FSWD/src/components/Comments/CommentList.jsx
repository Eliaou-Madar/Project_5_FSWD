import React from 'react';
import CommentItem from './CommentItem';

export default function CommentList({ 
  comments, 
  currentUserEmail,
  editingCommentId,
  editingCommentBody,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  onDelete,
  onEditingBodyChange
}) {
  return (
    <ul className="comments-list">
      {comments.map(comment => (
        <CommentItem 
          key={comment.id} 
          comment={comment}
          isEditing={editingCommentId === comment.id}
          editingBody={editingCommentBody}
          canEdit={comment.email === currentUserEmail}
          onStartEditing={onStartEditing}
          onSaveEditing={onSaveEditing}
          onCancelEditing={onCancelEditing}
          onDelete={onDelete}
          onEditingBodyChange={onEditingBodyChange}
        />
      ))}
    </ul>
  );
}