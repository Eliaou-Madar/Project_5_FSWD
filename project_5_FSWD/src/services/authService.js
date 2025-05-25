/* src/services/authService.js */
import api from './api'

export async function login(username, password) {
  const users = await api.get(`/users?username=${username}`)
  const user = users[0]
  // password is validated against the 'website' field
  if (user && user.website === password) {
    return user
  }
  return null
}

export async function register(username, password) {
  const existing = await api.get(`/users?username=${username}`)
  if (existing.length) return null
  // tentative create with minimal fields; full details collected later
  const user = await api.post('/users', { username, website: password })
  return user
}