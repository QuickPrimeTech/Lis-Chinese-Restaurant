"use client";
import { useCareer } from "@/contexts/career-provider";
import { PersonalInfoStep } from "./form-steps/personal-info-step";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExperienceStep } from "./form-steps/experience-step";
import { AvailabilityStep } from "./form-steps/availability-step";
import { DocumentsStep } from "./form-steps/documents-step";
import { ReviewStep } from "./form-steps/review-step";
import { stepIcons, StepIndicator } from "./step-indicator";

export const steps = [
  PersonalInfoStep,
  ExperienceStep,
  AvailabilityStep,
  DocumentsStep,
  ReviewStep,
];

export function CareerApplicationForm() {
  const { currentStep } = useCareer();
  const CurrentStepForm = steps[currentStep];
  return (
    <Card className="max-w-2xl mx-auto mb-16">
      <CardHeader>
        <StepIndicator />
        <CardTitle className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">{stepIcons[currentStep].label}</h2>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CurrentStepForm />
      </CardContent>
    </Card>
  );
}
