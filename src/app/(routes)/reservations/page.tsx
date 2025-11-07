// @/app/reservations/page.tsx

import { Metadata } from "next";

import { HeroSection } from "@/sections/reservations/hero";
import { ReservationFormSection } from "@/sections/reservations/reservation-form";
import { ReservationInfoSection } from "@/sections/reservations/reservation-info";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Secure your spot and enjoy the finest Chinese cuisine in Nairobi. Book your table online in just a few minutes.",
};

export default function ReservationsPage() {
  const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8+"];
  const occasions = ["Casual Dining", "Anniversary", "Birthday"];

  return (
    <>
      <HeroSection />
      <ReservationFormSection guestCounts={guestCounts} occasions={occasions} />
      <ReservationInfoSection />
    </>
  );
}
