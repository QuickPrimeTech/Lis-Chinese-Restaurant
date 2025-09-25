"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { availabilitySchema } from "@/lib/form-schema";
import { AvailabilityData } from "@/lib/form-schema";
import { getDefaultValues } from "@/lib/get-default-values";
import { useEffect } from "react";
import { useJobApplication } from "@/contexts/job-application";

const availabilityOptions = [
  "Monday Morning",
  "Monday Evening",
  "Tuesday Morning",
  "Tuesday Evening",
  "Wednesday Morning",
  "Wednesday Evening",
  "Thursday Morning",
  "Thursday Evening",
  "Friday Morning",
  "Friday Evening",
  "Saturday Morning",
  "Saturday Evening",
  "Sunday Morning",
  "Sunday Evening",
];

export function AvailabilityStep() {
  const { updateFormData, formData } = useJobApplication();

  const form = useForm<AvailabilityData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      ...getDefaultValues(availabilitySchema),
      // If you want to populate with existing context data
      ...formData,
    },
    mode: "onChange", // live validation
  });

  // Sync form values to context whenever they change
  useEffect(() => {
    const subscription = form.watch((values) => {
      const sanitizedValues = {
        ...values,
        availability: values.availability?.filter((v): v is string => !!v), // remove undefined, type guard ensures string[]
      };
      updateFormData(sanitizedValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Start Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hours Per Week */}
        <FormField
          control={form.control}
          name="hoursPerWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours Per Week *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred hours" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="part-time">
                    Part-time (20-30 hours)
                  </SelectItem>
                  <SelectItem value="full-time">
                    Full-time (35-40 hours)
                  </SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Weekly Availability */}
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weekly Availability *</FormLabel>
              <p className="text-sm text-muted-foreground">
                Select all time slots when you are available to work
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {availabilityOptions.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <Checkbox
                      id={slot}
                      checked={field.value?.includes(slot)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), slot]);
                        } else {
                          field.onChange(
                            (field.value || []).filter((s) => s !== slot)
                          );
                        }
                      }}
                    />
                    <FormLabel htmlFor={slot} className="text-sm font-normal">
                      {slot}
                    </FormLabel>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
