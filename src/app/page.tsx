import { ContactSection } from "@/sections/homepage/contact";
import { CTASection } from "@/sections/homepage/CTA";
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
      <CTASection />
      <ContactSection />
    </>
  );
}
