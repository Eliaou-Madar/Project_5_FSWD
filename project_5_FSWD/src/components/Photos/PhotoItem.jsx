import React, { useState } from 'react';
import './PhotoItem.css'
export default function PhotoItem({ photo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editUrl, setEditUrl] = useState(photo.url);
  const [editTitle, setEditTitle] = useState(photo.title);

  const handleSave = () => {
    if (!editUrl || !editTitle) return;
    onEdit(photo.id, { url: editUrl, title: editTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditUrl(photo.url);
    setEditTitle(photo.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure to delete this photo')) {
      onDelete(photo.id);
    }
  };

  if (isEditing) {
    return (
      <div className="photo-item editing">
        <div className="photo-edit-form">
          <input
            type="url"
            value={editUrl}
            onChange={e => setEditUrl(e.target.value)}
            placeholder="Url"
          />
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <div className="photo-edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-item">
      <img src={photo.url} alt={photo.title} />
      <div className="photo-info">
        <p>{photo.title}</p>
        <div className="photo-actions">
          <button 
            onClick={() => setIsEditing(true)} 
            className="edit-btn"
          >
            Modifiy
          </button>
          <button 
            onClick={handleDelete} 
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}