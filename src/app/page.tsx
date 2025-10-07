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
import { supabase } from "@/lib/supabase/server";

export const metadata = {
  title:
    "Li's Chinese Restaurant Nairobi | Fine Chinese Dining & Authentic Meals",
  description:
    "Welcome to Li's Chinese Restaurant in Gigiri, Nairobi. Enjoy fresh, authentic Chinese food in a warm and inviting space. Perfect for family meals, friends, or a special night out.",
};

// ✅ enable ISR (regenerates every 60s)
export const dynamic = "force-static";
export const revalidate = false;

export default async function Home() {
  const USER_ID = process.env.USER_ID;

  // Fetch FAQs
  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("id, question, answer, is_published, order_index")
    .eq("user_id", USER_ID)
    .eq("is_published", true)
    .order("order_index", { ascending: true }); // ✅ sort by order_index

  if (error) {
    console.error("Error fetching FAQs:", error.message);
  }

  return (
    <>
      <HeroSection />
      <MenuPreview />
      {/* <OfferSection /> */}
      <TestimonialCarousel />
      <AboutSection />
      <CTASection />
      <ContactSection />
      <FAQSection faqs={faqs ?? []} /> {/* ✅ pass fetched faqs */}
      <FollowUs />
    </>
  );
}
