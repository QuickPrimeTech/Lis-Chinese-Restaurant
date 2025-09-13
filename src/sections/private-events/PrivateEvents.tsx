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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  CalendarIcon,
  Users,
  MapPin,
  CheckCircle,
  Star,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
// Use the public URL for the image
const privateEventsHero = "/private-events-hero.jpg";

const PrivateEvents = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setSelectedPackage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    guests: "",
    budget: "",
    time: "",
    duration: "",
    catering: "",
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

  const eventPackages = [
    {
      id: "intimate",
      name: "Intimate Gathering",
      capacity: "8-12 guests",
      price: "From $2,500",
      features: [
        "Private dining room",
        "4-course tasting menu",
        "Wine pairing selection",
        "Dedicated server",
        "Custom table settings",
      ],
      image: privateEventsHero,
    },
    {
      id: "celebration",
      name: "Celebration Package",
      capacity: "13-30 guests",
      price: "From $5,500",
      features: [
        "Semi-private dining area",
        "Customizable menu options",
        "Full bar service",
        "Event coordinator",
        "Floral arrangements",
        "Audio/visual setup",
      ],
      image: privateEventsHero,
    },
    {
      id: "corporate",
      name: "Corporate Experience",
      capacity: "20-50 guests",
      price: "From $12,000",
      features: [
        "Exclusive restaurant buyout",
        "Multi-course dining experience",
        "Premium bar package",
        "Professional event planning",
        "Custom branding options",
        "Photography service",
      ],
      image: privateEventsHero,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
              <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-glow" />
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
                Event Inquiry Received!
              </h1>
              <p className="text-xl text-muted-foreground font-chivo leading-relaxed mb-8">
                Thank you for your interest in hosting a private event at
                Li&apos;s Chinese Restaurant. Our event specialist will contact
                you within 24 hours to discuss your requirements.
              </p>

              <Card className="bg-card border-primary/20 shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6">
                    Your Event Details
                  </h3>
                  <div className="space-y-3 text-left">
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
                        <p className="font-chivo font-semibold">
                          {formData.eventType}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-chivo">
                          Date:
                        </span>
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
                    time: "",
                    duration: "",
                    catering: "",
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${privateEventsHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
                Private Events
              </h1>
              <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                Create unforgettable memories with exclusive dining experiences
                tailored to your special occasion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="packages" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-card border border-border">
              <TabsTrigger
                value="packages"
                className="font-chivo font-semibold"
              >
                Event Packages
              </TabsTrigger>
              <TabsTrigger value="inquiry" className="font-chivo font-semibold">
                Book Your Event
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="packages" className="space-y-16">
            {/* Event Packages */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-cinzel font-bold text-foreground mb-6">
                  Curated Event Experiences
                </h2>
                <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                  From intimate celebrations to grand corporate events, we
                  create bespoke experiences that exceed expectations
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {eventPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="group hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-chivo font-semibold text-primary">
                            {pkg.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-cinzel font-bold text-xl text-foreground">
                            {pkg.name}
                          </h3>
                          <span className="font-cinzel font-bold text-lg text-primary">
                            {pkg.price}
                          </span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {pkg.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-muted-foreground font-chivo"
                            >
                              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => {
                            setSelectedPackage(pkg.id);
                            const inquiryTab = document.querySelector(
                              '[value="inquiry"]'
                            ) as HTMLElement;
                            inquiryTab?.click();
                          }}
                          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        >
                          Inquire About This Package
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-card rounded-2xl p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                  Why Choose Li&apos;s Chinese Restaurant for Your Event
                </h3>
              </div>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-cinzel font-semibold mb-2">
                    Culinary Excellence
                  </h4>
                  <p className="text-muted-foreground font-chivo text-sm">
                    Award-winning cuisine crafted by world-class chefs
                  </p>
                </div>
                <div>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-cinzel font-semibold mb-2">
                    Dedicated Service
                  </h4>
                  <p className="text-muted-foreground font-chivo text-sm">
                    Personal event coordinator and professional staff
                  </p>
                </div>
                <div>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-cinzel font-semibold mb-2">
                    Elegant Venues
                  </h4>
                  <p className="text-muted-foreground font-chivo text-sm">
                    Sophisticated spaces perfect for any occasion
                  </p>
                </div>
                <div>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-cinzel font-semibold mb-2">
                    Bespoke Experience
                  </h4>
                  <p className="text-muted-foreground font-chivo text-sm">
                    Fully customizable to your vision and needs
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inquiry" className="space-y-8">
            {/* Inquiry Form */}
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
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
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
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
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
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Select date</span>
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
                        <Label>Number of Guests *</Label>
                        <Select
                          value={formData.guests}
                          onValueChange={(value) =>
                            handleInputChange("guests", value)
                          }
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
                          onValueChange={(value) =>
                            handleInputChange("budget", value)
                          }
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
                    <Label htmlFor="details">
                      Event Details & Special Requests
                    </Label>
                    <Textarea
                      id="details"
                      rows={6}
                      value={formData.details}
                      onChange={(e) =>
                        handleInputChange("details", e.target.value)
                      }
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrivateEvents;
