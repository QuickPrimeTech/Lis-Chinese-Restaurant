"use client";

import { useFormContext } from "react-hook-form";
import { PrivateEventFormValues } from "@/schemas/private-event";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const AdditionalDetailsStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PrivateEventFormValues>();

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Additional Details
        </h2>
        <p className="text-muted-foreground">
          Share your vision and any special requirements
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Event Details & Special Requests</Label>
        <Textarea
          id="details"
          rows={8}
          placeholder="Tell us about your vision, dietary requirements, entertainment needs, decoration preferences, accessibility needs, or any other special requests..."
          {...register("details")}
          className="resize-none"
        />
        {errors.details && (
          <p className="text-sm text-destructive">{errors.details.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          The more details you provide, the better we can tailor our proposal to
          your needs.
        </p>
      </div>
    </div>
  );
};
