import { StepsType } from "@/types/types";
import { SelectField } from "../form-fields/select-field";
import { TextareaField } from "../form-fields/textarea-field";
import { FormStep } from "../form-step";
import { DateField } from "../form-fields/date-field";
import { useState } from "react";

const stepFor = 1; // step 2

export function FormStepTwo({
  control,
  currentStep,
  steps,
  delta,
}: {
  control: any;
  currentStep: number;
  steps: StepsType[];
  delta: number;
}) {
  const [departureDate, setDepartureDate] = useState<string>("");

  return (
    <FormStep
      currentStep={currentStep}
      step={steps[stepFor]}
      delta={delta}
      stepFor={stepFor}
    >
      <DateField
        control={control}
        name="travelPreferences.departureDate"
        placeholder="Select Departure Date"
        label="Select Departure Date"
        setDate={setDepartureDate} // for setting the departureDate
      />

      <DateField
        control={control}
        name="travelPreferences.returnDate"
        placeholder="Must be at least 10 days after the departure date"
        label="Select Return Date"
        delay={departureDate} // for delaying return date so return
        // date can never be smaller than departureDate
      />

      <SelectField
        control={control}
        name="travelPreferences.accommodationPreference"
        placeholder="Select Accommodation Preference"
        label="Select Accommodation Preference"
        data={["space hotel", "martian base"]}
      />

      <TextareaField
        control={control}
        name="travelPreferences.specialRequests"
        label="Do you have any special requests?"
        placeholder="Tell us in details ... "
      />
    </FormStep>
  );
}
