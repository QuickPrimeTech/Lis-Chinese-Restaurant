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
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Calendar,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const inquiryTypes = [
    "General Inquiry",
    "Reservation Request",
    "Private Event Planning",
    "Catering Services",
    "Gift Cards",
    "Media & Press",
    "Employment Opportunities",
    "Feedback & Suggestions",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, submit to backend API here
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
                Message Sent Successfully!
              </h1>
              <p className="text-xl text-muted-foreground font-chivo leading-relaxed mb-8">
                Thank you for reaching out to Luxuria. We&apos;ve received your
                message and will respond within 24 hours.
              </p>

              <Card className="bg-card border-primary/20 shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="font-cinzel font-semibold text-2xl text-foreground mb-6">
                    What&apos;s Next?
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-chivo font-semibold text-foreground">
                          Response Time
                        </p>
                        <p className="text-muted-foreground text-sm">
                          We&apos;ll respond within 24 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-chivo font-semibold text-foreground">
                          Email Confirmation
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Check your email for confirmation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-chivo font-semibold text-foreground">
                          Urgent Matters
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Call us at +1 (555) 123-LUXE
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
                    subject: "",
                    message: "",
                  });
                }}
                variant="outline"
                className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Send Another Message
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
        <Image
          src={"/contact-hero.jpg"}
          alt="Contact Hero"
          className="absolute inset-0 object-cover w-full h-full"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground font-chivo max-w-3xl mx-auto">
                We&apos;d love to hear from you. Reach out for reservations,
                inquiries, or just to say hello.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-cinzel font-bold text-foreground mb-8">
                Get in Touch
              </h2>
              <p className="text-muted-foreground font-chivo leading-relaxed mb-8">
                Whether you&apos;re planning a special celebration, have
                questions about our menu, or simply want to share feedback,
                we&apos;re here to help.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-cinzel font-semibold text-foreground mb-2">
                        Visit Us
                      </h3>
                      <p className="text-muted-foreground font-chivo">
                        123 Luxury Avenue
                        <br />
                        Fine Dining District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-cinzel font-semibold text-foreground mb-2">
                        Call Us
                      </h3>
                      <div className="text-muted-foreground font-chivo">
                        <p className="mb-1">Reservations: +1 (555) 123-LUXE</p>
                        <p className="mb-1">Events: +1 (555) 123-EVENT</p>
                        <p>General: +1 (555) 123-INFO</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-cinzel font-semibold text-foreground mb-2">
                        Email Us
                      </h3>
                      <div className="text-muted-foreground font-chivo">
                        <p className="mb-1">reservations@luxuria.com</p>
                        <p className="mb-1">events@luxuria.com</p>
                        <p>info@luxuria.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-cinzel font-semibold text-foreground mb-2">
                        Hours
                      </h3>
                      <div className="text-muted-foreground font-chivo text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Monday - Thursday</span>
                          <span>5:00 PM - 11:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friday - Saturday</span>
                          <span>5:00 PM - 12:00 AM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>5:00 PM - 10:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-luxury">
              <CardHeader>
                <CardTitle className="font-cinzel text-3xl flex items-center gap-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground font-chivo">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Inquiry Type *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
            <CardContent className="p-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
                Make a Reservation
              </h3>
              <p className="text-muted-foreground font-chivo mb-6">
                Book your table for an unforgettable dining experience
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
            <CardContent className="p-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
                Plan an Event
              </h3>
              <p className="text-muted-foreground font-chivo mb-6">
                Create memorable celebrations with our event specialists
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Inquire Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
            <CardContent className="p-8">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
                General Questions
              </h3>
              <p className="text-muted-foreground font-chivo mb-6">
                Have questions about our menu, services, or policies?
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Get Answers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
