// src/pages/AlbumPhotosPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PhotoGallery from '../components/Photos/PhotoGallery';
import PhotoForm from '../components/Photos/PhotoForm';
import { photoService } from '../services/photoService';
import { AuthContext } from '../context/AuthContext';
import './AlbumPhotosPage.css';

export default function AlbumPhotosPage() {
  const { albumId } = useParams();
  const { user } = useContext(AuthContext);

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  // Reset state when albumId changes
  useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  }, [albumId]);

  // Fetch 10 photos per page
  useEffect(() => {
    if (!hasMore) return;

    photoService
      .fetchByAlbum(albumId, { page, limit })
      .then(fetched => {
        setPhotos(prev =>
          page === 1 ? fetched : [...prev, ...fetched]
        );
        if (fetched.length < limit) {
          setHasMore(false);
        }
      })
      .catch(err => {
        console.error('Fetch Error :', err);
        alert("Impossible to load the photo");
      });
  }, [albumId, page, hasMore]);

  // Add a new photo
  const handleAdd = async data => {
    try {
      const created = await photoService.create(albumId, data);
      setPhotos(prev => [created, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Error while adding the photo");
    }
  };

  // Edit an existing photo
  const handleEditPhoto = async (photoId, data) => {
    try {
      const updated = await photoService.update(photoId, data);
      setPhotos(prev =>
        prev.map(p => (p.id === photoId ? { ...p, ...updated } : p))
      );
    } catch (err) {
      console.error('Update Error :', err);
      alert("Error while updating the photo");
    }
  };

  // Delete a photo
  const handleDeletePhoto = async photoId => {
    try {
      await photoService.delete(photoId);
      setPhotos(prev => prev.filter(p => p.id !== photoId));
    } catch (err) {
      console.error('Deletion Error :', err);
      alert("Error while deleting the photo");
    }
  };

  return (
    <section className="album-photos-page">
      <h2>Album #{albumId} — Photos</h2>

      <PhotoForm onAdd={handleAdd} />

      <PhotoGallery
        photos={photos}
        onEditPhoto={handleEditPhoto}
        onDeletePhoto={handleDeletePhoto}
      />

      {hasMore && (
        <button
          className="load-more"
          onClick={() => setPage(prev => prev + 1)}
        >
          Load more
        </button>
      )}
    </section>
  );
}
