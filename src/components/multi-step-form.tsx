"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, SubmitHandler } from "react-hook-form";

import { useEffect, useState } from "react";
import { Steps } from "./steps";
import { Meteors } from "./ui/meteors";
import { FromInputs, StepsType } from "@/types/types";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { formSchema } from "@/Schemas/form.schema";
import { Form } from "./ui/form";
import { InputField } from "./form-fields/input-field";
import { TextareaField } from "./form-fields/textarea-field";
import { SelectField } from "./form-fields/select-field";
import { DateField } from "./form-fields/date-field";

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
    defaultValues: {
      personalInformation: {
        fullName: "",
        email: "",
        nationality: "",
        phone: "",
        occupation: "",
        address: "",
        reasonForVisit: "",
        gender: "",
        dateOfBirth: "",
      },
    },
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
    <section id="form" className="bg-primary p-4 md:p-12 bg-grid-white/[0.2]">
      <div className="relative bg-background min-h-[40rem] rounded-[var(--radius)] flex flex-col md:flex-row overflow-hidden">
        {/* left side */}
        <div className="md:w-1/3 bg-muted p-8">
          <p>{JSON.stringify(errors, null, 2)}</p>
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        {/* right side */}
        <div className="md:w-2/3 p-8">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit(processForm)} className="space-y-4">
              <InputField
                control={control}
                name="personalInformation.fullName"
                placeholder="Full Name"
                label="Type your full name"
              />

              <InputField
                control={control}
                name="personalInformation.dateOfBirth"
                label="What is your birth date?"
                placeholder="YYYY-MM-DD"
              />

              <InputField
                control={control}
                name="personalInformation.email"
                placeholder="abc@gmail.com"
                label="Write your email address"
              />

              <InputField
                control={control}
                name="personalInformation.nationality"
                placeholder="Bangladeshi"
                label="What is your nationality?"
              />

              <InputField
                control={control}
                name="personalInformation.phone"
                placeholder="+8801923434323"
                label="Type your phone number"
              />

              <InputField
                control={control}
                name="personalInformation.occupation"
                placeholder="Programmer"
                label="What is your occupation?"
              />

              <TextareaField
                control={control}
                name="personalInformation.address"
                label="Type your address"
                placeholder="Write your address here ..."
              />

              <SelectField
                control={control}
                name="personalInformation.gender"
                placeholder="Select your gender"
                label="Select your gender"
                data={["male", "female"]}
              />

              <TextareaField
                control={control}
                name="personalInformation.reasonForVisit"
                label="Why you want to visit MARS?"
                placeholder="Explain Why You want to visit MARS ... "
              />
            </form>
          </Form>

          {/* Navigation */}
          <div className="mt-4">
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
