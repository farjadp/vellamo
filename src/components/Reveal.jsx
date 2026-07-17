import { motion } from "framer-motion";

/** Fade/slide/blur-in when the element scrolls into view (framer-motion). */
export default function Reveal({ children, className = "", delay = 0, y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
