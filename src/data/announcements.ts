import { CalendarX, Receipt } from "lucide-react";

export const announcements: Record<
  string,
  { icon: React.ElementType; message: string }[]
> = {
  "/": [
    {
      icon: CalendarX,
      message: "Closed Mondays. Open Tue–Sun, 11:00 AM – 10:30 PM",
    },
  ],
  "/menu": [
    {
      icon: Receipt,
      message:
        "All prices are subject to 16% VAT and 2% Catering Levy as per regulations.",
    },
  ],
};
