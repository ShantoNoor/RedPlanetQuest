import { formSchema } from "@/schemas/form.schema";
import { z } from "zod";

export type StepsType = {
  id: string;
  name: string;
  details: string;
  fields?: string[];
};

export type FromInputs = z.infer<typeof formSchema>;

export type StyleType = {
  top: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
};
