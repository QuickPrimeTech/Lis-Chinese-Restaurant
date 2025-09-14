"use client";
import dynamic from 'next/dynamic';
import {
} from "lucide-react";
const ContactInfo = dynamic(() => import('@/sections/contact/info'));
const ContactForm = dynamic(() => import('@/sections/contact/form'));
const ContactQuickActions = dynamic(() => import('@/sections/contact/quick-actions'));
const ContactHero = dynamic(() => import('@/sections/contact/hero'));


export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
     <ContactHero/>
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