import { z } from "zod";
import { phoneSchema } from "./phone.schema";

export const personalInformationSchema = z.object({
  // image: z.any(),
  fullName: z.string().min(1),
  nationality: z.string().min(1),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Required format: YYYY-MM-DD"), 
  email: z.string().email(),
  phone: phoneSchema,
  address: z.string().min(1),
  gender: z.enum(["male", "female"]),
  occupation: z.string().min(1),
  reasonForVisit: z.string().min(1),
  // education: z
  //   .array(
  //     z.object({
  //       degree: z.string().min(1),
  //       institution: z.string().min(1),
  //       year: z.number().int().positive(), // Assuming year is a positive integer
  //     })
  //   )
  //   .optional(),
  // socialMediaProfiles: z
  //   .array(
  //     z.object({
  //       platformName: z.string().min(1),
  //       profileLink: z.string().url(),
  //     })
  //   )
  //   .optional(),
});
