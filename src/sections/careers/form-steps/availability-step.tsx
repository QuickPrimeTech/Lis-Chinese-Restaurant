"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { validateAvailability } from "@/lib/form-validation";
import type { FormData } from "@/sections/careers/job-application-form";

interface AvailabilityStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

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

export function AvailabilityStep({
  data,
  updateData,
  onValidationChange,
}: AvailabilityStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateAvailability({
      startDate: data.startDate,
      availability: data.availability,
      hoursPerWeek: data.hoursPerWeek,
    });

    setErrors(validation.errors);
    onValidationChange(validation.isValid);
  }, [data.startDate, data.availability, data.hoursPerWeek]);

  const handleAvailabilityChange = (slot: string, checked: boolean) => {
    const updatedAvailability = checked
      ? [...data.availability, slot]
      : data.availability.filter((s) => s !== slot);
    updateData({ availability: updatedAvailability });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="startDate">Preferred Start Date *</Label>
        <Input
          id="startDate"
          type="date"
          value={data.startDate}
          onChange={(e) => updateData({ startDate: e.target.value })}
          className={errors.startDate ? "border-destructive" : ""}
        />
        {errors.startDate && (
          <p className="text-sm text-destructive">{errors.startDate}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursPerWeek">Hours Per Week *</Label>
        <Select
          value={data.hoursPerWeek}
          onValueChange={(value) => updateData({ hoursPerWeek: value })}
        >
          <SelectTrigger
            className={errors.hoursPerWeek ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select preferred hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="part-time">Part-time (20-30 hours)</SelectItem>
            <SelectItem value="full-time">Full-time (35-40 hours)</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
        {errors.hoursPerWeek && (
          <p className="text-sm text-destructive">{errors.hoursPerWeek}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Weekly Availability *</Label>
        <p className="text-sm text-muted-foreground">
          Select all time slots when you are available to work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availabilityOptions.map((slot) => (
            <div key={slot} className="flex items-center space-x-2">
              <Checkbox
                id={slot}
                checked={data.availability.includes(slot)}
                onCheckedChange={(checked) =>
                  handleAvailabilityChange(slot, checked as boolean)
                }
              />
              <Label htmlFor={slot} className="text-sm font-normal">
                {slot}
              </Label>
            </div>
          ))}
        </div>
        {errors.availability && (
          <p className="text-sm text-destructive">{errors.availability}</p>
        )}
      </div>
    </div>
  );
}
