"use client";

import { useState, useCallback } from "react";
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

export interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;

  // Experience
  position: string;
  experience: string;
  previousEmployment: string;
  skills: string[];
  languages: string[];

  // Availability
  startDate: string;
  availability: string[];
  hoursPerWeek: string;

  // Documents
  resume: File | null;
  coverLetter: string;
  references: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  position: "",
  experience: "",
  previousEmployment: "",
  skills: [],
  languages: [],
  startDate: "",
  availability: [],
  hoursPerWeek: "",
  resume: null,
  coverLetter: "",
  references: "",
};

const steps = [
  { title: "Personal Information", description: "Tell us about yourself" },
  { title: "Experience & Skills", description: "Your culinary background" },
  { title: "Availability", description: "When can you work?" },
  { title: "Documents", description: "Upload your resume" },
  { title: "Review & Submit", description: "Final review" },
];

export function JobApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepValidation, setStepValidation] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    true, // review step is always "valid"
  ]);

  // ✅ Stable updater
  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  // ✅ Stable validation handler
  const handleStepValidation = useCallback(
    (stepIndex: number, isValid: boolean) => {
      setStepValidation((prev) => {
        const newValidation = [...prev];
        newValidation[stepIndex] = isValid;
        return newValidation;
      });
    },
    []
  );

  const nextStep = () => {
    if (currentStep < steps.length - 1 && stepValidation[currentStep]) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Application submitted successfully! We will contact you soon.");
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={formData}
            updateData={updateFormData}
            onValidationChange={(isValid) => handleStepValidation(0, isValid)}
          />
        );
      case 1:
        return (
          <ExperienceStep
            data={formData}
            updateData={updateFormData}
            onValidationChange={(isValid) => handleStepValidation(1, isValid)}
          />
        );
      case 2:
        return (
          <AvailabilityStep
            data={formData}
            updateData={updateFormData}
            onValidationChange={(isValid) => handleStepValidation(2, isValid)}
          />
        );
      case 3:
        return (
          <DocumentsStep
            data={formData}
            updateData={updateFormData}
            onValidationChange={(isValid) => handleStepValidation(3, isValid)}
          />
        );
      case 4:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-8 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Apply to Join Our Team
          </h2>
          <p className="text-muted-foreground">
            Complete the application form below to be considered for a position
            at Li&apos;s Chinese Restaurant
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        {/* Form Card */}
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

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center justify-center gap-2 bg-transparent order-2 sm:order-1"
              >
                <ChevronLeft />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!stepValidation[currentStep]}
                  className="flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  Next
                  <ChevronRight />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
