import { Metadata } from "next";
import Hero from "@/sections/private-events/hero";
import { EventsContent } from "@/sections/private-events/events-content";

export const metadata: Metadata = {
  title:
    "Private Events at Li's Chinese Restaurant Nairobi | Parties, Weddings & Celebrations",
  description:
    "Host your private events at Li's Chinese Restaurant in Nairobi. Perfect for birthdays, weddings, office parties, and special celebrations. Enjoy fine Chinese dining, custom packages, and a welcoming space for you and your guests.",
};

const PrivateEventsPage = () => {
  // const [selectedPackage, setSelectedPackage] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <EventsContent />
    </div>
  );
};

export default PrivateEventsPage;
