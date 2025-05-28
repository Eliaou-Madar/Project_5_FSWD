/* src/pages/LoginPage.jsx */
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const user = await login(username, password)
    if (user) {
      // Redirection vers /users/:userId/info
      navigate(`/users/${user.id}/home`, { replace: true })
    } else {
     setError('Utilisateur ou mot de passe invalide')
    }
  }

   return (
     <div className="auth-page">
       <h2>Connexion</h2>
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
           placeholder="Mot de passe (website)"
           required
         />
         <button type="submit">Se connecter</button>
       </form>
       <p>
         Pas encore de compte ? <Link to="/register">Inscription</Link>
       </p>
     </div>
   )
}