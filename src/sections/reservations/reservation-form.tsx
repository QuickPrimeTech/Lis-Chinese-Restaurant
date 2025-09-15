"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReservationFormProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  timeSlots: string[];
  guestCounts: string[];
  occasions: string[];
}

export const ReservationFormSection = ({
  date,
  setDate,
  formData,
  handleInputChange,
  handleSubmit,
  timeSlots,
  guestCounts,
  occasions,
}: ReservationFormProps) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepLabels = [
    "Personal Info",
    "Reservation Details",
    "Additional Info",
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card border-border shadow-luxury">
          <CardHeader className="text-center">
            <CardTitle className="font-cinzel text-3xl mb-4">
              Book Your Experience
            </CardTitle>

            {/* Step Indicators */}
            <div className="flex justify-center gap-4 mb-4">
              {stepLabels.map((label, index) => {
                const current = index + 1;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all",
                      current === step
                        ? "bg-primary text-primary-foreground"
                        : current < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center border border-current text-xs">
                      {current}
                    </span>
                    {label}
                  </div>
                );
              })}
            </div>
            <p className="text-muted-foreground font-chivo">
              Step {step} of 3
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Reservation Details */}
              {step === 2 && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(day) => day < new Date()}
                          initialFocus
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Time *</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) =>
                        handleInputChange("time", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Guests *</Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) =>
                        handleInputChange("guests", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestCounts.map((count) => (
                          <SelectItem key={count} value={count}>
                            {count} {count === "1" ? "guest" : "guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Occasion</Label>
                    <Select
                      value={formData.occasion}
                      onValueChange={(value) =>
                        handleInputChange("occasion", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {occasions.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests</Label>
                    <Textarea
                      id="requests"
                      rows={4}
                      value={formData.requests}
                      onChange={(e) =>
                        handleInputChange("requests", e.target.value)
                      }
                      placeholder="Dietary restrictions, seating preferences, celebrations, etc."
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="ml-auto bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-6 py-3"
                  >
                    Confirm Reservation
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
