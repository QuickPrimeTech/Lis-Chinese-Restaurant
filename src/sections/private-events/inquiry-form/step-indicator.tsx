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
      <div className="flex items-start justify-between">
        {steps.slice(0, totalSteps).map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isFirst = index === 0;

          return (
            <React.Fragment key={step.id}>
              {!isFirst && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mt-6 transition-all duration-300",
                    isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
              {/* Circle + Label */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
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
                <span
                  className={cn(
                    "hidden sm:block mt-2 text-sm font-medium transition-colors duration-300",
                    isActive && "text-primary",
                    isCompleted && "text-primary",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
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
