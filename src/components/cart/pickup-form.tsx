"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, MapPin, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useOrder } from "@/contexts/order-context";

interface PickupFormProps {
  onContinue: () => void;
}

export function PickupForm({ onContinue }: PickupFormProps) {
  const { pickupInfo, setPickupInfo } = useOrder();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    pickupInfo?.scheduledTime ? new Date(pickupInfo.scheduledTime) : undefined
  );
  const [formData, setFormData] = useState({
    time: pickupInfo?.scheduledTime
      ? pickupInfo.scheduledTime.toTimeString().slice(0, 5)
      : "",
    phone: pickupInfo?.phone || "",
    instructions: pickupInfo?.instructions || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const isToday =
      selectedDate && selectedDate.toDateString() === now.toDateString();

    // Restaurant hours: 9 AM to 10 PM
    for (let hour = 9; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(selectedDate || now);
        slotTime.setHours(hour, minute, 0, 0);

        // Skip past times for today
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedDate) {
      newErrors.date = "Pickup date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Pickup date cannot be in the past";
      }

      // Check if date is more than 7 days in advance
      const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (selectedDate > maxDate) {
        newErrors.date = "Pickup can only be scheduled up to 7 days in advance";
      }
    }

    if (!formData.time) {
      newErrors.time = "Pickup time is required";
    } else if (selectedDate) {
      const selectedDateTime = new Date(selectedDate);
      const [hours, minutes] = formData.time.split(":").map(Number);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      const now = new Date();

      if (selectedDateTime <= new Date(now.getTime() + 30 * 60000)) {
        newErrors.time = "Pickup time must be at least 30 minutes from now";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(\+254|254|0)[17]\d{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Kenyan phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedDate) {
      const [hours, minutes] = formData.time.split(":").map(Number);
      const scheduledTime = new Date(selectedDate);
      scheduledTime.setHours(hours, minutes, 0, 0);

      setPickupInfo({
        scheduledTime,
        phone: formData.phone,
        instructions: formData.instructions,
      });
      onContinue();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pickup Location */}
        <Card className="w-full bg-green-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-green-900">
              <MapPin className="h-4 w-4" />
              Pickup Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-800 space-y-1">
              <p>
                <strong>Restaurant Address:</strong>
              </p>
              <p>123 Main Street, Westlands</p>
              <p>Nairobi, Kenya</p>
              <p className="pt-2">
                <strong>Hours:</strong> Daily 9:00 AM - 10:00 PM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Schedule */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Schedule Pickup
            </CardTitle>
            <CardDescription>
              Choose your preferred pickup date and time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                        errors.date && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        if (errors.date) {
                          setErrors((prev) => ({ ...prev, date: "" }));
                        }
                      }}
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
                {errors.date && (
                  <p className="text-xs text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label>Pickup Time *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleInputChange("time", value)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.time ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.length === 0 ? (
                      <SelectItem value="" disabled>
                        No available times for selected date
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
                {errors.time && (
                  <p className="text-xs text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712345678 or +254712345678"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
              <p className="text-xs text-muted-foreground">
                We&apos;ll send you a confirmation SMS
              </p>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="instructions">
                Special Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="Any special requests or notes for your pickup order"
                value={formData.instructions}
                onChange={(e) =>
                  handleInputChange("instructions", e.target.value)
                }
                className="w-full"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pickup Summary */}
        {selectedDate && formData.time && (
          <Card className="w-full bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-blue-900">
                Pickup Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <strong>Date:</strong>{" "}
                  {format(selectedDate, "EEEE, MMMM do, yyyy")}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(`2000-01-01T${formData.time}`).toLocaleTimeString(
                    [],
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pickup Policy */}
        <Card className="w-full bg-amber-50 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-amber-900">
              Pickup Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• No pickup fee</li>
              <li>• Please arrive within 15 minutes of your scheduled time</li>
              <li>• Bring a valid ID for order verification</li>
              <li>• Orders not collected within 1 hour may be cancelled</li>
            </ul>
          </CardContent>
        </Card>
        <div className="pb-12 lg:pb-0">
          <Button type="submit" className="w-full" size="lg">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
