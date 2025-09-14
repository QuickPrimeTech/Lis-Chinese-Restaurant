// @/sections/contact/info.tsx

"use client";
import { Card, CardContent } from "@/components/ui/card";
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
                Whether you&apos;re planning a special celebration, have
                questions about our menu, or simply want to share feedback,
                we&apos;re here to help.
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
                        123 Luxury Avenue
                        <br />
                        Fine Dining District
                        <br />
                        New York, NY 10001
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
                      <div className="text-muted-foreground font-chivo">
                        <p className="mb-1">Reservations: +1 (555) 123-LUXE</p>
                        <p className="mb-1">Events: +1 (555) 123-EVENT</p>
                        <p>General: +1 (555) 123-INFO</p>
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
                      <div className="text-muted-foreground font-chivo">
                        <p className="mb-1">
                          reservations@Li&apos;s Chinese Restaurant.com
                        </p>
                        <p className="mb-1">
                          events@Li&apos;s Chinese Restaurant.com
                        </p>
                        <p>info@Li&apos;s Chinese Restaurant.com</p>
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
                          <span>Monday - Thursday</span>
                          <span>5:00 PM - 11:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friday - Saturday</span>
                          <span>5:00 PM - 12:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>5:00 PM - 10:00 PM</span>
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
