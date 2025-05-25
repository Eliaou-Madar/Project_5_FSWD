import { VITE_API_BASE_URL } from '../utils/constants'

const baseUrl = import.meta.env.VITE_API_BASE_URL || VITE_API_BASE_URL

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || res.statusText)
  }
  return res.json()
}

export default {
  get:    path => request(path),
  post:   (path, body) => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body) => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: path        => request(path, { method: 'DELETE' })
}
