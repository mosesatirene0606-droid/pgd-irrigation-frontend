import { motion } from "framer-motion";

export default function AuthButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full rounded-xl py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg"
      {...props}>
      {children}
    </motion.button>
  );
}
