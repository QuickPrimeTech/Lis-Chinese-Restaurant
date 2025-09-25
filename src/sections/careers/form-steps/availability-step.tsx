"use client";

import { useFormContext } from "react-hook-form";
import {
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
  const { control, watch, setValue } = useFormContext<any>();

  const availability = watch("availability") || [];

  return (
    <div className="space-y-6">
      {/* Start Date */}
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
                    checked={availability.includes(slot)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setValue("availability", [...availability, slot]);
                      } else {
                        setValue(
                          "availability",
                          availability.filter((s: string) => s !== slot)
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
    </div>
  );
}
