import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  data: string[];
}

export function SelectField({
  control,
  name,
  label,
  placeholder,
  data,
}: SelectFieldProps) {
  // using this state to match the color of select with other fields
  // just checking the firstSet if it is false then set the placeholder color
  const [firstSet, setFirstSet] = useState<boolean>(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setFirstSet(true);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className={`capitalize ${
                      firstSet ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item} value={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
