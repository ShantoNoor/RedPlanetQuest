import { z } from "zod";
import { phoneSchema } from "./phone.schema";

export const personalInformationSchema = z
  .object({
    fullName: z.string().min(1),
    nationality: z.string().min(1),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Required format: YYYY-MM-DD"),
    email: z.string().email(),
    phone: phoneSchema,
    address: z.string().min(1),
    gender: z.enum(["male", "female"]),
    occupation: z.string().min(1),
    reasonForVisit: z.string().min(1),
    education: z.string().min(1)
  })
  .refine((data) => new Date() > new Date(data.dateOfBirth),{
    message: "Give a valid birth date",
    path: ["dateOfBirth"],
  });
