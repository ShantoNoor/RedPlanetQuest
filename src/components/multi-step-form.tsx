"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { Steps } from "./steps";
import { Meteors } from "./ui/meteors";
import { FromInputs, StepsType } from "@/types/types";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { formSchema } from "@/Schemas/form.schema";
import { Form } from "./ui/form";

const steps: StepsType[] = [
  {
    id: "Step 1",
    name: "Personal Information",
    details: "Please, provide information's about you",
    fields: [],
  },
  {
    id: "Step 2",
    name: "Travel Preferences",
    details: "Please, carefully fill up your travel preferences",
    fields: [],
  },
  {
    id: "Step 3",
    name: "Health Declaration",
    details: "Please, answer the questions carefully.",
    fields: [],
  },
  {
    id: "Step 4",
    name: "Complete",
    details: "Congratulations, your application is submitted successfully",
  },
];

export function MultiStepForm() {
  const [previousStep, setPreviousStep] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const delta = currentStep - previousStep;

  const form = useForm<FromInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "type name here",
  // });

  const next = async () => {
    const fields = steps[currentStep].fields;

    // const output = await trigger(fields, { shouldFocus: true });
    // if (!output) return;

    if (currentStep < steps.length - 1) {
      await handleSubmit(processForm)();
      // if (currentStep === steps.length - 2) {
      //   await handleSubmit(processForm)();
      // }
      // setPreviousStep(currentStep);
      // setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const processForm: SubmitHandler<FromInputs> = (data) => {
    console.log(data);
  };

  return (
    <section id="form" className="bg-primary p-4 md:p-12">
      <div className="relative bg-background h-[40rem] rounded-[var(--radius)] flex flex-col md:flex-row overflow-hidden">
        {/* left side */}
        <div className="md:w-1/3 bg-muted p-8">
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        {/* right side */}
        <div className="md:w-2/3 p-8">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit(processForm)}>
              <p>{JSON.stringify(errors, null, 2)}</p>
            </form>
          </Form>

          {/* Navigation */}
          <div className="">
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                variant="secondary"
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                variant="secondary"
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>

        <Meteors number={15} />
      </div>
    </section>
  );
}
