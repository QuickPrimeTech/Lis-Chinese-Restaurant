// @/app/reservations/page.tsx

import { Metadata } from "next";

import { HeroSection } from "@/sections/reservations/hero";
import { ReservationFormSection } from "@/sections/reservations/reservation-form";
import { ReservationInfoSection } from "@/sections/reservations/reservation-info";
export const metadata: Metadata = {
  title:
    "Reservations at Li's Chinese Restaurant Nairobi | Book a Table Online",
  description:
    "Book your table at Li's Chinese Restaurant in Nairobi. Use our easy online reservation system to secure your spot for an authentic Chinese dining experience. Enjoy delicious food, warm hospitality, and a welcoming atmosphere.",
};
export default function ReservationsPage() {
  const timeSlots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"];
  const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8+"];
  const occasions = ["Casual Dining", "Anniversary", "Birthday"];

  return (
    <>
      <HeroSection />
      <ReservationFormSection
        timeSlots={timeSlots}
        guestCounts={guestCounts}
        occasions={occasions}
      />
      <ReservationInfoSection />
    </>
  );
}
