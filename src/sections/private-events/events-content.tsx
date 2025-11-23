"use client";
import EventPackages from "./event-packages";
import EventInquiryForm from "./events-inquiry-form";
import WhyChooseUs from "./why-choose-us";

export const EventsContent = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <EventPackages />
      <EventInquiryForm />
      <WhyChooseUs />
    </div>
  );
};
