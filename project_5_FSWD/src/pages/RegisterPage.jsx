import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import './RegisterPage.css' // CSS qu’on va créer juste après

export default function RegisterPage() {
  const { register, update } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formStep, setFormStep] = useState(1)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  })

  const handleRegister = async e => {
    e.preventDefault()
    if (password !== verify) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    const u = await register(username, password)
    if (u) {
      setFormStep(2) // display the form
    } else {
      setError("Ce nom d'utilisateur existe déjà")
    }
  }

  const handleChange = (e, nested, subNested) => {
    const { name, value } = e.target
    if (nested && subNested) {
      setForm(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [subNested]: {
            ...prev[nested]?.[subNested],
            [name]: value
          }
        }
      }))
    } else if (nested) {
      setForm(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [name]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleUserInfoSubmit = async e => {
    e.preventDefault()
    const updated = await update(username, form)
    if (updated) {
      setFormStep(1)
      navigate(`/users/${updated.id}/home`)
    } else {
      alert("Échec de la mise à jour.")
    }
  }

  return (
    <div className="auth-page">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister}>
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

      {/* ✅ Modal Formulaire info utilisateur */}
      {formStep === 2 && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Complétez vos informations</h3>
            <form onSubmit={handleUserInfoSubmit}>
              <input name="name" placeholder="Nom complet" value={form.name} onChange={handleChange} />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
              <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} />

              <h4>Adresse</h4>
              <input name="street" placeholder="Rue" value={form.address.street} onChange={e => handleChange(e, 'address')} />
              <input name="suite" placeholder="Complément" value={form.address.suite} onChange={e => handleChange(e, 'address')} />
              <input name="city" placeholder="Ville" value={form.address.city} onChange={e => handleChange(e, 'address')} />
              <input name="zipcode" placeholder="Code postal" value={form.address.zipcode} onChange={e => handleChange(e, 'address')} />

              <h4>Géolocalisation</h4>
              <input name="lat" placeholder="Latitude" value={form.address.geo.lat} onChange={e => handleChange(e, 'address', 'geo')} />
              <input name="lng" placeholder="Longitude" value={form.address.geo.lng} onChange={e => handleChange(e, 'address', 'geo')} />

              <h4>Entreprise</h4>
              <input name="name" placeholder="Nom de l'entreprise" value={form.company.name} onChange={e => handleChange(e, 'company')} />
              <input name="catchPhrase" placeholder="Devise" value={form.company.catchPhrase} onChange={e => handleChange(e, 'company')} />
              <input name="bs" placeholder="Activité" value={form.company.bs} onChange={e => handleChange(e, 'company')} />

              <button type="submit">Valider</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
