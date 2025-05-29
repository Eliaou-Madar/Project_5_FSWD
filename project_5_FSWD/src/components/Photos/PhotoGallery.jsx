import React from 'react';
import PhotoItem from './PhotoItem';

export default function PhotoGallery({ photos, onEditPhoto, onDeletePhoto }) {
  return (
    <div className="photo-gallery">
      {photos.map(photo => (
        <PhotoItem 
          key={photo.id} 
          photo={photo} 
          onEdit={onEditPhoto}
          onDelete={onDeletePhoto}
        />
      ))}
    </div>
  );
}