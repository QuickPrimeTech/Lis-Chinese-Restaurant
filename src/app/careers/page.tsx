import { CareersHero } from "@/sections/careers/hero";
import { CareerApplicationForm } from "@/sections/careers/career-form";
import { CareerProvider } from "@/contexts/career-provider";

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
