import { z } from "zod";
import { phoneSchema } from "./phone.schema";

export const healthSafetySchema = z
  .object({
    chronicIllnesses: z.boolean(),
    takingMedication: z.boolean(),
    majorSurgeries: z.boolean(),
    allergies: z.boolean(),
    emergencyContact: z.object({
      fullName: z.string().min(1),
      relation: z.string().min(1),
      phone: phoneSchema,
      email: z.string().email(),
      address: z.string().min(1),
    }),
    medicalConditions: z
      .object({
        chronicIllnesses: z.string().optional(),
        takingMedication: z.string().optional(),
        majorSurgeries: z.string().optional(),
        allergies: z.string().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.chronicIllnesses && !data.medicalConditions?.chronicIllnesses) {
        return false;
      }
      if (data.takingMedication && !data.medicalConditions?.takingMedication) {
        return false;
      }
      if (data.majorSurgeries && !data.medicalConditions?.majorSurgeries) {
        return false;
      }
      if (data.allergies && !data.medicalConditions?.allergies) {
        return false;
      }
      return true;
    },
    {
      message: "Medical conditions must be provided if declaration is Yes",
      path: ["medicalConditions"],
    }
  );
