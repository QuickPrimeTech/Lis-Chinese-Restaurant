"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { MapPin, Clock, CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrder } from "@/contexts/order-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

/**
 * Schema & Types
 *
 * - We preprocess unknown -> Date (accept Date or string) with a typed `val: any`.
 * - Use z.instanceof(Date, { message }) rather than passing `required_error` to z.date()
 *   to avoid Zod TS mismatches across versions.
 * - Then refine the date to ensure it's within [today, today+7days].
 */
/**
 * Schema & Types
 */
const pickupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Enter a valid email").optional().or(z.literal("")), // allow empty string if skipped

  date: z.date().refine(
    (date) => {
      if (Number.isNaN(date.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return date >= today && date <= maxDate;
    },
    { message: "Pickup must be within the next 7 days" }
  ),

  time: z.string().min(1, "Pickup time is required"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+254|254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),

  instructions: z.string().optional(),
});

type PickupFormValues = z.infer<typeof pickupSchema>;

interface PickupFormProps {
  onContinue: () => void;
}

export function PickupForm({ onContinue }: PickupFormProps) {
  const { setPickupInfo } = useOrder();

  // We still keep a small local state for the calendar to show selected date fast.
  const [localDate, setLocalDate] = useState<Date | undefined>(undefined);

  const form = useForm<PickupFormValues>({
    resolver: zodResolver(pickupSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      date: undefined as unknown as Date,
      time: "",
      phone: "",
      instructions: "",
    },
  });

  // Load saved details once on mount
  useEffect(() => {
    const saved = localStorage.getItem("pickupUserDetails");
    if (saved) {
      const data = JSON.parse(saved);
      form.reset({
        ...form.getValues(), // keep current defaults
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        instructions: data.instructions || "",
      });
    }
  }, [form]);

  // Helper: generate time slots based on the currently selected date (from form or local)
  const getSelectedDate = (): Date | undefined => {
    // prefer react-hook-form value if present (it will be a Date if valid)
    const watched = form.watch("date") as unknown as Date | undefined;
    return watched instanceof Date && !Number.isNaN(watched.getTime())
      ? watched
      : localDate;
  };

  const generateTimeSlots = () => {
    const slots: { value: string; label: string }[] = [];
    const now = new Date();
    const selected = getSelectedDate();
    const isToday = selected && selected.toDateString() === now.toDateString();

    for (let hour = 11; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(selected || now);
        slotTime.setHours(hour, minute, 0, 0);

        // Skip past times for today (require at least 30 minutes from now)
        if (isToday && slotTime <= new Date(now.getTime() + 30 * 60000)) {
          continue;
        }

        const timeString = slotTime.toTimeString().slice(0, 5);
        const displayTime = slotTime.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        slots.push({ value: timeString, label: displayTime });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // onSubmit will receive typed values (date is Date due to schema)
  const onSubmit = (values: PickupFormValues) => {
    localStorage.setItem(
      "pickupUserDetails",
      JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        instructions: values.instructions,
      })
    );

    // values.date is a Date (per schema), but to be defensive copy it
    const scheduledTime = new Date(values.date.getTime());
    const [hours, minutes] = values.time.split(":").map(Number);
    scheduledTime.setHours(hours, minutes, 0, 0);

    setPickupInfo({
      scheduledTime,
      phone: values.phone,
      instructions: values.instructions,
    });

    onContinue();
  };

  // Helper to set date in both local and form state
  const handleDateSelect = (date?: Date) => {
    setLocalDate(date);
    if (date) {
      form.setValue("date", date, { shouldValidate: true, shouldDirty: true });
    } else {
      form.setValue("date", date as unknown as Date); // clear
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full max-sm:pb-16"
    >
      {/* Location */}
      <Card className="w-full bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-50">
            <MapPin className="h-4 w-4" />
            Pickup Location
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-700 dark:text-green-200 space-y-1">
          <p>
            <strong className="mr-2">Located in: PETROCITY-Gigiri</strong>
          </p>
          <p>Address: QR74+JR2, Limuru Rd, Nairobi</p>
          <p className="pt-2">
            <strong className="mr-2">Opening Days:</strong> Tuesday – Sunday
          </p>
          <p>
            <strong className="mr-2">Hours:</strong>11:00 AM – 10:30 PM
          </p>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Schedule Pickup
          </CardTitle>
          <CardDescription>Choose your preferred date & time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
          {/* Date */}
          <div className="space-y-2">
            <Label>Pickup Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.watch("date") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("date")
                    ? // guard format call
                      (() => {
                        const d = form.watch("date") as unknown as
                          | Date
                          | undefined;
                        return d ? format(d, "PPP") : "Pick a date";
                      })()
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("date") as unknown as Date | undefined}
                  onSelect={(date) => handleDateSelect(date)}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const maxDate = new Date(
                      today.getTime() + 7 * 24 * 60 * 60 * 1000
                    );
                    return date < today || date > maxDate;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.date && (
              <p className="text-xs text-red-500">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label>Pickup Time *</Label>
            <Select
              onValueChange={(val) =>
                form.setValue("time", val, { shouldValidate: true })
              }
              value={form.watch("time")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.length === 0 ? (
                  <SelectItem value="" disabled>
                    No times available
                  </SelectItem>
                ) : (
                  timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {form.formState.errors.time && (
              <p className="text-xs text-red-500">
                {form.formState.errors.time.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input
              type="tel"
              placeholder="0712345678 or +254712345678"
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label>Email (Optional)</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          {/* Instructions */}
          <div className="space-y-2">
            <Label>Special Instructions (Optional)</Label>
            <Textarea
              rows={2}
              placeholder="Any special requests"
              {...form.register("instructions")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Policy */}
      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-amber-900 dark:text-amber-50">
            Pickup Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
          <p>• No pickup fee</p>
          <p>• Arrive within 15 minutes of scheduled time</p>
          <p>• Bring valid ID for verification</p>
          <p>• Orders not collected within 1 hour may be cancelled</p>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Continue to Payment <ArrowRight />
      </Button>
    </form>
  );
}
