import { Button } from "@/components/ui/button";
import { useCareer } from "@/contexts/career-provider";
import { steps } from "../career-form";
import { ApplicationData } from "@/lib/form-schema";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NavigationButtonsProps<T extends FieldValues> = {
  form?: UseFormReturn<T>; // optional now
};

export function NavigationButtons<T extends FieldValues>({
  form,
}: NavigationButtonsProps<T>) {
  const { currentStep, nextStep, prevStep, submitApplication, updateData } =
    useCareer();
  const isLastStep = currentStep === steps.length - 1;
  //This function saves the data before going back
  const handlePrev = () => {
    prevStep();
  };

  // Only define handleNextStep if form exists
  const handleNextStep =
    form?.handleSubmit((values) => {
      updateData(values as Partial<ApplicationData>);
      nextStep();
    }) ?? nextStep;

  const handleSubmit = () => {
    if (form) {
      // Final validation + submit
      form.handleSubmit((values) => {
        updateData(values as Partial<ApplicationData>);
        submitApplication();
      })();
    } else {
      // No form: just submit directly
      submitApplication();
    }
  };
  return (
    <div className="mt-8">
      <Separator className="mb-6" />
      <div className="flex justify-between">
        {/* Previous button always visible except first step */}
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          <ChevronLeft />
          Previous
        </Button>

        {/* Conditional logic */}
        {isLastStep ? (
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button type="button" onClick={handleNextStep}>
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
