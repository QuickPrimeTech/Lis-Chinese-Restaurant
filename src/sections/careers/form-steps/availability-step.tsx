"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { AvailabilityData, availabilitySchema } from "@/lib/form-schema";
import { getDefaultValues } from "@/lib/get-default-values";
import { NavigationButtons } from "./navigation-buttons";
import { useCareer } from "@/contexts/career-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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

export const AvailabilityStep = () => {
  const { data } = useCareer();

  const form = useForm<AvailabilityData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...getDefaultValues(availabilitySchema), ...data },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Preferred Start Date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => date < new Date()} // disable past dates
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hours per week */}
          <FormField
            control={form.control}
            name="hoursPerWeek"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Hours Per Week *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select preferred hours" />
                    </SelectTrigger>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availabilityOptions.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <Checkbox
                      id={slot}
                      checked={field.value?.includes(slot)}
                      onCheckedChange={(checked) => {
                        const newAvailability = checked
                          ? [...field.value, slot]
                          : field.value.filter((s) => s !== slot);
                        field.onChange(newAvailability);
                      }}
                    />
                    <label
                      htmlFor={slot}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <NavigationButtons form={form} />
      </form>
    </Form>
  );
};
