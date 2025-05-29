import React, { useState } from 'react';

export default function CommentForm({ onAdd, defaultName = '', defaultEmail = '' }) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!body.trim()) return;
    onAdd({ name: name || defaultName, email: email || defaultEmail, body });
    setBody(''); // Reset only body, keep name and email
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Votre nom"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Votre email"
        type="email"
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Votre commentaire..."
      />
      <button type="submit">Ajouter Commentaire</button>
    </form>
  );
}