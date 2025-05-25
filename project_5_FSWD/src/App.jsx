import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CacheProvider } from './context/CacheContext';
import Router from './router';

export default function App() {
  return (
    <AuthProvider>
      <CacheProvider>
        <Router />
      </CacheProvider>
    </AuthProvider>
  );
}
