import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, unit }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="
        relative overflow-hidden
        rounded-2xl p-5
        bg-white/80 backdrop-blur-xl
        border border-white/20
        shadow-lg
      ">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {label}
          </div>
          <div className="text-xl font-bold text-slate-900">
            {value ?? "—"}{" "}
            <span className="text-sm font-medium text-slate-500">{unit}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
