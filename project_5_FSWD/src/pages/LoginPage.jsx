/* src/pages/LoginPage.jsx */
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import Login from '../components/Auth/Login.jsx'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = async (username, password) => {
    const user = await login(username, password)
    if (user) {
      // Redirection vers /users/:userId/home
      navigate(`/users/${user.id}/home`, { replace: true })
    } else {
      setError('Username or password invalid')
    }
  }

  return (
    <Login onLogin={handleLogin} error={error} />
  )
}