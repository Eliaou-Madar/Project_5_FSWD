// src/pages/AlbumsPage.jsx
import './AlbumsPage.css'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { albumService } from '../services/albumService.js'
import AlbumForm from '../components/Albums/AlbumForm.jsx'

export default function AlbumsPage() {
  const { user } = useContext(AuthContext)
  const [albums, setAlbums] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const navigate = useNavigate()

  // Charger les albums de l'utilisateur
  useEffect(() => {
    albumService.fetchByUser(user.id).then(setAlbums)
  }, [user])

  // Ajouter un nouvel album
  const handleAdd = async data => {
    const created = await albumService.create(user.id, data)
    setAlbums(prev => [...prev, created])
  }

  // Filtrage par ID et titre
  const displayed = albums
    .filter(a => (searchId ? a.id.toLowerCase().includes(searchId.toLocaleLowerCase()) : true))
    .filter(a =>
      searchTitle
        ? a.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true
    )

  return (
    <section className="albums-page">
      <h2>Mes Albums</h2>

      {/* Formulaire de création */}
      <AlbumForm onAdd={handleAdd} />

      {/* Recherche d'albums */}
      <div className="albums-search">
        <label>
          Filtrer ID:
          <input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="ID exact"
          />
        </label>
        <label>
          Filtrer Titre:
          <input
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            placeholder="Titre contient..."
          />
        </label>
      </div>

      {/* Liste des albums */}
      <ul className="albums-list">
        {displayed.map(album => (
          <li key={album.id} className="album-item">
            <span className="album-id">{album.id}.</span>
            <button
              className="album-link"
              onClick={() =>
              navigate(`/users/${user.id}/albums/${album.id}/photos`)
              }
            >
              {album.title}
            </button>
          </li>
        ))}
      </ul>

      {displayed.length === 0 && <p>Aucun album ne correspond aux critères.</p>}
    </section>
  )
}
