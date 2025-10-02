// @/sections/contact/info.tsx

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/config/site-config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="lg:col-span-1 space-y-8">
      <>
        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-cinzel font-bold text-foreground mb-8">
            Get in Touch
          </h2>
          <p className="text-muted-foreground font-chivo leading-relaxed mb-8">
            Whether you&apos;re planning a special celebration, have questions
            about our menu, or simply want to share feedback, we&apos;re here to
            help.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-2">
                    Visit Us
                  </h3>
                  <p className="text-muted-foreground font-chivo">
                    Limuru Rd
                    <br />
                    PETROCITY – Gigiri
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-2">
                    Call Us
                  </h3>
                  <div className="text-muted-foreground font-chivo space-y-1">
                    <p>Phone Number: {site.restaurant.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-2">
                    Email Us
                  </h3>
                  <div className="text-muted-foreground font-chivo space-y-1 break-all">
                    <p>{site.emails.reservations}</p>
                    <p>{site.emails.orders}</p>
                    <p>{site.emails.careers}</p>
                    <p>{site.emails.inquiries}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-2">
                    Hours
                  </h3>
                  <div className="text-muted-foreground font-chivo text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Tuesady - Sunday</span>
                      <span>11:00 AM - 10:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    </div>
  );
}
