import { AboutSection } from "@/sections/homepage/about";
import { ContactSection } from "@/sections/homepage/contact";
import { CTASection } from "@/sections/homepage/CTA";
import { FAQSection } from "@/sections/homepage/FAQs";
import { FollowUs } from "@/sections/homepage/followus";
import { HeroSection } from "@/sections/homepage/hero";
import { MenuPreview } from "@/sections/homepage/menu-preview";
import { OfferSection } from "@/sections/homepage/offer";
import { TestimonialCarousel } from "@/sections/homepage/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MenuPreview />
      <OfferSection />
      <TestimonialCarousel />
      <AboutSection />
      <CTASection />
      <ContactSection />
      <FAQSection />
      <FollowUs />
    </>
  );
}
