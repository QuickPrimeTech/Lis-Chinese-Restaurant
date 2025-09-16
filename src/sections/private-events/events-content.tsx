"use client";

import { useState } from "react";
import EventPackages from "./event-packages";
import EventInquiryForm from "./events-inquiry-form";
import WhyChooseUs from "./why-choose-us";

export const EventsContent = () => {
  const [selectedPackage, setSelectedPackage] = useState("");
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <EventPackages onSelectPackage={setSelectedPackage} />
      <EventInquiryForm selectedPackage={selectedPackage} />
      <WhyChooseUs />
    </div>
  );
};
