"use client";
import { FormProvider } from "react-hook-form";
import { type FormData } from "@/lib/form-schema"; // import from step 2

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersonalInfoStep } from "./form-steps/personal-info-step";
import { ExperienceStep } from "./form-steps/experience-step";
import { AvailabilityStep } from "./form-steps/availability-step";
import { DocumentsStep } from "./form-steps/documents-step";
import { ReviewStep } from "./form-steps/review-step";
import { StepIndicator } from "./step-indicator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJobApplication } from "@/contexts/job-application";

const steps = [
  { title: "Personal Information", description: "Tell us about yourself" },
  { title: "Experience & Skills", description: "Your culinary background" },
  { title: "Availability", description: "When can you work?" },
  { title: "Documents", description: "Upload your resume" },
  { title: "Review & Submit", description: "Final review" },
];

export function JobApplicationForm() {
  const {
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    methods,
    nextStep,
  } = useJobApplication();

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleFinalSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    alert(JSON.stringify(values, null, 2));
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ExperienceStep />;
      case 2:
        return <AvailabilityStep />;
      case 3:
        return <DocumentsStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFinalSubmit)}>
        <section className="py-8 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Apply to Join Our Team
              </h2>
              <p className="text-muted-foreground">
                Complete the application form below to be considered for a
                position
              </p>
            </div>

            <StepIndicator totalSteps={steps.length} />

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      {steps[currentStep].title}
                    </CardTitle>
                    <CardDescription>
                      {steps[currentStep].description}
                    </CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {renderStep()}

                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    type="button"
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft /> Previous
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      Next <ChevronRight />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </form>
    </FormProvider>
  );
}
