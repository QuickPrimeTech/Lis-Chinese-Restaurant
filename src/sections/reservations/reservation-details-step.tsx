"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReservationFormValues } from "@/schemas/reservations";
import {
  filterAvailableTimeSlots,
  getNextAvailableTimeSlot,
  RESTAURANT_CONFIG,
} from "@/utils/generate-timeslots";

interface ReservationDetailsStepProps {
  form: UseFormReturn<ReservationFormValues>;
  guestCounts: string[];
}

export const ReservationDetailsStep = ({
  form,
  guestCounts,
}: ReservationDetailsStepProps) => {
  const selectedDate = form.watch("date");
  const timeSlots = selectedDate ? filterAvailableTimeSlots(selectedDate) : [];

  const nextAvailable = getNextAvailableTimeSlot();

  return (
    <div className="space-y-6">
      {/* Form fields */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out">
        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-medium">
                Date <span className="text-destructive">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 hover:border-primary/50",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choose your date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(day) => {
                      // Normalize dates to midnight
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const maxDate = new Date(today);
                      maxDate.setDate(today.getDate() + 6);

                      return day < today || day > maxDate;
                    }}
                    autoFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Time <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                    <SelectValue placeholder="Choose time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.length > 0 ? (
                    timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-muted-foreground text-sm">
                      No slots available
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Guests */}
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Guests <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {guestCounts.map((count) => (
                    <SelectItem key={count} value={count}>
                      {count} {count === "1" ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Extra booking info */}
      <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground space-y-2">
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Next available slot:{" "}
          {nextAvailable ? (
            <span className="font-medium text-foreground">{nextAvailable}</span>
          ) : (
            "No slots left today"
          )}
        </p>
        <div className="flex gap-2">
          <Info className="size-4 text-primary" />
          <p>
            Book at least{" "}
            <span className="font-medium text-foreground">
              {RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS} hours
            </span>{" "}
            in advance. Max booking:{" "}
            <span className="font-medium text-foreground">
              {RESTAURANT_CONFIG.MAX_ADVANCE_DAYS} days
            </span>{" "}
            ahead.
          </p>
        </div>
      </div>
    </div>
  );
};
