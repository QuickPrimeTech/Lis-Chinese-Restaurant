// @/schemas/reservations.ts

import * as z from "zod";

// Step 1: Personal Info
const Step1Schema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

// Step 2: Date & Time
const Step2Schema = z.object({
  date: z
    .date()
    .refine(
      (date) =>
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date >= new Date(new Date().setHours(0, 0, 0, 0)),
      {
        message: "Please select a valid reservation date (today or later)",
      }
    ),
  time: z.string().nonempty({ message: "A time slot is required" }),
  guests: z.string().nonempty({ message: "Number of guests is required" }),
});

// Step 3: Dining Preference
const Step3Schema = z.object({
  diningPreference: z
    .string()
    .min(1, { message: "Please select your dining preference" }),
});

// Step 4: Additional Info
const Step4Schema = z.object({
  occasion: z.string().optional(),
  requests: z.string().optional(),
});

// Final Schema
export const FormSchema = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step4Schema);

// TypeScript type
export type ReservationFormValues = z.infer<typeof FormSchema>;
