/* src/context/AuthContext.jsx */
import React, { createContext, useState, useEffect } from 'react'
import { login as loginService, register as registerService } from '../services/authService'
import { getItem, setItem, removeItem } from '../utils/storage'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const saved = getItem('user')
    if (saved) setUser(saved)
  }, [])

  async function login(username, password) {
    const u = await loginService(username, password)
    if (u) {
      setUser(u)
      setItem('user', u)
      return u       // on renvoie l'utilisateur complet
    }
    return null
  }

  async function register(username, password) {
    const u = await registerService(username, password)
    if (u) {
      setUser(u)
      setItem('user', u)
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
    removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
