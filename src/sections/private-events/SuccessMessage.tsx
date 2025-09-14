"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface SuccessMessageProps {
  formData: any;
  date: Date;
  onReset: () => void;
}

export default function SuccessMessage({
  formData,
  date,
  onReset,
}: SuccessMessageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
              Event Inquiry Received!
            </h1>
            <p className="text-xl text-muted-foreground font-chivo leading-relaxed mb-8">
              Thank you for your interest. Our event specialist will contact you
              soon.
            </p>
            <Card className="bg-card border-primary/20 shadow-luxury">
              <CardContent className="p-8">
                <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6">
                  Your Event Details
                </h3>
                {/* Show formData details here */}
              </CardContent>
            </Card>
            <Button onClick={onReset} variant="outline" className="mt-6">
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
