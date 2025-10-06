import z from "zod";

export const pickupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Enter a valid email"), // ✅ mandatory

  date: z.date().refine(
    (date) => {
      if (Number.isNaN(date.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return date >= today && date <= maxDate;
    },
    { message: "Pickup must be within the next 7 days" }
  ),

  time: z.string().min(1, "Pickup time is required"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+254|254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),

  instructions: z.string().optional(),
});

export type PickupFormValues = z.infer<typeof pickupSchema>;
