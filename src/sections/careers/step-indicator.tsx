"use client";

import { useCareer } from "@/contexts/career-provider";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusinessIcon,
  Check,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";

export const stepIcons = [
  { icon: UserIcon, label: "Personal Info" },
  { icon: BriefcaseBusinessIcon, label: "Experience" },
  { icon: ClockIcon, label: "Availability" },
  { icon: FileTextIcon, label: "Documents" },
  { icon: EyeIcon, label: "Review" },
];

export function StepIndicator() {
  const { currentStep } = useCareer();
  const totalSteps = stepIcons.length;

  return (
    <div className="w-full mb-8">
      <div className="relative flex items-center justify-between">
        {/* Connector line behind all steps */}
        <div className="absolute top-5 md:top-6 w-full h-0.5 bg-muted-foreground " />

        {/* Active progress line */}
        <div
          className="absolute top-5 md:top-6 left-6 h-0.5 bg-primary transition-all duration-500"
          style={{
            width: `calc(${(currentStep / (totalSteps - 1)) * 100}% - 1.5rem)`,
          }}
        />

        {stepIcons.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={index} className="flex flex-col relative">
              {/* Step circle */}
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background z-10",
                  {
                    "border-primary bg-primary text-primary-foreground":
                      isCompleted,
                    "border-primary bg-background text-primary ring-4 ring-primary/20":
                      isCurrent,
                    "border-muted-foreground/30 text-muted-foreground":
                      isUpcoming,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="size-5 md:size-6" />
                ) : (
                  <Icon className="size-5 md:size-6" />
                )}
              </div>

              {/* Step label */}
              <p
                className={cn(
                  "mt-2 text-[10px] sm:text-xs font-medium transition-colors duration-300 text-center",
                  {
                    "text-primary": isCompleted || isCurrent,
                    "text-muted-foreground": isUpcoming,
                  }
                )}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
