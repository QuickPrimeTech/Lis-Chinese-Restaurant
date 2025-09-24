// @/app/page.tsx

import { AboutSection } from "@/sections/homepage/about";
import { ContactSection } from "@/sections/homepage/contact";
import { CTASection } from "@/sections/homepage/CTA";
import { FAQSection } from "@/sections/homepage/FAQs";
import { FollowUs } from "@/sections/homepage/followus";
import { HeroSection } from "@/sections/homepage/hero";
import { MenuPreview } from "@/sections/homepage/menu-preview";
// import { OfferSection } from "@/sections/homepage/offer";
import { TestimonialCarousel } from "@/sections/homepage/testimonials";

export const metadata = {
  title:
    "Li's Chinese Restaurant Nairobi | Fine Chinese Dining & Authentic Meals",
  description:
    "Welcome to Li's Chinese Restaurant in Nairobi. Enjoy fresh, authentic Chinese food in a warm and inviting space. Perfect for family meals, friends, or a special night out.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <MenuPreview />
      {/* <OfferSection /> */}
      <TestimonialCarousel />
      <AboutSection />
      <CTASection />
      <ContactSection />
      <FAQSection />
      <FollowUs />
    </>
  );
}
