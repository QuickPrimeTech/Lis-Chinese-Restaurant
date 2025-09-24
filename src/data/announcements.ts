import { CalendarX, Gift } from "lucide-react";

export const announcements: Record<
  string,
  { icon: React.ElementType; message: string }[]
> = {
  "/": [
    {
      icon: CalendarX,
      message: "We are closed every Monday.",
    },
  ],
  "/menu": [
    {
      icon: Gift,
      message: "Happy Hour! Get 10% off appetizers between 4–6pm daily.",
    },
  ],
  "/private-events": [
    {
      icon: Gift,
      message: "Book your private event now and enjoy a complimentary dessert.",
    },
  ],
};
