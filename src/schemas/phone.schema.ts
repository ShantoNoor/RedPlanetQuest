import { z } from "zod";

const phoneNumberRegex = /^[0-9\-\+]{9,15}$/;

export const phoneSchema = z
  .string()
  .regex(phoneNumberRegex, "Invalid phone number format");
