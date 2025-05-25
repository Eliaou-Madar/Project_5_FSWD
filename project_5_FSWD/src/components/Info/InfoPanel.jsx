import React from 'react';

export default function InfoPanel({ user }) {
  if (!user) return null;
  return (
    <section>
      <h2>{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* add more fields as needed */}
    </section>
  );
}
