import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { PrivateEventFormValues } from "@/schemas/private-event";

interface Props {
  form: UseFormReturn<PrivateEventFormValues>;
}

const contactFields = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "email", label: "Email", required: true },
  { name: "phone", label: "Phone", required: true },
] as const;

export const ContactInfoStep = ({ form }: Props) => {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Let&apos;s start with your basic contact details
        </p>
      </div>

      {/* Contact Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        {contactFields.map(({ name, label, required }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {label}{" "}
                  {required && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Optional company field */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Company/Organization</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your company or organization (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
