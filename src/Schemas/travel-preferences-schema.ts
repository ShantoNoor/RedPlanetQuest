import { z } from "zod";

export const travelPreferencesSchema = z.object({
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  accommodationPreference: z.enum(["Space Hotel", "Martian Base"]),
  specialRequests: z.string().optional(),
});
