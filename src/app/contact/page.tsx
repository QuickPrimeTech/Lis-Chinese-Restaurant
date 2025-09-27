// @/app/contact/page.tsx

import { ContactForm } from "@/components/contact/contact-form";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

// ✅ Metadata (server component requirement)
export const metadata: Metadata = {
  title: "Contact Li's Chinese Restaurant Nairobi | Bookings & Inquiries",
  description:
    "Get in touch with Li's Chinese Restaurant in Nairobi. Call, message, or use our contact form for reservations, event bookings, or general inquiries. We're here to serve you authentic Chinese dining with warm hospitality.",
};

// ✅ Dynamic imports still allowed inside server components
const ContactInfo = dynamic(() => import("@/sections/contact/info"), {
  ssr: !!false,
});

const ContactQuickActions = dynamic(
  () => import("@/sections/contact/quick-actions"),
  { ssr: !!false }
);
const ContactHero = dynamic(() => import("@/sections/contact/hero"), {
  ssr: !!false,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      {/* Contact Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <ContactInfo />
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
        <ContactQuickActions />
      </div>
    </div>
  );
}
