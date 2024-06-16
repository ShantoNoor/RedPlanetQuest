import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { format, parse } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface DateFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  setDate?: Dispatch<SetStateAction<string>>;
  delay?: string | undefined;
}

export function DateField({
  control,
  name,
  label,
  placeholder,
  setDate,
  delay,
}: DateFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={typeof delay === "string" && delay.length === 0}
                >
                  {field.value ? field.value : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={parse(field.value, "yyyy-MM-dd", new Date())}
                onSelect={(value) => {
                  if (value) {
                    const stringDate = format(value, "yyyy-MM-dd");
                    // console.log(stringDate);
                    field.onChange(stringDate);
                    if (setDate) setDate(stringDate);
                  }
                }}
                disabled={(date) => {
                  const day = !delay ? new Date() : new Date(delay);
                  if (delay) day.setDate(day.getDate() + 10);
                  return date < day;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
