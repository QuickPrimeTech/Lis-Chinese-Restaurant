"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Loader2,
  Navigation,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useOrder } from "@/contexts/order-context";

interface DeliveryFormProps {
  onContinue: () => void;
}

export function DeliveryForm({ onContinue }: DeliveryFormProps) {
  const { deliveryInfo, setDeliveryInfo } = useOrder();
  const [formData, setFormData] = useState({
    address: deliveryInfo?.address || "",
    phone: deliveryInfo?.phone || "",
    instructions: deliveryInfo?.instructions || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [, setLocationRetryKey] = useState(0);

  // Auto-detect location and get address
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      // Fallback to a generic address based on coordinates
      setFormData((prev) => ({
        ...prev,
        address: `Location: ${lat.toFixed(6)}, ${lng.toFixed(
          6
        )} (Please provide detailed address)`,
      }));
    } catch (error) {
      console.error("Failed to get address:", error);
      // Fallback to a generic address based on coordinates
      setFormData((prev) => ({
        ...prev,
        address: `Location: ${lat.toFixed(6)}, ${lng.toFixed(
          6
        )} (Please provide detailed address)`,
      }));
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(\+254|254|0)[17]\d{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Kenyan phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setDeliveryInfo(formData);
      onContinue();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRetryLocation = () => {
    // Force a new geolocation request by incrementing the key
    setLocationRetryKey((prev) => prev + 1);
    // Reload the page to trigger a fresh geolocation request
    window.location.reload();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Information */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              Delivery Information
            </CardTitle>
            <CardDescription>
              Estimated delivery time: 30-45 minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter your full delivery address including building name, floor, and any landmarks"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full ${errors.address ? "border-red-500" : ""}`}
                rows={3}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0712345678 or +254712345678"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
              <p className="text-xs text-muted-foreground">
                We&apos;ll call you when we arrive
              </p>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="instructions">
                Delivery Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                placeholder="Any special instructions for the delivery driver (e.g., gate code, parking instructions, etc.)"
                value={formData.instructions}
                onChange={(e) =>
                  handleInputChange("instructions", e.target.value)
                }
                className="w-full"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Policy */}
        <Card className="w-full bg-amber-50 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-amber-900">
              Delivery Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Delivery fee: Ksh 200</li>
              <li>• Estimated time: 30-45 minutes</li>
              <li>• We&apos;ll call you when we&apos;re nearby</li>
              <li>• Please have exact change ready if paying cash</li>
            </ul>
          </CardContent>
        </Card>

        <div className="pb-12 lg:pb-0">
          <Button type="submit" className="w-full" size="lg">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
