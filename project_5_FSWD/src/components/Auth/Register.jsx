import React, { useState } from 'react'

export default function Register({ onRegister, error }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister({ username, password, verify })
  }

  return (
    <div className="register-form">
      <h2>Registration</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <input
          type="password"
          value={verify}
          onChange={e => setVerify(e.target.value)}
          placeholder="verify password"
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}