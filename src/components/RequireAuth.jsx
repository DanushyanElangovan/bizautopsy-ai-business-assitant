import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * RequireAuth
 * Wraps the main app routes and redirects to /login whenever the
 * 'bizautopsy_auth' flag isn't set in localStorage.
 */
export default function RequireAuth({ children }) {
  const location = useLocation();
  const isAuthed = localStorage.getItem('bizautopsy_auth') === 'true';

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}