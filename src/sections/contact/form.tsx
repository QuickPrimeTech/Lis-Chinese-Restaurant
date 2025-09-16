// @/sections/contact/form.tsx

"use client";

import dynamic from 'next/dynamic';
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
import {  MessageSquare } from "lucide-react";
const ContactSuccess = dynamic(() => import('./success'));

export default function ContactForm() {
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
    // TODO: Send data to API
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <ContactSuccess setIsSubmitted={setIsSubmitted} setFormData={setFormData}  />
    );
  }

  return (
      
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
                    <div>
                      <Label htmlFor="firstName" className='mb-2'>First Name *</Label>
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
                        placeholder="+254 746815106"
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
  );
}