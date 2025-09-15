  import { Button } from "@/components/ui/button";
  import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
  import { Home, TreePine } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { ReservationFormValues } from "@/types/reservations"; // 👈 import type
  import { UseFormReturn } from "react-hook-form"; // 👈 import from RHF

  interface DiningPreferenceStepProps {
    form: UseFormReturn<ReservationFormValues>;
  }

  export const DiningPreferenceStep = ({ form }: DiningPreferenceStepProps) => {
    const diningOptions = [
      {
        value: "indoor",
        label: "Indoor Dining",
        description: "Climate-controlled comfort with elegant ambiance",
        icon: <Home className="h-6 w-6" />,
      },
      {
        value: "outdoor",
        label: "Outdoor Dining",
        description: "Fresh air and scenic views on our patio",
        icon: <TreePine className="h-6 w-6" />,
      },
    ];

    return (
      <div className="space-y-6 transition-all duration-500 ease-in-out">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Choose Your Dining Experience</h3>
          <p className="text-muted-foreground">Select your preferred seating area</p>
        </div>

        <FormField
          control={form.control}
          name="diningPreference"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {diningOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange(option.value)}
                      className={cn(
                        "whitespace-normal h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-300 hover:shadow-md",
                        field.value === option.value
                          ? "border-primary bg-primary/10 text-primary shadow-md"
                          : "hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-full transition-colors",
                          field.value === option.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {option.icon}
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-muted-foreground mt-1 break-words text-center">
  {option.description}
</div>

                      </div>
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
