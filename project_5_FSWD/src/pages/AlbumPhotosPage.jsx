import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhotoGallery from '../components/Photos/PhotoGallery';
import PhotoForm from '../components/Photos/PhotoForm';
import { photoService } from '../services/photoService';
import './AlbumPhotosPage.css'

export default function AlbumPhotosPage() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    photoService.fetchByAlbum(albumId, { page }).then(fetched =>
      setPhotos(prev => [...prev, ...fetched])
    );
  }, [albumId, page]);

  const handleAdd = async data => {
    const created = await photoService.create(albumId, data);
    setPhotos(prev => [...prev, created]);
  };

  return (
    <section>
      <h2>Album #{albumId} Photos</h2>
      <PhotoForm onAdd={handleAdd} />
      <PhotoGallery photos={photos} />
      <button onClick={() => setPage(p => p + 1)}>Load More</button>
    </section>
  );
}
