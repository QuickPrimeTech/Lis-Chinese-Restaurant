"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Clock, Mail } from "lucide-react";
import { site } from "@/config/site-config";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactSuccessProps = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function ContactSuccess({
  setIsSubmitted,
  setFormData,
}: ContactSuccessProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
              Message Sent Successfully!
            </h1>
            <p className="text-xl text-muted-foreground font-chivo leading-relaxed mb-8">
              Thank you for reaching out to Li&apos;s Chinese Restaurant.
              We&apos;ve received your message and will respond within 24 hours.
            </p>

            <Card className="bg-card border-primary/20 shadow-luxury">
              <CardContent className="p-8">
                <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6">
                  What&apos;s Next?
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-chivo font-semibold text-foreground">
                        Response Time
                      </p>
                      <p className="text-muted-foreground text-sm">
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-chivo font-semibold text-foreground">
                        Email Confirmation
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Check your email for confirmation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-chivo font-semibold text-foreground">
                        Urgent Matters
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Call us at {site.restaurant.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  subject: "",
                  message: "",
                });
              }}
              variant="outline"
              className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
