// @/schmas/private-event.ts
import { z } from "zod";

export const privateEventSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Phone number cannot exceed 13 characters"),
  company: z.string().optional(),

  eventType: z.string().min(1, "Event type is required"),
  date: z.date().optional(),
  guests: z.string().min(1, "Number of guests is required"),
  budget: z.string().optional(),
  details: z.string().optional(),
});

export type PrivateEventFormValues = z.infer<typeof privateEventSchema>;
export const serverPrivateEventsFormValues = privateEventSchema
  .omit({ date: true })
  .extend({
    date: z.string().optional(),
  });
