import React, { useContext } from 'react';
import InfoPanel from '../components/Info/InfoPanel';
import { AuthContext } from '../context/AuthContext';

export default function InfoPage() {
  const { user } = useContext(AuthContext);

  return (
    <section>
      <h2>My Info</h2>
      <InfoPanel user={user} />
    </section>
  );
}
