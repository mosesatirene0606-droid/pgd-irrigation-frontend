import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  open,
  title = "Confirm action",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            w-full max-w-sm
            rounded-2xl
            bg-white/90 backdrop-blur-xl
            border border-white/20
            shadow-2xl
            p-6
          ">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          {description && (
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="
                px-4 py-2 rounded-xl
                text-sm font-medium
                text-slate-600
                hover:bg-slate-100
                transition
              ">
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className="
                px-4 py-2 rounded-xl
                bg-red-600
                text-white
                text-sm font-semibold
                shadow
                hover:bg-red-700
                transition
              ">
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
