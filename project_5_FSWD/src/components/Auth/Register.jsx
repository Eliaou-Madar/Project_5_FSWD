import React, { useState } from 'react'

export default function Register({ onRegister, error }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister({ username, password, verify })
  }

  return (
    <div className="register-form">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <input
          type="password"
          value={verify}
          onChange={e => setVerify(e.target.value)}
          placeholder="Vérification du mot de passe"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  )
}