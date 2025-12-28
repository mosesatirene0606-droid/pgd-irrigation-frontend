import { motion } from "framer-motion";

export default function MetricPill({ label, value, unit }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="
        relative overflow-hidden rounded-2xl
        bg-white/80 backdrop-blur
        border border-white/30
        shadow-md hover:shadow-xl
        p-4
      ">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 text-sm text-slate-600 mb-1">{label}</div>

      <div className="relative z-10 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-emerald-700">{value}</span>
        {unit && (
          <span className="text-xs font-medium text-emerald-600">{unit}</span>
        )}
      </div>
    </motion.div>
  );
}
