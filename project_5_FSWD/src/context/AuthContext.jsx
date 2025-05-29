/* src/context/AuthContext.jsx */
import React, { createContext, useState, useEffect } from 'react'
import { login as loginService, register as registerService, update as updateService } from '../services/authService'
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
      return u       // return full user 
    }
    return null
  }


  async function register(username, password) {
    const u = await registerService(username, password)
    if (u) {
      setUser(u)
      setItem('user', u)
      return u
    }
    return null
  }

 async function update(username, data) {
  const u = await updateService(username, data)
  if (u) {
    setUser(u)
    setItem('user', u)
    return u
  }
  return null
}



  function logout() {
    setUser(null)
    removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register,update, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
