import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-bg"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="route-label text-lg text-ink flex items-center gap-2"
          >
            <span className="text-cyan-soft">GET</span>
            <span>/venom</span>
          </motion.div>

          <div className="h-1 w-40 overflow-hidden rounded-full bg-surface-hi">
            <motion.div
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan to-violet"
              animate={{ x: ["-100%", "220%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="route-label text-faint">loading portfolio…</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
