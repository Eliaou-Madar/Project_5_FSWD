import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import Register from '../components/Auth/Register.jsx'
import UserInfoForm from '../components/Auth/UserInfoForm.jsx'
import './RegisterPage.css'

export default function RegisterPage() {
  const { register, update } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formStep, setFormStep] = useState(1)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  const handleRegister = async ({ username, password, verify }) => {
    if (password !== verify) {
      setError('Passwords are not matching')
      return
    }
    
    const user = await register(username, password)
    if (user) {
      setCurrentUser({ username, ...user })
      setFormStep(2) // Passer au formulaire d'informations
      setError('')
    } else {
      setError("Username already exist")
    }
  }

  const handleUserInfoSubmit = async (formData) => {
    if (!currentUser) return
    
    const updated = await update(currentUser.username, formData)
    if (updated) {
      navigate(`/users/${updated.id}/home`)
    } else {
      alert("Update failure.")
    }
  }

  const handleCancel = () => {
    setFormStep(1)
    setCurrentUser(null)
    setError('')
  }

  return (
    <div className="auth-page">
      {formStep === 1 && (
        <Register 
          onRegister={handleRegister}
          error={error}
        />
      )}

      {formStep === 2 && (
        <UserInfoForm 
          onSubmit={handleUserInfoSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}