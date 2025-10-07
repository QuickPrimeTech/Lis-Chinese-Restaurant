import AboutHero from "@/sections/about/hero";
import AboutStory from "@/sections/about/story";
import AboutValues from "@/sections/about/values";
import AboutTeam from "@/sections/about/team";
import AboutAwards from "@/sections/about/awards";
import AboutCTA from "@/sections/about/CTA";

export const metadata = {
  title: "About Us",
  description:
    "Discover the story behind Li’s Chinese Restaurant in Nairobi — our values, our passionate team, and our love for authentic Chinese cuisine. Learn how we’ve grown, the milestones we’ve achieved, and our ongoing commitment to serving delicious meals in a warm, welcoming space.",
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
