import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export function SlidingField({
  children,
  value,
}: {
  children: ReactNode;
  value: boolean;
}) {
  return (
    <AnimatePresence>
      {value && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          exit={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
