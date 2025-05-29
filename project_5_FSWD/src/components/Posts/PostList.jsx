import React from 'react';
import PostItem from './PostItem';

export default function PostList({ 
  posts, 
  onSelect, 
  selectedPost,
  editingPostId,
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
    <ul className="posts-list">
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          onSelect={onSelect}
          isSelected={selectedPost?.id === post.id}
          isEditing={editingPostId === post.id}
          editingTitle={editingTitle}
          editingBody={editingBody}
          onStartEditing={onStartEditing}
          onSaveEditing={onSaveEditing}
          onCancelEditing={onCancelEditing}
          onDelete={onDelete}
          onEditingTitleChange={onEditingTitleChange}
          onEditingBodyChange={onEditingBodyChange}
        />
      ))}
    </ul>
  );
}