// @/sections/private-events/events-inquiry-form.tsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { StepIndicator } from "./inquiry-form/step-indicator";
import { ContactInfoStep } from "./inquiry-form/contact-info";
import { EventDetailsStep } from "./inquiry-form/event-details";
import { AdditionalDetailsStep } from "./inquiry-form/additional-details";
import { ReviewStep } from "./inquiry-form/review-step";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  guests: string;
  budget: string;
  details: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  eventType: "",
  guests: "",
  budget: "",
  details: "",
};

export default function EventInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.eventType) newErrors.eventType = "Event type is required";
      if (!formData.guests) newErrors.guests = "Number of guests is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData(initialFormData);
    setDate(undefined);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-slide-in">
        <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Event Inquiry Received!
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Thank you for your interest. Our event specialist will contact you
          within 24 hours to discuss your requirements.
        </p>

        <Card className="shadow-elegant bg-gradient-subtle">
          <CardContent className="p-8 text-left">
            <h3 className="font-semibold text-2xl text-foreground mb-6 text-center">
              Your Event Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Contact:</span>
                <p className="font-semibold">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Event Type:</span>
                <p className="font-semibold">{formData.eventType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-semibold">
                  {date ? date.toLocaleDateString() : "To be discussed"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Guests:</span>
                <p className="font-semibold">{formData.guests} people</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleReset}
          variant="outline"
          className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-elegant bg-gradient-subtle">
        <CardHeader className="text-center pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Private Event Booking
          </h1>
          <p className="text-muted-foreground">
            Tell us about your vision and we'll create a personalized proposal
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <ContactInfoStep
                data={{
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  phone: formData.phone,
                  company: formData.company,
                }}
                onChange={handleFieldChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <EventDetailsStep
                data={{
                  eventType: formData.eventType,
                  guests: formData.guests,
                  budget: formData.budget,
                }}
                date={date}
                onChange={handleFieldChange}
                onDateChange={setDate}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <AdditionalDetailsStep
                details={formData.details}
                onChange={(value) => handleFieldChange("details", value)}
              />
            )}

            {currentStep === 4 && (
              <ReviewStep
                data={formData}
                date={date}
                onEdit={handleStepChange}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={cn(
                "transition-all duration-300",
                currentStep === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i + 1 <= currentStep
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="bg-gradient-primary">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-gradient-primary">
                Submit Inquiry
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
