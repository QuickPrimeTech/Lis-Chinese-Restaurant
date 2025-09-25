import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(5, "Address is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
});

export const experienceSchema = z.object({
  position: z.string().nonempty("Position is required"),
  experience: z.string().nonempty("Experience is required"),
  previousEmployment: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
});

export const availabilitySchema = z.object({
  startDate: z.string().nonempty("Start date is required"),
  availability: z.array(z.string()).min(1, "Select at least one availability"),
  hoursPerWeek: z.enum(["part-time", "full-time", "flexible"]),
});

export const documentsSchema = z.object({
  resume: z.instanceof(File).nullable(),
  coverLetter: z.string().optional(),
  references: z.string().optional(),
});

// 🔹 Full schema (if you want final validation on submit)
export const jobApplicationSchema = personalInfoSchema
  .merge(experienceSchema)
  .merge(availabilitySchema)
  .merge(documentsSchema);

export type FormData = z.infer<typeof jobApplicationSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type AvailabilityData = z.infer<typeof availabilitySchema>;
export type DocumentsData = z.infer<typeof documentsSchema>;
