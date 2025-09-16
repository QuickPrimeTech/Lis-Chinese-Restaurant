// @/sections/private-events/inquiry-form/review-step.tsx

import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReviewData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  eventType: string;
  guests: string;
  budget: string;
  details: string;
}

interface ReviewStepProps {
  data: ReviewData;
  date: Date | undefined;
  onEdit: (step: number) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  date,
  onEdit,
}) => {
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
        {/* Contact Information */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Contact Information
              </h3>
              <Button onClick={() => onEdit(1)} variant="secondary">
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>
                <p className="font-medium">
                  {data.firstName} {data.lastName}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{data.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="font-medium">{data.phone}</p>
              </div>
              {data.company && (
                <div>
                  <span className="text-muted-foreground">Company:</span>
                  <p className="font-medium">{data.company}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Event Details
              </h3>
              <Button onClick={() => onEdit(2)} variant="secondary">
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Event Type:</span>
                <p className="font-medium">{data.eventType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-medium">
                  {date ? format(date, "PPP") : "To be discussed"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Guests:</span>
                <p className="font-medium">{data.guests} people</p>
              </div>
              {data.budget && (
                <div>
                  <span className="text-muted-foreground">Budget:</span>
                  <p className="font-medium">{data.budget}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        {data.details && (
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Additional Details
                </h3>
                <Button onClick={() => onEdit(3)} variant="secondary">
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
