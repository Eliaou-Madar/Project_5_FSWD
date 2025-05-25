import React from 'react';
import AlbumItem from './AlbumItem';

export default function AlbumList({ albums, onSelect }) {
  return (
    <ul>
      {albums.map(album => (
        <AlbumItem key={album.id} album={album} onSelect={onSelect} />
      ))}
    </ul>
  );
}
