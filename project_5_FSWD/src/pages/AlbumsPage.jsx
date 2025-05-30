// src/pages/AlbumsPage.jsx
import './AlbumsPage.css'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { albumService } from '../services/albumService.js'
import AlbumForm from '../components/Albums/AlbumForm.jsx'
import AlbumList from '../components/Albums/AlbumList.jsx'

export default function AlbumsPage() {
  const { user } = useContext(AuthContext)
  const [albums, setAlbums] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const navigate = useNavigate()

  // Charger les albums de l'utilisateur
  useEffect(() => {
    albumService.fetchByUser(user.id).then(data => {
        console.log(user.id)
        setAlbums(data)
      })
  }, [user])

  // Ajouter un nouvel album
  const handleAdd = async data => {
    const created = await albumService.create(user.id, data)
    setAlbums(prev => [...prev, created])
  }

  // Gérer la sélection d'un album (navigation)
  const handleSelectAlbum = (album) => {
    navigate(`/users/${user.id}/albums/${album.id}/photos`)
  }

  // Filtrage par ID et titre
  const displayed = albums
    .filter(a => (searchId ? a.id.toLowerCase().includes(searchId.toLowerCase()) : true))
    .filter(a =>
      searchTitle
        ? a.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true
    )

  return (
    <section className="albums-page">
      <h2>My Albums</h2>

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
          Filtrer Title:
          <input
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            placeholder="Titre content..."
          />
        </label>
      </div>

      {/* Albums list */}
      <div className="albums-list-container">
        <AlbumList 
          albums={displayed} 
          onSelect={handleSelectAlbum}
          userId={user.id}
        />
        {displayed.length === 0 && <p>No founding...</p>}
      </div>
    </section>
  )
}