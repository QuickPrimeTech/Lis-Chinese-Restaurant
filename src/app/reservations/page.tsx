"use client"

import { HeroSection } from "@/sections/reservations/hero";
import { ReservationFormSection } from "@/sections/reservations/reservation-form";
import { ReservationInfoSection } from "@/sections/reservations/reservation-info";
import { useState } from "react";

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "",
    time: "",
    occasion: "",
    requests: "",
  });

  const timeSlots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"];
  const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8+"];
  const occasions = ["Casual Dining", "Anniversary", "Birthday"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission logic
  };

  return (
    <>
      <HeroSection />
      <ReservationFormSection
        date={date}
        setDate={setDate}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        timeSlots={timeSlots}
        guestCounts={guestCounts}
        occasions={occasions}
      />
      <ReservationInfoSection />
    </>
  );
}
