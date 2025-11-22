"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  privateEventSchema,
  PrivateEventFormValues,
} from "@/schemas/private-event";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CheckCircle, ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { StepIndicator } from "./inquiry-form/step-indicator";
import { ContactInfoStep } from "./inquiry-form/contact-info";
import { EventDetailsStep } from "./inquiry-form/event-details";
import { AdditionalDetailsStep } from "./inquiry-form/additional-details";
import { ReviewStep } from "./inquiry-form/review-step";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function EventInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const form = useForm<PrivateEventFormValues>({
    resolver: zodResolver(privateEventSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      eventType: "",
      date: undefined,
      guests: "",
      budget: "",
      details: "",
    },
  });

  const onSubmit = async (data: PrivateEventFormValues) => {
    console.log("current step--->", currentStep);
    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/private-events", data);

      // ✅ Backend success
      if (res.data.success) {
        toast.success(
          res.data.message || "Event inquiry submitted successfully!"
        );
        // setIsSubmitted(true);
      }
    } catch (err) {
      // 🔥 Handle validation or server errors
      if (axios.isAxiosError(err)) {
        const resData = err.response?.data;

        // 🧩 Case 1: Validation errors array
        if (resData?.errors && Array.isArray(resData.errors)) {
          resData.errors.forEach(
            (error: { field: string; message: string }) => {
              toast.error(`${error.field}: ${error.message}`);
            }
          );
        }
        // 🧩 Case 2: Generic backend error
        else if (resData?.message) {
          toast.error(resData.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Unexpected error. Please try again.");
      }

      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const stepFields = {
      1: ["firstName", "lastName", "email", "phone"],
      2: ["eventType", "guests"],
      3: ["details"],
    }[currentStep] as (keyof PrivateEventFormValues)[];

    const valid = await form.trigger(stepFields);
    if (valid) setCurrentStep((s) => Math.min(s + 1, totalSteps));
  };

  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleReset = () => {
    form.reset();
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const data = form.getValues();

    return (
      <div className="max-w-2xl mx-auto text-center animate-slide-in">
        <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Event Inquiry Received!
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Thank you for your interest. Our event specialist will contact you
          within 24 hours.
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
                  {data.firstName} {data.lastName}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Event Type:</span>
                <p className="font-semibold">{data.eventType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-semibold">
                  {data.date
                    ? data.date.toLocaleDateString()
                    : "To be discussed"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Guests:</span>
                <p className="font-semibold">{data.guests} people</p>
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
    <section className="max-w-4xl mx-auto" id="events-inquiry-form">
      <Card className="shadow-elegant bg-gradient-subtle">
        <CardHeader className="text-center pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Private Event Booking
          </h1>
          <p className="text-muted-foreground">
            Tell us about your vision and we&apos;ll create a personalized
            proposal
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="min-h-[400px]"
            >
              {currentStep === 1 && <ContactInfoStep form={form} />}
              {currentStep === 2 && <EventDetailsStep />}
              {currentStep === 3 && <AdditionalDetailsStep />}
              {currentStep === 4 && <ReviewStep onEdit={setCurrentStep} />}

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  type="button"
                  disabled={currentStep === 1}
                >
                  <ArrowLeft /> Previous
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
                  <Button
                    onClick={handleNext}
                    type="button"
                    className="bg-gradient-primary"
                  >
                    Next <ArrowRight />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="bg-gradient-primary"
                    onClick={() => form.handleSubmit(onSubmit)()}
                  >
                    {!isSubmitting ? (
                      <>
                        Submit Inquiry <CheckCircle />
                      </>
                    ) : (
                      <>
                        Submitting Inquiry...{" "}
                        <Loader className="animate-spin" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
