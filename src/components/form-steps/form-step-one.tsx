import { StepsType } from "@/types/types";
import { InputField } from "../form-fields/input-field";
import { SelectField } from "../form-fields/select-field";
import { TextareaField } from "../form-fields/textarea-field";
import { FormStep } from "../form-setp";

export function FormStepOne({
  control,
  currentStep,
  steps,
  delta,
  stepFor = 0,
}: {
  control: any;
  currentStep: number;
  stepFor: number;
  steps: StepsType[];
  delta: number;
}) {
  return (
    <FormStep
      currentStep={currentStep}
      step={steps[stepFor]}
      delta={delta}
      stepFor={0}
    >
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
    </FormStep>
  );
}
