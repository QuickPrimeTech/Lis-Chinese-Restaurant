import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "@/schemas/reservations";
import * as z from "zod";

interface AdditionalInfoStepProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>; // ✅ correct type
  occasions: string[];
}

export const AdditionalInfoStep = ({
  form,
  occasions,
}: AdditionalInfoStepProps) => {
  return (
    <div className="space-y-6 transition-all duration-500 ease-in-out">
      {/* Occasion Select */}
      <FormField
        control={form.control}
        name="occasion"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Occasion (optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Select occasion (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {occasions.map((occasion) => (
                  <SelectItem key={occasion} value={occasion}>
                    {occasion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Special Requests */}
      <FormField
        control={form.control}
        name="requests"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">
              Special Requests (optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any dietary restrictions, seating preferences, celebrations, or other special requests..."
                className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
