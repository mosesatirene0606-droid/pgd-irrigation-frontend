import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, RefreshCcw } from "lucide-react";
import API from "../api/client";

/* ---------- Severity Button ---------- */
function SeverityButton({ active, label, onClick }) {
  const colorMap = {
    ALL: "bg-slate-200 text-slate-700",
    INFO: "bg-blue-100 text-blue-700",
    WARN: "bg-yellow-100 text-yellow-700",
    ERROR: "bg-red-100 text-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-medium
        transition-all
        ${
          active
            ? `${colorMap[label]} shadow`
            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
        }
      `}>
      {label}
    </button>
  );
}

/* ---------- Backend Console ---------- */
export default function BackendConsole() {
  const [logs, setLogs] = useState([]);
  const [severity, setSeverity] = useState("ALL");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      setLoading(true);
      const res = await API.get("/api/admin/logs");
      setLogs(res.data || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoading(false);
    }
  }

  function getSeverity(msg = "") {
    if (msg.includes("ERROR")) return "ERROR";
    if (msg.includes("WARN")) return "WARN";
    return "INFO";
  }

  const filteredLogs = useMemo(() => {
    if (severity === "ALL") return logs;
    return logs.filter((l) => getSeverity(l.message) === severity);
  }, [logs, severity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        relative overflow-hidden rounded-2xl
        bg-white/80 backdrop-blur-xl
        border border-white/20
        shadow-lg
        p-4 sm:p-6
      ">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="size-5 text-emerald-600" />
          <h3 className="font-semibold text-emerald-900">Backend Logs</h3>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchLogs}
          className="
            flex items-center gap-2 px-3 py-2 rounded-xl
            bg-emerald-600 text-white text-sm
            shadow hover:shadow-emerald-500/40
          ">
          <RefreshCcw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </motion.button>
      </div>

      {/* Severity Filters */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-3">
        {["ALL", "INFO", "WARN", "ERROR"].map((s) => (
          <SeverityButton
            key={s}
            label={s}
            active={severity === s}
            onClick={() => setSeverity(s)}
          />
        ))}
      </div>

      {/* Console Output */}
      <div className="relative z-10">
        <textarea
          readOnly
          value={filteredLogs
            .map(
              (l) =>
                `[${getSeverity(l.message)}] ${new Date(
                  l.created_at
                ).toLocaleString()} — ${l.message}`
            )
            .join("\n")}
          className="
            w-full h-64 sm:h-72
            p-3 rounded-xl
            bg-slate-900 text-emerald-200
            font-mono text-xs
            border border-slate-700
            resize-none
          "
        />

        {filteredLogs.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none">
            No logs to display
          </div>
        )}
      </div>
    </motion.div>
  );
}
