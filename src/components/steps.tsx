import { StepsType } from "@/types/types";
import { CheckIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

export function Steps({
  steps,
  currentStep,
}: {
  steps: StepsType[];
  currentStep: number;
}) {
  return (
    <div aria-label="Progress">
      <div className="font-medium text-lg h-[9rem] flex items-center justify-center text-center">
        <p className="capitalize">{steps[currentStep].details}</p>
      </div>
      <Separator className="bg-primary mb-4" />
      <ol role="list" className="space-y-4">
        {steps.map((step: StepsType, index: number) => (
          <li key={step.name} className="bg-background">
            {currentStep > index ? (
              <div className="group text-primary flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors">
                <span className="flex items-center justify-between">
                  <span className="text-sm font-medium transition-colors">
                    {step.id}
                  </span>
                  <CheckIcon className="size-5 mr-2 text-lime-800 dark:text-lime-400" />
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : currentStep === index ? (
              <div
                className="flex text-primary w-full flex-col border-l-4 border-primary py-2 pl-4"
                aria-current="step"
              >
                <span className="text-sm font-medium">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-l-4 border-muted-foreground text-muted-foreground py-2 pl-4 transition-colors">
                <span className="text-sm font-medium transition-colors">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
