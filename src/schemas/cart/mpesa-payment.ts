import z from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number is too short")
    .transform((val) => {
      const cleaned = val.replace(/\D/g, "");
      if (cleaned.startsWith("254")) return cleaned.slice(0, 12);
      if (cleaned.startsWith("0")) return "254" + cleaned.slice(1, 10);
      if (cleaned.startsWith("7") || cleaned.startsWith("1"))
        return "254" + cleaned.slice(0, 9);
      return cleaned.slice(0, 12);
    })
    .refine((val) => val.length === 12, "Enter a valid 12-digit M-Pesa number"),
});

export type PhoneData = z.infer<typeof phoneSchema>;
