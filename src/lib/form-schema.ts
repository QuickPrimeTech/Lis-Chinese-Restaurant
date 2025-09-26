import { differenceInYears, parseISO } from "date-fns";
import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(10, "Please enter your full address"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const dob = parseISO(val); // parse string like "yyyy-mm-dd"
      const age = differenceInYears(new Date(), dob);
      return age >= 18;
    }, "You must be at least 18 years old"),
});

export const experienceSchema = z.object({
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  previousEmployment: z
    .string()
    .min(10, "Your description must be atleast 10 characters"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
});

export const availabilitySchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  availability: z.array(z.string()).min(1, "Please select at least one day"),
  hoursPerWeek: z.string().min(1, "Please select your preferred hours"),
});

export const documentsSchema = z.object({
  resume: z.instanceof(File, { message: "Please upload your resume" }),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
  references: z.string().min(20, "Please provide at least one reference"),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type AvailabilityData = z.infer<typeof availabilitySchema>;
export type DocumentsData = z.infer<typeof documentsSchema>;

// 👇 Combine into one schema
export const applicationSchema = personalInfoSchema
  .merge(experienceSchema)
  .merge(availabilitySchema)
  .merge(documentsSchema);

// 👇 Single Type
export type ApplicationData = z.infer<typeof applicationSchema>;
