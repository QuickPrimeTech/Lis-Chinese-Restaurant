"use client";

import { useState } from "react";
import Hero from "@/sections/private-events/hero";
import EventPackages from "@/sections/private-events/event-packages";
import WhyChooseUs from "@/sections/private-events/why-choose-us";
import EventInquiryForm from "@/sections/private-events/events-inquiry-form";

const PrivateEventsPage = () => {
  const [selectedPackage, setSelectedPackage] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <EventPackages onSelectPackage={setSelectedPackage} />
        <EventInquiryForm selectedPackage={selectedPackage} />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default PrivateEventsPage;
