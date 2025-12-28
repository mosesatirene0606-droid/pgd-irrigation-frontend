// src/api/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import API from "../client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Attach token to Axios and auto-load user
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      delete API.defaults.headers.common["Authorization"];
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // Fetch logged-in user from backend
  async function fetchUser() {
    try {
      const res = await API.get("/api/auth/me"); // 🔥 UPDATED
      setUser(res.data.user);
    } catch (err) {
      console.log("Token invalid or expired");
      logout();
    } finally {
      setLoading(false);
    }
  }

  // Login user
  async function login(email, password) {
    const res = await API.post("/api/auth/login", { email, password }); // 🔥 UPDATED

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);

    return true;
  }

  // Register user
  async function register(name, email, password) {
    const res = await API.post("/api/auth/register", { name, email, password }); // 🔥 UPDATED
    return res.data;
  }

  // Logout user
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}
