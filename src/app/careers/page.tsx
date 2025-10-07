import { CareersHero } from "@/sections/careers/hero";
import { CareerApplicationForm } from "@/sections/careers/career-form";
import { CareerProvider } from "@/contexts/career-provider";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Careers",
  description:
    "Explore open roles and start your journey with us today. Become part of a warm, passionate family that’s dedicated to creating unforgettable dining experiences.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <CareersHero />
      <CareerProvider>
        <div className="px-4">
          <CareerApplicationForm />
        </div>
      </CareerProvider>
    </main>
  );
}
