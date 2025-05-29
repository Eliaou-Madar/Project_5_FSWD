import AlbumItem from './AlbumItem';

export default function AlbumList({ albums, onSelect }) {
  return (
    <ul className="albums-list">
      {albums.map(album => (
        <AlbumItem key={album.id} album={album} onSelect={onSelect} />
      ))}
    </ul>
  );
}
