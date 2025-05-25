/* src/pages/RegisterPage.jsx */
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function RegisterPage() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== verify) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    const ok = await register(username, password)
    if (ok) navigate(`/users/${u.id}/info`)
    else setError("Ce nom d'utilisateur existe déjà")
  }

  return (
    <div className="auth-page">
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