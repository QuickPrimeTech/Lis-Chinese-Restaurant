"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const EventInquiryForm = ({ selectedPackage }: { selectedPackage: string }) => {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    eventType: selectedPackage || "",
    guests: "",
    budget: "",
    details: "",
  });

  const eventTypes = [
    "Corporate Meeting",
    "Business Dinner",
    "Product Launch",
    "Wedding Reception",
    "Anniversary Celebration",
    "Birthday Party",
    "Holiday Party",
    "Networking Event",
    "Team Building",
    "Retirement Party",
    "Other",
  ];

  const guestCounts = ["8-12", "13-20", "21-30", "31-50", "51+"];
  const budgetRanges = [
    "$2,000-$5,000",
    "$5,000-$10,000",
    "$10,000-$20,000",
    "$20,000+",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
          Event Inquiry Received!
        </h1>
        <p className="text-xl text-muted-foreground font-chivo leading-relaxed mb-8">
          Thank you for your interest. Our event specialist will contact you
          within 24 hours.
        </p>

        <Card className="bg-card border-primary/20 shadow-luxury">
          <CardContent className="p-8 text-left">
            <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6 text-center">
              Your Event Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground font-chivo">
                  Contact:
                </span>
                <p className="font-chivo font-semibold">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-chivo">
                  Event Type:
                </span>
                <p className="font-chivo font-semibold">{formData.eventType}</p>
              </div>
              <div>
                <span className="text-muted-foreground font-chivo">Date:</span>
                <p className="font-chivo font-semibold">
                  {date ? format(date, "PPP") : "To be discussed"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground font-chivo">
                  Guests:
                </span>
                <p className="font-chivo font-semibold">
                  {formData.guests} people
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              company: "",
              eventType: "",
              guests: "",
              budget: "",
              details: "",
            });
            setDate(undefined);
          }}
          variant="outline"
          className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <Card className="bg-card border-border shadow-luxury">
      <CardHeader className="text-center">
        <CardTitle className="font-cinzel text-3xl mb-2">
          Event Inquiry Form
        </CardTitle>
        <p className="text-muted-foreground font-chivo">
          Tell us about your vision and we&apos;ll create a personalized
          proposal
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4">
              Contact Information
            </h3>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4">
              Event Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Event Type *</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) =>
                    handleInputChange("eventType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Date</Label>
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
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) => day < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Number of Guests *</Label>
                <Select
                  value={formData.guests}
                  onValueChange={(value) => handleInputChange("guests", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select guest count" />
                  </SelectTrigger>
                  <SelectContent>
                    {guestCounts.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count} guests
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Estimated Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Event Details & Special Requests</Label>
            <Textarea
              id="details"
              rows={6}
              value={formData.details}
              onChange={(e) => handleInputChange("details", e.target.value)}
              placeholder="Tell us about your vision, dietary requirements, entertainment needs, decoration preferences, etc."
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
          >
            Submit Event Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventInquiryForm;
