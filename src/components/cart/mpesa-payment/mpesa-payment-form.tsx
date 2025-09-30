"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, Shield } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MpesaProcessingStep } from "./mpesa-processing-step";
import { phoneSchema, PhoneData } from "@/schemas/cart/mpesa-payment";
import { useCart } from "@/contexts/cart-provider";
import { MpesaErrorStep } from "./mpesa-error-step";

interface MpesaPaymentFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function MpesaPaymentForm({ onSuccess, onBack }: MpesaPaymentFormProps) {
  const [step, setStep] = useState<"phone" | "processing">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const { finalTotal } = useCart();

  const phoneForm = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const handlePhoneSubmit = async (data: z.infer<typeof phoneSchema>) => {
    setFormattedPhone(data.phoneNumber);
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 900000));
    onSuccess();
  };

  if (step === "processing") {
    return <MpesaErrorStep formattedPhone={formattedPhone} />;
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-green-900 dark:text-green-50 mb-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">M-Pesa Secure Payment</span>
        </div>
        <p className="text-xs text-green-700 dark:text-green-200">
          Pay securely using your M-Pesa mobile money account
        </p>
      </div>

      {step === "phone" && (
        <Form {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
            className="space-y-4"
          >
            <FormField
              control={phoneForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>M-Pesa Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="0712345678 or 254712345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the phone number registered with M-Pesa
                  </p>
                </FormItem>
              )}
            />

            <div className="bg-card rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  Ksh {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 pb-12 lg:pb-0">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Pay ksh {finalTotal.toFixed(2)}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
