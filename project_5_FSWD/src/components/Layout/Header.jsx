// src/components/Layout/Header.jsx
import React, { useContext } from 'react'
import './Header.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const base = user ? `/users/${user.id}` : '/'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-header">
      <h1>My App</h1>
      <nav className="header-nav">
        <Link 
          to={`${base}/home`} 
          className={location.pathname.startsWith(`${base}/home`) ? 'active' : ''}
        >
          Home
        </Link>
        <Link 
          to={`${base}/info`} 
          className={location.pathname.startsWith(`${base}/info`) ? 'active' : ''}
        >
          Info
        </Link>
        <Link 
          to={`${base}/todos`} 
          className={location.pathname.startsWith(`${base}/todos`) ? 'active' : ''}
        >
          Todos
        </Link>
        <Link 
          to={`${base}/posts`} 
          className={location.pathname.startsWith(`${base}/posts`) ? 'active' : ''}
        >
          Posts
        </Link>
        <Link 
          to={`${base}/albums`} 
          className={location.pathname.startsWith(`${base}/albums`) ? 'active' : ''}
        >
          Albums
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  )
}
