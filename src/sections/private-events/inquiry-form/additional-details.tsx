// @/sections/private-events/inquiry-form/additional-details.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalDetailsStepProps {
  details: string;
  onChange: (value: string) => void;
}

export const AdditionalDetailsStep: React.FC<AdditionalDetailsStepProps> = ({
  details,
  onChange,
}) => {
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
          value={details}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell us about your vision, dietary requirements, entertainment needs, decoration preferences, accessibility needs, or any other special requests..."
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          The more details you provide, the better we can tailor our proposal to
          your needs.
        </p>
      </div>
    </div>
  );
};
