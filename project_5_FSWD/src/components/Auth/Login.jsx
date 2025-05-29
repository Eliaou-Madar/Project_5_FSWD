/* src/components/Login.jsx */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login({ onLogin, error }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="auth-page">
      <h2>Sign in</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account ? <Link to="/register">Sign up</Link>
      </p>
    </div>
  )
}