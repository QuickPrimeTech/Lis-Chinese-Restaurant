"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Clock,
  UtensilsCrossed,
  NotebookText,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

// Import step components
import { PersonalInfoStep } from "./personal-info-step";
import { ReservationDetailsStep } from "./reservation-details-step"; // ✅ fixed import
import { DiningPreferenceStep } from "./dining-preference-step";
import { AdditionalInfoStep } from "./additional-info-step";
import { SuccessStep } from "./success-step";

// Schema & type
import { FormSchema, ReservationFormValues } from "@/types/reservations";

export const ReservationFormSection = ({
  timeSlots,
  guestCounts,
  occasions,
}: {
  timeSlots: string[];
  guestCounts: string[];
  occasions: string[];
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: new Date(),
      time: "",
      guests: "",
      diningPreference: "",
      occasion: "",
      requests: "",
    },
  });

  // -------------------------
  // Step navigation handlers
  // -------------------------
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof ReservationFormValues)[] = [];

    if (step === 1) fieldsToValidate = ["firstName", "lastName", "email", "phone"];
    if (step === 2) fieldsToValidate = ["date", "time", "guests"];
    if (step === 3) fieldsToValidate = ["diningPreference"];

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Please check the highlighted fields and try again.");
    }
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: ReservationFormValues) => {
    setIsSubmitted(true);
    setStep(5);
    toast.success("Reservation confirmed! Check your WhatsApp for details.");
    console.log("Reservation data:", data);
  };

  const handleNewReservation = () => {
    setStep(1);
    setIsSubmitted(false);
    form.reset();
  };

  const stepLabels = [
    { label: "Personal Info", icon: <User className="h-4 w-4" /> },
    { label: "Date & Time", icon: <Clock className="h-4 w-4" /> },
    { label: "Dining Preference", icon: <UtensilsCrossed className="h-4 w-4" /> },
    { label: "Additional Info", icon: <NotebookText className="h-4 w-4" /> },
    { label: "Confirmed", icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card border-border shadow-lg transform transition-all duration-500 hover:shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words px-2 sm:px-0">
              {!isSubmitted && "Book Your Experience"}
            </CardTitle>

            {/* Step Indicators */}
            {!isSubmitted && (
              <div className="flex justify-center gap-2 md:gap-4 flex-wrap mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {stepLabels.slice(0, 4).map((item, index) => {
                  const current = index + 1;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform flex-shrink-0",
                        current === step
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : current < step
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center border border-current text-xs",
                          current === step ? "bg-primary-foreground text-primary" : ""
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {!isSubmitted && (
              <p className="text-muted-foreground text-sm md:text-base">
                Step {step} of 4
              </p>
            )}
          </CardHeader>

          <CardContent className="p-4 sm:p-8">
            {isSubmitted ? (
              <SuccessStep
                reservationData={form.getValues()}
                onNewReservation={handleNewReservation}
              />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 md:space-y-8"
                >
                  {step === 1 && <PersonalInfoStep form={form} />}
                  {step === 2 && (
                    <ReservationDetailsStep
                      form={form}
                      timeSlots={timeSlots}
                      guestCounts={guestCounts}
                    />
                  )}
                  {step === 3 && <DiningPreferenceStep form={form} />}
                  {step === 4 && (
                    <AdditionalInfoStep form={form} occasions={occasions} />
                  )}

                  {/* Navigation Buttons */}
                  <div
                    className={cn(
                      "flex",
                      step > 1 ? "justify-between" : "justify-end"
                    )}
                  >
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="ml-auto bg-primary hover:bg-primary/90 transition-all duration-300"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="ml-auto bg-gradient-primary hover:opacity-90 transition-all duration-300 text-lg px-6 py-3"
                      >
                        Confirm Reservation
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
