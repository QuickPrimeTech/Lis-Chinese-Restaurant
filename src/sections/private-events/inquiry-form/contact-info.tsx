// @/sections/private-events/inquiry-form/contact-info.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

interface ContactInfoStepProps {
  data: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  errors?: Partial<Record<keyof ContactData, string>>;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Let&apos;s start with your basic contact details
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={errors.firstName ? "border-destructive" : ""}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={errors.lastName ? "border-destructive" : ""}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
            placeholder="+254746815106"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="company">Company/Organization</Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Your company or organization (optional)"
          />
        </div>
      </div>
    </div>
  );
};
