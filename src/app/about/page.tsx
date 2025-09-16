import AboutHero from "@/sections/about/hero";
import AboutStory from "@/sections/about/story";
import AboutValues from "@/sections/about/values";
import AboutTeam from "@/sections/about/team";
import AboutAwards from "@/sections/about/awards";
import AboutCTA from "@/sections/about/CTA";

export const metadata = {
  title: "About Li's Chinese Restaurant Nairobi | Our Story, Team & Values",
  description:
    "Learn about Li's Chinese Restaurant in Nairobi — our story, values, and the passionate team bringing you authentic Chinese dining. Discover our journey, awards, and commitment to serving delicious meals in a warm, welcoming space.",
};

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
