"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useJobApplication } from "@/contexts/job-application";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/form-schema";

export function PersonalInfoStep() {
  const { control, setValue, getValues } = useFormContext<FormData>();
  const { updateFormData } = useJobApplication();

  // Instead of syncing on every keystroke, sync on blur
  const handleBlur = (fieldName: keyof FormData) => {
    const value = getValues(fieldName) || "";
    updateFormData({ [fieldName]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your first name"
                  onBlur={() => handleBlur("firstName")}
                />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your last name"
                  onBlur={() => handleBlur("lastName")}
                />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="your.email@example.com"
                  onBlur={() => handleBlur("email")}
                />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="+254 700 000 000"
                  onBlur={() => handleBlur("phone")}
                />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="address"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Address *</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={3}
                placeholder="Enter your full address"
                onBlur={() => handleBlur("address")}
              />
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Date of Birth *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="date"
                onBlur={() => handleBlur("dateOfBirth")}
              />
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
