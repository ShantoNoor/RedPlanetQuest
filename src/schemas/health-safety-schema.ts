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
    (data) =>
      !data.chronicIllnesses ||
      (data.chronicIllnesses && data.medicalConditions?.chronicIllnesses),
    {
      message: "Chronic Illnesses must be provided if declaration is Yes",
      path: ["medicalConditions.chronicIllnesses"],
    }
  )
  .refine(
    (data) =>
      !data.takingMedication ||
      (data.takingMedication && data.medicalConditions?.takingMedication),
    {
      message: "Medication details must be provided if declaration is Yes",
      path: ["medicalConditions.takingMedication"],
    }
  )
  .refine(
    (data) =>
      !data.majorSurgeries ||
      (data.majorSurgeries && data.medicalConditions?.majorSurgeries),
    {
      message: "Major Surgeries details must be provided if declaration is Yes",
      path: ["medicalConditions.majorSurgeries"],
    }
  )
  .refine(
    (data) =>
      !data.allergies || (data.allergies && data.medicalConditions?.allergies),
    {
      message: "Allergies details must be provided if declaration is Yes",
      path: ["medicalConditions.allergies"],
    }
  );
