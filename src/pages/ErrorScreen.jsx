// src/pages/ErrorScreen.jsx

import { motion } from "framer-motion";

export default function ErrorScreen({
  title = "Oops!",
  message = "Something went wrong. Please try again later.",
  actionLabel = "Go Back",
  onAction,
}) {
  const timestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-600 mb-2">{title}</h2>

        <p className="text-slate-700 mb-4">{message}</p>

        <div className="text-xs text-slate-400 mb-6">{timestamp}</div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg">
          {actionLabel}
        </motion.button>
      </motion.div>
    </div>
  );
}
