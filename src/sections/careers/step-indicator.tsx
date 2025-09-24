import { cn } from "@/lib/utils";
import {
  BriefcaseBusinessIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepIcons = [
  { icon: UserIcon, label: "Personal Info" },
  { icon: BriefcaseBusinessIcon, label: "Experience" },
  { icon: ClockIcon, label: "Availability" },
  { icon: FileTextIcon, label: "Documents" },
  { icon: EyeIcon, label: "Review" },
];

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {stepIcons.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Step circle */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background",
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
                {isCompleted ? <CheckIcon /> : <Icon />}
              </div>

              {/* Step label */}
              <div className="mt-3 text-center hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    {
                      "text-primary": isCompleted || isCurrent,
                      "text-muted-foreground": isUpcoming,
                    }
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
