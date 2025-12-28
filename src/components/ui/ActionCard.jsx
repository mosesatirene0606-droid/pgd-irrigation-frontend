import { motion } from "framer-motion";

export default function ActionCard({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="
        relative overflow-hidden
        rounded-2xl p-5
        bg-white/80 backdrop-blur-xl
        border border-white/20
        shadow-lg hover:shadow-2xl
        text-left
        transition-all
      ">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
          <Icon className="w-6 h-6" />
        </div>

        <div>
          <div className="font-semibold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600 mt-1">{description}</div>
        </div>
      </div>
    </motion.button>
  );
}
