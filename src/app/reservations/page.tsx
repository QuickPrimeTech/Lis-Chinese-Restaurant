"use client";

import { HeroSection } from "@/sections/reservations/hero";
import { ReservationFormSection } from "@/sections/reservations/reservation-form";
import { ReservationInfoSection } from "@/sections/reservations/reservation-info";

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
