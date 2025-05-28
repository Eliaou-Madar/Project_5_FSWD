// src/router.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import HomePage from './pages/HomePage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import TodosPage from './pages/TodosPage.jsx'
import PostsPage from './pages/PostsPage.jsx'
import AlbumsPage from './pages/AlbumsPage.jsx'
import AlbumPhotosPage from './pages/AlbumPhotosPage.jsx'

import PrivateRoute from './components/Auth/PrivateRoute.jsx'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentification publique */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Zone protégée, préfixe users/:userId */}
      <Route
        path="/users/:userId/*"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="albums/:albumId/photos" element={<AlbumPhotosPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
