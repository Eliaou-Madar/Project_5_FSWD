import React from 'react';

export default function AlbumItem({ album, onSelect, userId }) {
  return (
    <li className="album-item">
      <span className="album-id">{album.id}.</span>
      <button
        className="album-link"
        onClick={() => onSelect(album)}
      >
        {album.title}
      </button>
    </li>
  );
}


