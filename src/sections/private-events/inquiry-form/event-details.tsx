"use client";

import { useFormContext, Controller } from "react-hook-form";
import { PrivateEventFormValues } from "@/schemas/private-event";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const eventTypes = [
  "Corporate Meeting",
  "Business Dinner",
  "Product Launch",
  "Wedding Reception",
  "Anniversary Celebration",
  "Birthday Party",
  "Holiday Party",
  "Networking Event",
  "Team Building",
  "Retirement Party",
  "Other",
];

const guestCounts = ["8-12", "13-20", "21-30", "31-50", "51+"];
const budgetRanges = [
  "KSh 50,000 – KSh 150,000",
  "KSh 150,000 – KSh 300,000",
  "KSh 300,000 – KSh 600,000",
  "KSh 600,000+",
];

export const EventDetailsStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PrivateEventFormValues>();

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Event Details
        </h2>
        <p className="text-muted-foreground">Tell us about your event vision</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Event Type */}
        <div className="space-y-2">
          <Label>
            Event Type <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="eventType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    "w-full",
                    errors.eventType && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && (
            <p className="text-sm text-destructive">
              {errors.eventType.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label>Preferred Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(day) => day < new Date()}
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label>
            Number of Guests <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    "w-full",
                    errors.guests && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Select guest count" />
                </SelectTrigger>
                <SelectContent>
                  {guestCounts.map((count) => (
                    <SelectItem key={count} value={count}>
                      {count} guests
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.guests && (
            <p className="text-sm text-destructive">{errors.guests.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label>Estimated Budget</Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
};
