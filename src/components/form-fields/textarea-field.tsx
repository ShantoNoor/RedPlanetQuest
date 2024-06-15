import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea, TextareaProps } from "../ui/textarea";

interface TextareaFieldProps extends TextareaProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
}

export function TextareaField({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  ...props
}: TextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              rows={rows}
              className="rounded-[var(--radius)]"
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
