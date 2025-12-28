import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Settings } from "lucide-react";
import API from "../api/client";

/* ---------- Reusable wrapper (import if already shared) ---------- */
function InputWrapper({ children }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-xl bg-emerald-400/10 opacity-0 group-focus-within:opacity-100 transition pointer-events-none" />
      {children}
    </div>
  );
}

/* ---------- Settings Page ---------- */
export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await API.get("/api/auth/me");
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await API.put("/api/users/me", {
        name,
        email,
        password: password || undefined,
      });

      alert("Profile updated successfully");
      setPassword("");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-600">Loading profile…</div>;
  }

  return (
    <div className="px-4 sm:px-6 py-6 max-w-3xl mx-auto">
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
        <div className="relative z-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-emerald-900 flex items-center gap-2">
            <Settings className="size-6 text-emerald-600" />
            User Settings
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage your account details and security
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={saveSettings}
          className="relative z-10 grid grid-cols-1 gap-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Full Name
            </label>
            <InputWrapper>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10"
                  placeholder="Your name"
                  required
                />
              </div>
            </InputWrapper>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Email Address
            </label>
            <InputWrapper>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </InputWrapper>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              New Password{" "}
              <span className="text-xs text-slate-400">(optional)</span>
            </label>
            <InputWrapper>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </InputWrapper>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={!saving ? { scale: 1.03 } : {}}
              whileTap={!saving ? { scale: 0.97 } : {}}
              className="
                w-full rounded-xl py-3
                bg-gradient-to-r from-emerald-500 to-green-600
                text-white font-semibold
                shadow-lg hover:shadow-emerald-500/40
                transition-all
                disabled:opacity-60
              ">
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
