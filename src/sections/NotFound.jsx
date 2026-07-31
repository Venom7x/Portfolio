import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHouse } from "react-icons/fa6";
import GradientBlobs from "../components/GradientBlobs";
import Button from "../components/Button";

export default function NotFound() {
  const location = useLocation();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <GradientBlobs />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative w-full max-w-md rounded-2xl p-8 text-center"
      >
        <p className="route-label text-violet-soft">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Route not found</h1>
        <pre className="route-label mt-5 overflow-x-auto rounded-xl bg-surface-hi p-4 text-left text-faint">
{`{
  "status": 404,
  "error": "Not Found",
  "path": "${location.pathname}"
}`}
        </pre>
        <div className="mt-6 flex justify-center">
          <Button as={Link} to="/" icon={FaHouse}>
            Back to home
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
