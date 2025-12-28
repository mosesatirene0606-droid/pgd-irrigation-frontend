import { useAuth } from "../api/context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, Menu } from "lucide-react";
import { useState, useRef } from "react";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function Header({ title }) {
  const { user, logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const pressTimer = useRef(null);

  function confirmLogout() {
    logout();
    window.location.reload();
  }

  function startLongPress() {
    pressTimer.current = setTimeout(() => setConfirmOpen(true), 600);
  }

  function cancelLongPress() {
    clearTimeout(pressTimer.current);
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        sticky top-0 z-20
        mx-4 mt-4
        rounded-2xl
        bg-white/80 backdrop-blur-xl
        border border-white/20
        shadow-lg
      ">
      <div className="flex h-14 items-center justify-between px-5">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
            className="md:hidden p-2 rounded-lg hover:bg-black/5">
            <Menu size={20} />
          </button>

          <h2 className="text-lg font-semibold text-emerald-900">{title}</h2>
        </div>

        {/* Right */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-slate-500 capitalize">
                {user.role}
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
              {user.name?.[0]}
            </div>

            <motion.button
              onMouseDown={startLongPress}
              onMouseUp={cancelLongPress}
              onMouseLeave={cancelLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={cancelLongPress}
              onClick={() => window.innerWidth > 640 && setConfirmOpen(true)}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-2 px-3 py-1.5
                rounded-xl bg-red-50/60
                text-red-600 border border-red-200/60
                text-sm font-medium
                hover:bg-red-100/80
              ">
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Sign out?"
        description="You will be logged out of your account."
        confirmText="Logout"
        onConfirm={confirmLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </motion.header>
  );
}
