"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CreditCard, Loader2, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CardSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Please enter a valid card number (16 digits)")
    .regex(
      /^(\d{4} ){3}\d{4}$/,
      "Card number must be formatted as XXXX XXXX XXXX XXXX"
    ),
  expiryDate: z
    .string()
    .min(5, "Please enter a valid expiry date")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be 3–4 digits")
    .max(4)
    .regex(/^\d{3,4}$/, "CVV must be numeric"),
  cardholderName: z.string().min(1, "Please enter the cardholder name"),
});

type CardSchemaType = z.infer<typeof CardSchema>;

interface CardPaymentFormProps {
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function CardPaymentForm({
  total,
  onSuccess,
  onBack,
}: CardPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CardSchemaType>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const formatCardNumber = (value: string) =>
    value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .match(/\d{1,16}/g)?.[0]
      ?.replace(/(.{4})/g, "$1 ")
      .trim() ?? "";

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "Visa";
    if (number.startsWith("5") || number.startsWith("2")) return "Mastercard";
    if (number.startsWith("3")) return "Amex";
    return "Card";
  };

  const onSubmit = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Secure banner */}
        <div className="bg-blue-950 border border-blue-700 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-blue-50 mb-2">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Secure Payment</span>
          </div>
          <p className="text-xs text-blue-200">
            Your payment information is encrypted and secure
          </p>
        </div>

        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Card Number</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatCardNumber(e.target.value))
                    }
                  />
                </FormControl>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {getCardType(field.value)}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="MM/YY"
                    maxLength={5}
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatExpiryDate(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    maxLength={4}
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cardholder Name */}
        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total */}
        <div className="bg-card rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">
              Ksh {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 pb-12 lg:pb-0">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isProcessing}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Ksh {total.toFixed(2)}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
