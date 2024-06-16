import { StepsType } from "@/types/types";
import { FormStep } from "../form-step";

const stepFor = 3; // step 4

export function FormStepFinal({
  currentStep,
  steps,
  delta,
  loading,
}: {
  currentStep: number;
  steps: StepsType[];
  delta: number;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    );
  }
  return (
    <FormStep
      currentStep={currentStep}
      step={steps[stepFor]}
      delta={delta}
      stepFor={stepFor}
    />
  );
}
