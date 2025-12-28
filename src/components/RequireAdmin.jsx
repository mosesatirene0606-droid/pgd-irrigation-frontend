// src/components/RequireAdmin.jsx

import { useAuth } from "../api/context/AuthContext";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6">Checking permissions…</div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Access denied: Admins only
      </div>
    );
  }

  return children;
}
