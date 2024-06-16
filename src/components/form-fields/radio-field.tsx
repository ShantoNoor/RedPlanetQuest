import { Dispatch, SetStateAction, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface RadioFieldProps {
  control: any;
  name: string;
  label: string;
  setFormValue: any;
  setValue: Dispatch<SetStateAction<boolean>>;
}

export function RadioField({
  control,
  name,
  label,
  setFormValue,
  setValue,
}: RadioFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <FormItem>
              <RadioGroup
                onValueChange={(value) => {
                  const booleanValue = value === "true" ? true : false;
                  setValue(booleanValue);
                  setFormValue(name, booleanValue);
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"false"} id={`${name}-option-one`} checked={!field.value} />
                  <Label htmlFor={`${name}-option-one`}>No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"true"} id={`${name}-option-two`} checked={field.value} />
                  <Label htmlFor={`${name}-option-two`}>Yes</Label>
                </div>
              </RadioGroup>
            </FormItem>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
