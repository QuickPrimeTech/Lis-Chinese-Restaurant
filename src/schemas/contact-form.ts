// @/schemas/contact-form.ts
import z from "zod";

// Zod schema for validation
export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  inquiryType: z.enum(
    ["reservations", "private-event", "general", "complaint"] as const,
    {
      message: "Please select an inquiry type",
    }
  ),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// Infer form type from schema
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const labels: Record<ContactFormValues["inquiryType"], string> = {
  reservations: "Reservations",
  "private-event": "Private Event",
  general: "General",
  complaint: "Complaint",
};
