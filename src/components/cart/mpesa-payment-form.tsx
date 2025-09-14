"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, Shield, Loader2, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface MpesaPaymentFormProps {
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number is too short")
    .transform((val) => {
      const cleaned = val.replace(/\D/g, "");
      if (cleaned.startsWith("254")) return cleaned.slice(0, 12);
      if (cleaned.startsWith("0")) return "254" + cleaned.slice(1, 10);
      if (cleaned.startsWith("7") || cleaned.startsWith("1"))
        return "254" + cleaned.slice(0, 9);
      return cleaned.slice(0, 12);
    })
    .refine((val) => val.length === 12, "Enter a valid 12-digit M-Pesa number"),
});

const pinSchema = z.object({
  pin: z.string().regex(/^\d{4}$/, "PIN must be 4 digits"),
});

export function MpesaPaymentForm({
  total,
  onSuccess,
  onBack,
}: MpesaPaymentFormProps) {
  const [step, setStep] = useState<"phone" | "pin" | "processing">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const pinForm = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
    defaultValues: {
      pin: "",
    },
  });

  const formatDisplayPhone = (phone: string) => {
    return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
      6,
      9
    )} ${phone.slice(9)}`;
  };

  const handlePhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    setFormattedPhone(data.phoneNumber);
    setStep("pin");
  };

  const handlePinSubmit = async () => {
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    onSuccess();
  };

  if (step === "processing") {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="h-8 w-8 text-green-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa prompt and enter your PIN to
            complete the payment.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Payment Request Sent</span>
            </div>
            <p className="text-xs text-green-700">
              Amount: Ksh {total.toFixed(2)} to{" "}
              {formatDisplayPhone(formattedPhone)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-green-600" />
          <span className="text-sm text-gray-600">
            Waiting for confirmation...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 text-green-800 mb-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">M-Pesa Secure Payment</span>
        </div>
        <p className="text-xs text-green-700">
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

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  Ksh {total.toFixed(2)}
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
                Continue
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === "pin" && (
        <Form {...pinForm}>
          <form
            onSubmit={pinForm.handleSubmit(handlePinSubmit)}
            className="space-y-4"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Payment Details
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  Amount:{" "}
                  <span className="font-semibold">Ksh {total.toFixed(2)}</span>
                </p>
                <p>
                  To:{" "}
                  <span className="font-semibold">
                    {formatDisplayPhone(formattedPhone)}
                  </span>
                </p>
                <p>
                  Merchant:{" "}
                  <span className="font-semibold">Restaurant App</span>
                </p>
              </div>
            </div>

            <FormField
              control={pinForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>M-Pesa PIN</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your 4-digit PIN"
                      maxLength={4}
                      {...field}
                      onChange={(e) => {
                        const cleaned = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        field.onChange(cleaned);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your M-Pesa PIN to authorize the payment
                  </p>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4 pb-12 lg:pb-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("phone")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                Pay Ksh {total.toFixed(2)}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
