"use client";

import { useState } from "react";
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
import { CalendarIcon, Clock, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Reservations() {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "",
    time: "",
    occasion: "",
    requests: "",
  });

  const timeSlots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ];

  const guestCounts = ["1", "2", "3", "4", "5", "6", "7", "8+"];

  const occasions = [
    "Casual Dining",
    "Anniversary",
    "Birthday",
    "Business Dinner",
    "Date Night",
    "Special Celebration",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would submit to a booking system
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
                <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
                  Reservation Confirmed!
                </h1>
                <p className="text-xl text-muted-foreground font-chivo leading-relaxed">
                  Thank you for choosing Luxuria. We&apos;ve received your
                  reservation request and will confirm the details shortly.
                </p>
              </div>

              <Card className="bg-card border-primary/20 shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6">
                    Reservation Details
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Name:
                        </span>
                        <p className="font-chivo font-semibold">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Email:
                        </span>
                        <p className="font-chivo font-semibold">
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Date:
                        </span>
                        <p className="font-chivo font-semibold">
                          {date ? format(date, "PPP") : "Not selected"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Time:
                        </span>
                        <p className="font-chivo font-semibold">
                          {formData.time}
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
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Occasion:
                        </span>
                        <p className="font-chivo font-semibold">
                          {formData.occasion}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground font-chivo mb-4">
                      Confirmation will be sent to your email within 2 hours
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          guests: "",
                          time: "",
                          occasion: "",
                          requests: "",
                        });
                        setDate(undefined);
                      }}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Make Another Reservation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" />
        <Image
          src="/reservations-hero.jpg"
          fill
          alt="li's chinese restaurant reservation image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
                Reserve Your Table
              </h1>
              <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                Secure your seat at Luxuria for an unforgettable dining
                experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border shadow-luxury">
            <CardHeader className="text-center">
              <CardTitle className="font-cinzel text-3xl mb-2">
                Book Your Experience
              </CardTitle>
              <p className="text-muted-foreground font-chivo">
                Fill out the details below and we&apos;ll confirm your
                reservation
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="font-cinzel font-semibold text-xl mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Personal Information
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
                      <Label htmlFor="email">Email Address *</Label>
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
                      <Label htmlFor="phone">Phone Number *</Label>
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
                </div>

                {/* Reservation Details */}
                <div>
                  <h3 className="font-cinzel font-semibold text-xl mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Reservation Details
                  </h3>
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
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
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
                      <Label>Number of Guests *</Label>
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
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="font-cinzel font-semibold text-xl mb-4">
                    Additional Information
                  </h3>
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
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                >
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-foreground">
                Confirmation
              </h3>
              <p className="text-muted-foreground font-chivo text-sm">
                Receive confirmation within 2 hours via email and SMS
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-foreground">
                Flexible Seating
              </h3>
              <p className="text-muted-foreground font-chivo text-sm">
                Indoor, outdoor, and private dining options available
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-foreground">
                Easy Cancellation
              </h3>
              <p className="text-muted-foreground font-chivo text-sm">
                Cancel or modify up to 24 hours before your reservation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
