import { motion } from "framer-motion";
import { FormHeading } from "./form-heading";
import { StepsType } from "@/types/types";

export function FormStep({
  currentStep,
  step,
  delta,
  stepFor = 0,
  children,
}: {
  currentStep: number;
  stepFor: number;
  step: StepsType;
  delta: number;
  children?: React.ReactNode;
}) {
  if (currentStep !== stepFor) return;

  return (
    <motion.div
      initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <FormHeading step={step} />
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}
