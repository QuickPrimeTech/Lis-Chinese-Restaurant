import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReservationFormValues } from "@/types/reservations";

interface PersonalInfoStepProps {
  form: UseFormReturn<ReservationFormValues>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">First Name <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your first name" 
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Last Name <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your last name" 
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Email <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="john@example.com" 
                type="email"
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Phone <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input 
                placeholder="+1 (555) 123-4567" 
                type="tel"
                {...field}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};