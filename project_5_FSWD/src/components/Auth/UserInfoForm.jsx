import React, { useState } from 'react'

export default function UserInfoForm({ onSubmit, onCancel }) {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>More Information</h3>
        <form onSubmit={handleSubmit}>
          <input 
            name="name" 
            placeholder="Full name" 
            value={form.name} 
            onChange={handleChange} 
          />
          <input 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
          />
          <input 
            name="phone" 
            placeholder="Phone number" 
            value={form.phone} 
            onChange={handleChange} 
          />

          <h4>Adresse</h4>
          <input 
            name="street" 
            placeholder="Street" 
            value={form.address.street} 
            onChange={e => handleChange(e, 'address')} 
          />
          <input 
            name="suite" 
            placeholder="Suite" 
            value={form.address.suite} 
            onChange={e => handleChange(e, 'address')} 
          />
          <input 
            name="city" 
            placeholder="City" 
            value={form.address.city} 
            onChange={e => handleChange(e, 'address')} 
          />
          <input 
            name="zipcode" 
            placeholder="Zipcode" 
            value={form.address.zipcode} 
            onChange={e => handleChange(e, 'address')} 
          />

          <h4>Géolocalisation</h4>
          <input 
            name="lat" 
            placeholder="Lat" 
            value={form.address.geo.lat} 
            onChange={e => handleChange(e, 'address', 'geo')} 
          />
          <input 
            name="lng" 
            placeholder="Lng" 
            value={form.address.geo.lng} 
            onChange={e => handleChange(e, 'address', 'geo')} 
          />

          <h4>Entreprise</h4>
          <input 
            name="name" 
            placeholder="Company name" 
            value={form.company.name} 
            onChange={e => handleChange(e, 'company')} 
          />
          <input 
            name="catchPhrase" 
            placeholder="Catch Phrase" 
            value={form.company.catchPhrase} 
            onChange={e => handleChange(e, 'company')} 
          />
          <input 
            name="bs" 
            placeholder="Activity" 
            value={form.company.bs} 
            onChange={e => handleChange(e, 'company')} 
          />

          <div className="modal-buttons">
            <button type="submit">Submit</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  )
}