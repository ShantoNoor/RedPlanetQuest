import { z } from "zod";
import { personalInformationSchema } from "./personal-information.schema";
import { travelPreferencesSchema } from "./travel-preferences-schema";
import { healthSafetySchema } from "./health-safety-schema";

export const formSchema = z.object({
  personalInformation: personalInformationSchema,
  // travelPreferences: travelPreferencesSchema,
  // healthSafety: healthSafetySchema,
});
