import { CareersHero } from "@/sections/careers/hero";
import { JobApplicationForm } from "@/sections/careers/job-application-form";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <CareersHero />
      <JobApplicationForm />
    </main>
  );
}
