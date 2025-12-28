import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogIn,
  CloudSun,
  Leaf,
  FileBarChart,
  Settings,
  Users,
  Terminal,
  Database,
  AlertTriangle,
  Menu,
} from "lucide-react";

const STORAGE_KEY = "sidebar-open";

export default function Sidebar({ screen, setScreen }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const edgeStartX = useRef(null);
  const swipeStartX = useRef(null);
  const MOBILE_WIDTH = 280;

  /* ===============================
     Screen size detection
  =============================== */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const handleChange = () => {
      setIsMobile(media.matches);

      if (media.matches) {
        setOpen(false);
      } else {
        const saved = localStorage.getItem(STORAGE_KEY);
        setOpen(saved !== "false");
      }
    };

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  /* ===============================
     Persist desktop state
  =============================== */
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem(STORAGE_KEY, String(open));
    }
  }, [open, isMobile]);

  /* ===============================
     Header hamburger sync
  =============================== */
  useEffect(() => {
    const toggle = () => setOpen((v) => !v);
    window.addEventListener("toggle-sidebar", toggle);
    return () => window.removeEventListener("toggle-sidebar", toggle);
  }, []);

  /* ===============================
     Keyboard shortcut (⌘ / Ctrl + B)
  =============================== */
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ===============================
     Edge swipe to OPEN (mobile)
  =============================== */
  function onEdgeTouchStart(e) {
    if (!isMobile || open) return;
    if (e.touches[0].clientX < 24) {
      edgeStartX.current = e.touches[0].clientX;
    }
  }

  function onEdgeTouchMove(e) {
    if (!edgeStartX.current) return;
    const diff = e.touches[0].clientX - edgeStartX.current;
    if (diff > 60) {
      setOpen(true);
      edgeStartX.current = null;
    }
  }

  /* ===============================
     Swipe to CLOSE (mobile)
  =============================== */
  function onSidebarTouchStart(e) {
    swipeStartX.current = e.touches[0].clientX;
  }

  function onSidebarTouchMove(e) {
    if (!swipeStartX.current) return;
    const diff = e.touches[0].clientX - swipeStartX.current;
    if (diff < -60) {
      setOpen(false);
      swipeStartX.current = null;
    }
  }

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "weather", label: "Weather", icon: CloudSun },
    { id: "crop", label: "Crop", icon: Leaf },
    { id: "results", label: "Results", icon: FileBarChart },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "admin", label: "Admin", icon: Users },
    { id: "console", label: "Console", icon: Terminal },
    { id: "db", label: "Database", icon: Database },
    { id: "error", label: "Errors", icon: AlertTriangle },
    { id: "login", label: "Login", icon: LogIn },
  ];

  return (
    <>
      {/* Edge swipe zone */}
      {isMobile && !open && (
        <div
          className="fixed inset-y-0 left-0 w-6 z-50"
          onTouchStart={onEdgeTouchStart}
          onTouchMove={onEdgeTouchMove}
        />
      )}

      {/* Backdrop */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={
          isMobile
            ? { x: open ? 0 : -MOBILE_WIDTH }
            : { width: open ? 256 : 80 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        onTouchStart={isMobile ? onSidebarTouchStart : undefined}
        onTouchMove={isMobile ? onSidebarTouchMove : undefined}
        style={isMobile ? { width: MOBILE_WIDTH } : undefined}
        className={`
    ${isMobile ? "fixed z-50 inset-y-0 left-0" : "relative"}
    h-screen
    bg-gradient-to-br from-emerald-900 via-green-900 to-black
    border-r border-white/10
    text-white
    flex flex-col
    overflow-hidden
  `}>
        {/* Brand */}
        <div className="flex items-center justify-between px-4 py-4">
          {open && (
            <div>
              <h1 className="text-lg font-bold tracking-widest">
                IRRIGATION<span className="text-emerald-400">.AI</span>
              </h1>
              <p className="text-xs text-emerald-300">Decision Support</p>
            </div>
          )}

          {!isMobile && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-white/10">
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 mt-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = screen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setScreen(item.id);
                  if (isMobile) setOpen(false);
                }}
                className={`
                  relative w-full flex items-center gap-3
                  px-3 py-2.5 rounded-xl
                  transition
                  ${
                    active
                      ? "bg-white/90 text-emerald-900 shadow-lg"
                      : "text-emerald-100 hover:bg-white/10"
                  }
                `}>
                <Icon size={20} className="shrink-0" />
                {open && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 text-xs text-emerald-300 border-t border-white/10">
          {open ? "© 2025 Irrigation DSS" : "©"}
        </div>
      </motion.aside>
    </>
  );
}
