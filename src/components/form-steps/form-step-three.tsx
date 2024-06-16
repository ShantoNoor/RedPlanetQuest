import { StepsType } from "@/types/types";
import { TextareaField } from "../form-fields/textarea-field";
import { FormStep } from "../form-step";
import { useEffect, useState } from "react";
import { RadioField } from "../form-fields/radio-field";
import { SlidingField } from "../sliding-field";
import { InputField } from "../form-fields/input-field";
import { useFormContext } from "react-hook-form";

const stepFor = 2; // step 3

export function FormStepThree({
  control,
  currentStep,
  steps,
  delta,
  setFormValue,
}: {
  control: any;
  currentStep: number;
  steps: StepsType[];
  delta: number;
  setFormValue: any;
}) {
  const [chronicIllnesses, setChronicIllnesses] = useState<boolean>(false);
  const [takingMedication, setTakingMedication] = useState<boolean>(false);
  const [majorSurgeries, setMajorSurgeries] = useState<boolean>(false);
  const [allergies, setAllergies] = useState<boolean>(false);

  const { unregister } = useFormContext();

  useEffect(() => {
    if (!chronicIllnesses) {
      unregister("healthSafety.medicalConditions.chronicIllnesses");
    }

    if (!takingMedication) {
      unregister("healthSafety.medicalConditions.takingMedication");
    }

    if (!majorSurgeries) {
      unregister("healthSafety.medicalConditions.majorSurgeries");
    }

    if (!allergies) {
      unregister("healthSafety.medicalConditions.allergies");
    }
  }, [
    unregister,
    allergies,
    takingMedication,
    majorSurgeries,
    chronicIllnesses,
  ]);

  return (
    <FormStep
      currentStep={currentStep}
      step={steps[stepFor]}
      delta={delta}
      stepFor={stepFor}
    >
      <div className="space-y-4 border p-3 rounded-[var(--radius)]">
        <RadioField
          control={control}
          name="healthSafety.chronicIllnesses"
          label="Do you have any Chronic Illnesses?"
          setFormValue={setFormValue}
          setValue={setChronicIllnesses}
        />

        <RadioField
          control={control}
          name="healthSafety.takingMedication"
          label="Are you Taking any kind of Medication?"
          setFormValue={setFormValue}
          setValue={setTakingMedication}
        />

        <RadioField
          control={control}
          name="healthSafety.majorSurgeries"
          label="Do you have any any kind of Major Surgeries?"
          setFormValue={setFormValue}
          setValue={setMajorSurgeries}
        />

        <RadioField
          control={control}
          name="healthSafety.allergies"
          label="Do you have any any kind of Allergies?"
          setFormValue={setFormValue}
          setValue={setAllergies}
        />
      </div>

      {(chronicIllnesses ||
        takingMedication ||
        majorSurgeries ||
        allergies) && (
        <div className="space-y-4 border p-3 rounded-[var(--radius)]">
          <div>
            <h5 className="font-medium">Medical Conditions: </h5>
          </div>

          <SlidingField value={chronicIllnesses}>
            <TextareaField
              control={control}
              name="healthSafety.medicalConditions.chronicIllnesses"
              label="Explain more about your Chronic Illnesses"
              placeholder="Tell us in details ... "
            />
          </SlidingField>

          <SlidingField value={takingMedication}>
            <TextareaField
              control={control}
              name="healthSafety.medicalConditions.takingMedication"
              label="Explain more about Medications"
              placeholder="Tell us in details ... "
            />
          </SlidingField>

          <SlidingField value={majorSurgeries}>
            <TextareaField
              control={control}
              name="healthSafety.medicalConditions.majorSurgeries"
              label="Explain more about your Surgeries"
              placeholder="Tell us in details ... "
            />
          </SlidingField>

          <SlidingField value={allergies}>
            <TextareaField
              control={control}
              name="healthSafety.medicalConditions.allergies"
              label="Explain more about your Allergies"
              placeholder="Tell us in details ... "
            />
          </SlidingField>
        </div>
      )}

      <div className="space-y-4 border p-3 rounded-[var(--radius)]">
        <div>
          <h5 className="font-medium">Emergency Contact Info: </h5>
        </div>

        <InputField
          control={control}
          name="healthSafety.emergencyContact.fullName"
          placeholder="Full Name"
          label="Emergency contact full name"
        />

        <InputField
          control={control}
          name="healthSafety.emergencyContact.relation"
          placeholder="relation"
          label="Emergency contact relation"
        />

        <InputField
          control={control}
          name="healthSafety.emergencyContact.email"
          placeholder="abc@gmail.com"
          label="Emergency contact email address"
        />

        <InputField
          control={control}
          name="healthSafety.emergencyContact.phone"
          placeholder="+8801923434323"
          label="Emergency contact phone number"
        />

        <TextareaField
          control={control}
          name="healthSafety.emergencyContact.address"
          label="Emergency contact address"
          placeholder="Emergency contact address here ..."
        />
      </div>
    </FormStep>
  );
}
