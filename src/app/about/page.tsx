import AboutHero from "@/sections/about/hero";
import AboutStory from "@/sections/about/story";
import AboutValues from "@/sections/about/values";
import AboutTeam from "@/sections/about/team";
import AboutAwards from "@/sections/about/awards";
import AboutCTA from "@/sections/about/CTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutAwards />
      <AboutCTA />
    </div>
  );
}
