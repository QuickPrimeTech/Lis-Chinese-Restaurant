import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { MapCard } from "@/components/contact/map-card";
import { ContactForm } from "../../components/contact/contact-form";
import { site } from "@/config/site-config";

export const ContactSection = () => {
  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground font-chivo mb-8 leading-relaxed">
              Have a question or special request? We&apos;d love to hear from
              you and help make your dining experience perfect.
            </p>

            <ContactForm />
          </div>

          {/* Location & Contact Info */}
          <div className="w-full space-y-6">
            {/* Map Placeholder */}
            <div className="w-full">
              <MapCard />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-1">
                    Address
                  </h3>
                  <p className="text-muted-foreground font-chivo break-words">
                    QR74+JR2, Limuru Rd
                    <br />
                    PETROCITY – Gigiri
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+254746815106"
                    className="text-muted-foreground font-chivo hover:underline break-words"
                  >
                    {site.restaurant.phone}
                  </a>
                </div>
              </div>

              <div className="w-full flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cinzel font-semibold text-foreground mb-1">
                    Email
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <a
                      href={`mailto:${site.emails.reservations}`}
                      className="text-muted-foreground font-chivo hover:underline"
                      style={{ wordBreak: "break-all" }} // or use a Tailwind utility for break-all
                    >
                      {site.emails.reservations};
                    </a>
                    <a
                      href={`mailto:${site.emails.inquiries}`}
                      className="text-muted-foreground font-chivo hover:underline"
                      style={{ wordBreak: "break-all" }}
                    >
                      {site.emails.inquiries};
                    </a>
                  </div>
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20 w-full">
                <CardContent className="p-6">
                  <h3 className="font-cinzel font-semibold text-foreground mb-2">
                    Hours of Operation
                  </h3>
                  <div className="space-y-1 text-muted-foreground font-chivo">
                    <div className="flex justify-between">
                      <span>Tuesday - Sunday</span>
                      <span>11:00 AM - 10:30 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
