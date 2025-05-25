import React from 'react';
import PhotoItem from './PhotoItem';

export default function PhotoGallery({ photos }) {
  return (
    <div className="photo-gallery">
      {photos.map(photo => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
