import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Shield, FileText } from "lucide-react";
import API from "../api/client";
import BackendConsole from "./BackendConsole";

/* ---------- View Toggle Button ---------- */
function ViewToggle({ active, icon: Icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${
          active
            ? "bg-emerald-500 text-white shadow"
            : "text-slate-600 hover:bg-slate-100"
        }
      `}>
      <Icon className="size-4" />
      {children}
    </button>
  );
}

/* ---------- Admin View ---------- */
export default function AdminView() {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await API.get("/api/admin/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(id, role) {
    try {
      await API.put(`/api/admin/users/${id}/role`, { role });
      loadUsers();
    } catch (err) {
      console.error("Failed to update role", err);
      alert("Failed to update user role");
    }
  }

  return (
    <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
          relative overflow-hidden rounded-3xl
          bg-white/80 backdrop-blur-xl
          border border-white/20
          shadow-xl
          p-6 sm:p-8
        ">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-emerald-900 flex items-center gap-2">
            <Shield className="size-6 text-emerald-600" />
            Admin Control Center
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage users, permissions, and system activity
          </p>
        </div>

        {/* View Switcher */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-6">
          <ViewToggle
            active={view === "users"}
            icon={Users}
            onClick={() => setView("users")}>
            Users
          </ViewToggle>

          <ViewToggle
            active={view === "logs"}
            icon={FileText}
            onClick={() => setView("logs")}>
            System Logs
          </ViewToggle>
        </div>

        {/* ================= USERS TABLE ================= */}
        {view === "users" && (
          <div className="relative z-10">
            {loading ? (
              <div className="text-slate-600">Loading users…</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Role</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-emerald-50 transition">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {u.name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{u.email}</td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role}
                            onChange={(e) => changeRole(u.id, e.target.value)}
                            className="
                              rounded-lg px-3 py-1.5 text-sm
                              bg-white border border-slate-300
                              focus:outline-none focus:ring-2
                              focus:ring-emerald-400/60
                            ">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="p-4 text-slate-500 text-center">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= LOGS ================= */}
        {view === "logs" && (
          <div className="relative z-10">
            <BackendConsole />
          </div>
        )}
      </motion.div>
    </div>
  );
}
