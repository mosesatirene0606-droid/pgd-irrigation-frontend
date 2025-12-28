import { motion } from "framer-motion";

export default function Field({ label, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide text-slate-500 flex items-center gap-1">
        {Icon && <Icon className="size-4 text-emerald-500" />}
        {label}
      </label>
      {children}
    </motion.div>
  );
}
