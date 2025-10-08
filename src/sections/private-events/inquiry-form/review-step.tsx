"use client";

import { useFormContext } from "react-hook-form";
import { PrivateEventFormValues } from "@/schemas/private-event";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  onEdit: (step: number) => void;
}

export const ReviewStep = ({ onEdit }: ReviewStepProps) => {
  const { getValues } = useFormContext<PrivateEventFormValues>();
  const data = getValues();

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review Your Information
        </h2>
        <p className="text-muted-foreground">
          Please review your details before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Contact Info */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Contact Information
              </h3>
              <Button
                type="button"
                onClick={() => onEdit(1)}
                variant="secondary"
              >
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {data.firstName} {data.lastName}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {data.email}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {data.phone}
              </p>
              {data.company && (
                <p>
                  <span className="text-muted-foreground">Company:</span>{" "}
                  {data.company}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Event Details
              </h3>
              <Button
                type="button"
                onClick={() => onEdit(2)}
                variant="secondary"
              >
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-muted-foreground">Event Type:</span>{" "}
                {data.eventType}
              </p>
              <p>
                <span className="text-muted-foreground">Date:</span>{" "}
                {data.date ? format(data.date, "PPP") : "To be discussed"}
              </p>
              <p>
                <span className="text-muted-foreground">Guests:</span>{" "}
                {data.guests} people
              </p>
              {data.budget && (
                <p>
                  <span className="text-muted-foreground">Budget:</span>{" "}
                  {data.budget}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        {data.details && (
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Additional Details
                </h3>
                <Button
                  type="button"
                  onClick={() => onEdit(3)}
                  variant="secondary"
                >
                  Edit
                </Button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {data.details}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
