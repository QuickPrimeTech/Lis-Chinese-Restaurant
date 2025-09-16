// @/sections/private-events/inquiry-form/step-indicator.tsx

import React from "react";
import { User, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps: Step[] = [
  { id: 1, title: "Contact Info", icon: User },
  { id: 2, title: "Event Details", icon: Calendar },
  { id: 3, title: "Additional Details", icon: MessageSquare },
  { id: 4, title: "Review & Submit", icon: CheckCircle },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isLast = index === totalSteps - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                    isCompleted &&
                      "bg-primary border-primary text-primary-foreground shadow-glow",
                    isActive &&
                      "border-primary bg-primary/10 text-primary animate-glow",
                    !isActive &&
                      !isCompleted &&
                      "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  <step.icon className="w-5 h-5" />
                </div>

                {/* Step Label - Hidden on mobile */}
                <div className="hidden sm:block mt-2 text-center">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isActive && "text-primary",
                      isCompleted && "text-primary",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div
                    className={cn(
                      "h-0.5 transition-all duration-300",
                      isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Step Counter */}
      <div className="sm:hidden mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};
