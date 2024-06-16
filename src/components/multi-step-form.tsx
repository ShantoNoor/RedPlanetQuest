"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { Steps } from "./steps";
import { Meteors } from "./ui/meteors";
import { FromInputs, StepsType } from "@/types/types";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { formSchema } from "@/schemas/form.schema";
import { Form } from "./ui/form";
import { FormStepOne } from "./form-steps/form-step-one";
import { FormStepTwo } from "./form-steps/form-step-two";
import { FormStepThree } from "./form-steps/form-step-three";
import axios from "axios";
import { FormStepFinal } from "./form-steps/form-step-final";

const steps: StepsType[] = [
  {
    id: "Step 1",
    name: "Personal Information",
    details: "Please, provide information's about you",
    fields: [
      "personalInformation.fullName",
      "personalInformation.dateOfBirth",
      "personalInformation.email",
      "personalInformation.nationality",
      "personalInformation.phone",
      "personalInformation.occupation",
      "personalInformation.address",
      "personalInformation.gender",
      "personalInformation.reasonForVisit",
      "personalInformation.education",
    ],
  },
  {
    id: "Step 2",
    name: "Travel Preferences",
    details: "Please, carefully fill up your travel preferences",
    fields: [
      "travelPreferences.departureDate",
      "travelPreferences.returnDate",
      "travelPreferences.accommodationPreference",
      "travelPreferences.specialRequests",
    ],
  },
  {
    id: "Step 3",
    name: "Health Declaration",
    details: "Please, answer the questions carefully.",
    fields: [
      "healthSafety.chronicIllnesses",
      "healthSafety.takingMedication",
      "healthSafety.majorSurgeries",
      "healthSafety.allergies",
      "healthSafety.emergencyContact.fullName",
      "healthSafety.emergencyContact.relation",
      "healthSafety.emergencyContact.phone",
      "healthSafety.emergencyContact.email",
      "healthSafety.emergencyContact.address",
      "healthSafety.medicalConditions.chronicIllnesses",
      "healthSafety.medicalConditions.takingMedication",
      "healthSafety.medicalConditions.majorSurgeries",
      "healthSafety.medicalConditions.allergies",
    ],
  },
  {
    id: "Step 4",
    name: "Complete",
    details: "Congratulations, your application is submitted successfully",
  },
];

export function MultiStepForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [previousStep, setPreviousStep] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const delta = currentStep - previousStep;

  const form = useForm<FromInputs>({
    mode: "all",
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
        dateOfBirth: "",
      },
      travelPreferences: {
        departureDate: "",
        returnDate: "",
        specialRequests: "",
      },
      healthSafety: {
        medicalConditions: {
          chronicIllnesses: "",
          takingMedication: "",
          majorSurgeries: "",
          allergies: "",
        },
        emergencyContact: {
          fullName: "",
          relation: "",
          phone: "",
          email: "",
          address: "",
        },
      },
    },
  });

  const {
    handleSubmit,
    reset,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = form;

  const next = async () => {
    type FieldName = keyof FromInputs;

    const fields = steps[currentStep].fields;

    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
        reset();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep === steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(0);
    } else if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const processForm: SubmitHandler<FromInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/add", data);
      console.log("Adding form information to db", response);
      if (response.status) {
        console.log("Successfully added form data to db", response);
        reset();
      }
    } catch (error: any) {
      console.log("Failed to and form information", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="form" className="bg-primary p-4 md:p-12 bg-grid-white/[0.2]">
      <div className="relative bg-background min-h-[40rem] rounded-[var(--radius)] flex flex-col md:flex-row overflow-hidden">
        {/* left side */}
        <div className="md:w-1/3 bg-muted p-8">
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        {/* right side */}
        <div className="md:w-2/3 p-8 overflow-hidden flex flex-col justify-center min-h-full gap-4">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit(processForm)}>
              <FormStepOne
                control={control}
                steps={steps}
                currentStep={currentStep}
                delta={delta}
              />

              <FormStepTwo
                control={control}
                steps={steps}
                currentStep={currentStep}
                delta={delta}
              />

              <FormStepThree
                control={control}
                steps={steps}
                currentStep={currentStep}
                delta={delta}
                setFormValue={setValue}
              />

              <FormStepFinal
                steps={steps}
                currentStep={currentStep}
                delta={delta}
                loading={loading}
              />
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
