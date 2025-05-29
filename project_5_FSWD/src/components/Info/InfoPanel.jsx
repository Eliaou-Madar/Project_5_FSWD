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

  if (!user) return <p>Loading...</p>

  return (
    <div className="info-panel">
      <h2>Your Welcome, {user.username}</h2>

      {!editing ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>User name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone number:</strong> {user.phone}</p>
          <p><strong>Password:</strong> {user.website}</p>
          <p><strong>Adress:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city} ({user.address?.zipcode})</p>
          <p><strong>Location:</strong> {user.address?.geo?.lat}, {user.address?.geo?.lng}</p>
          <p><strong>Company:</strong> {user.company?.name}</p>
          <p><strong>Catch Phrase:</strong> {user.company?.catchPhrase}</p>
          <p><strong>Activity:</strong> {user.company?.bs}</p>
          <button onClick={() => setEditing(true)}>Modify</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Identity</h4>
          <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} />
          <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} />
          <input name="phone" placeholder="Phone number" value={form.phone || ''} onChange={handleChange} />
          <input name="website" placeholder="Web site" value={form.website || ''} onChange={handleChange} />

          <h4>Adress</h4>
          <input name="street" placeholder="Street" value={form.address?.street || ''} onChange={e => handleChange(e, 'address')} />
          <input name="suite" placeholder="Suite" value={form.address?.suite || ''} onChange={e => handleChange(e, 'address')} />
          <input name="city" placeholder="City" value={form.address?.city || ''} onChange={e => handleChange(e, 'address')} />
          <input name="zipcode" placeholder="Zipcode" value={form.address?.zipcode || ''} onChange={e => handleChange(e, 'address')} />

          <h4>Location</h4>
          <input name="lat" placeholder="Lat" value={form.address?.geo?.lat || ''} onChange={e => handleChange(e, 'address', 'geo')} />
          <input name="lng" placeholder="Lng" value={form.address?.geo?.lng || ''} onChange={e => handleChange(e, 'address', 'geo')} />

          <h4>Company</h4>
          <input name="name" placeholder="Company name" value={form.company?.name || ''} onChange={e => handleChange(e, 'company')} />
          <input name="catchPhrase" placeholder="Catch Phrase" value={form.company?.catchPhrase || ''} onChange={e => handleChange(e, 'company')} />
          <input name="bs" placeholder="Activity" value={form.company?.bs || ''} onChange={e => handleChange(e, 'company')} />

          <button type="submit">Sign up</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  )
}
