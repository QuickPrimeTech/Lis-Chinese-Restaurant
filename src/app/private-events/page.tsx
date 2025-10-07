import { Metadata } from "next";
import Hero from "@/sections/private-events/hero";
import { EventsContent } from "@/sections/private-events/events-content";

export const metadata: Metadata = {
  title: "Private Events",
  description:
    "Our place is perfect for birthdays, weddings, office parties, and special celebrations with our affordable packages.",
};

const PrivateEventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <EventsContent />
    </div>
  );
};

export default PrivateEventsPage;
