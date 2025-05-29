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

function generateIdString() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return String(n) // return string 
}


export async function register(username, password) {
  const existing = await api.get(`/users?username=${username}`)
  if (existing.length) return null
  // tentative create with minimal fields; full details collected later
  const user = await api.post('/users', {id:generateIdString(), username, website: password  })
  return user
}

export async function update(username, data) {
  // searche user by username
  const existing = await api.get(`/users?username=${username}`)
  if (!existing.length) return null // no founding

  const user = existing[0]

  // Update with PUT
  const updated = await api.put(`/users/${user.id}`, {
    ...user,      // keep
    ...data       // apply the new data
  })

  return updated
}
