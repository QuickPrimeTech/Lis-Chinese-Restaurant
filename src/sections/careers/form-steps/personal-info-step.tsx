"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { validatePersonalInfo } from "@/lib/form-validation";
import type { FormData } from "@/sections/careers/job-application-form";

interface PersonalInfoStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function PersonalInfoStep({
  data,
  updateData,
  onValidationChange,
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const validation = validatePersonalInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
    });

    const filteredErrors: Record<string, string> = {};
    Object.keys(validation.errors).forEach((field) => {
      if (touchedFields[field]) {
        filteredErrors[field] = validation.errors[field];
      }
    });

    setErrors(filteredErrors);
    onValidationChange(validation.isValid);
  }, [
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.address,
    data.dateOfBirth,
    touchedFields,
  ]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateData({ [field]: value });
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field: keyof FormData) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={data.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            onBlur={() => handleInputBlur("firstName")}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={data.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            onBlur={() => handleInputBlur("lastName")}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleInputBlur("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+254 700 000 000"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={() => handleInputBlur("phone")}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          placeholder="Enter your full address"
          rows={3}
          value={data.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          onBlur={() => handleInputBlur("address")}
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Date of Birth *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !data.dateOfBirth && "text-muted-foreground",
                errors.dateOfBirth && "border-destructive"
              )}
              onBlur={() => handleInputBlur("dateOfBirth")}
            >
              <span className="mr-2">📅</span>
              {data.dateOfBirth ? (
                formatDate(data.dateOfBirth)
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                data.dateOfBirth ? new Date(data.dateOfBirth) : undefined
              }
              onSelect={(date) => {
                if (date) {
                  handleInputChange("dateOfBirth", formatDateForInput(date));
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
        )}
      </div>
    </div>
  );
}
