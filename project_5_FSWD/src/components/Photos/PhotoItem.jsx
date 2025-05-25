import React from 'react';

export default function PhotoItem({ photo }) {
  return (
    <div className="photo-item">
      <img src={photo.url} alt={photo.title} />
      <p>{photo.title}</p>
    </div>
  );
}
