import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'
import './InfoPanel.css' // ✅ Import the CSS file

export default function InfoPanel() {
  const { user, update } = useContext(AuthContext)
  const [form, setForm] = useState({})
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (user) setForm(user)
  }, [user])

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

  const handleSubmit = async e => {
    e.preventDefault()
    const updated = await update(user.username, form)
    if (updated) {
      setEditing(false)
    } else {
      alert("Échec de la mise à jour.")
    }
  }

  if (!user) return <p>Chargement...</p>

  return (
    <div className="info-panel">
      <h2>Bienvenue, {user.username}</h2>

      {!editing ? (
        <div>
          <p><strong>Nom:</strong> {user.name}</p>
          <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Téléphone:</strong> {user.phone}</p>
          <p><strong>Site Web:</strong> {user.website}</p>
          <p><strong>Adresse:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city} ({user.address?.zipcode})</p>
          <p><strong>Géolocalisation:</strong> {user.address?.geo?.lat}, {user.address?.geo?.lng}</p>
          <p><strong>Entreprise:</strong> {user.company?.name}</p>
          <p><strong>Devise:</strong> {user.company?.catchPhrase}</p>
          <p><strong>Activité:</strong> {user.company?.bs}</p>
          <button onClick={() => setEditing(true)}>Modifier</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Identité</h4>
          <input name="name" placeholder="Nom" value={form.name || ''} onChange={handleChange} />
          <input name="username" placeholder="Nom d'utilisateur" value={form.username || ''} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
          <input name="phone" placeholder="Téléphone" value={form.phone || ''} onChange={handleChange} />
          <input name="website" placeholder="Site Web" value={form.website || ''} onChange={handleChange} />

          <h4>Adresse</h4>
          <input name="street" placeholder="Rue" value={form.address?.street || ''} onChange={e => handleChange(e, 'address')} />
          <input name="suite" placeholder="Complément" value={form.address?.suite || ''} onChange={e => handleChange(e, 'address')} />
          <input name="city" placeholder="Ville" value={form.address?.city || ''} onChange={e => handleChange(e, 'address')} />
          <input name="zipcode" placeholder="Code postal" value={form.address?.zipcode || ''} onChange={e => handleChange(e, 'address')} />

          <h4>Géolocalisation</h4>
          <input name="lat" placeholder="Latitude" value={form.address?.geo?.lat || ''} onChange={e => handleChange(e, 'address', 'geo')} />
          <input name="lng" placeholder="Longitude" value={form.address?.geo?.lng || ''} onChange={e => handleChange(e, 'address', 'geo')} />

          <h4>Entreprise</h4>
          <input name="name" placeholder="Nom de l'entreprise" value={form.company?.name || ''} onChange={e => handleChange(e, 'company')} />
          <input name="catchPhrase" placeholder="Devise" value={form.company?.catchPhrase || ''} onChange={e => handleChange(e, 'company')} />
          <input name="bs" placeholder="Activité" value={form.company?.bs || ''} onChange={e => handleChange(e, 'company')} />

          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditing(false)}>Annuler</button>
        </form>
      )}
    </div>
  )
}
