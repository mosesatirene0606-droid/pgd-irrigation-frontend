// src/components/RequireAuth.js

import { useAuth } from "../api/context/AuthContext";

export default function RequireAuth({ children, setScreen }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    setScreen("login");
    return null;
  }

  return children;
}
