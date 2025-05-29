/* src/pages/HomePage.jsx */
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Layout/Header.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

export default function HomePage() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="app-layout">
      <Header />
      <div className="content-area">
        <main>
          <h1>Hello, {user.username}!</h1>
          <Outlet />
        </main>
      </div>
    </div>
  )
}