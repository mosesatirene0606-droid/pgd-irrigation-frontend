import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      whileHover={{ y: -4 }}
      className="
        relative overflow-hidden rounded-2xl
        bg-white/80 backdrop-blur-xl
        border border-white/20
        shadow-lg hover:shadow-2xl
        transition-shadow
        p-5
      ">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent" />

      {title && (
        <h3 className="relative z-10 mb-3 text-sm font-semibold tracking-wide text-emerald-900">
          {title}
        </h3>
      )}

      <div className="relative z-10 text-sm text-slate-700">{children}</div>
    </motion.div>
  );
}
