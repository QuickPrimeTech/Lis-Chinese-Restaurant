// @/components/cart/mpesa-payment-step.tsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

import { MpesaPaymentForm } from "./mpesa-steps/mpesa-payment-form";
import { MpesaProcessingStep } from "./mpesa-steps/mpesa-processing-step";
import { MpesaErrorStep } from "./mpesa-steps/mpesa-error-step";
import { useCart } from "@/contexts/cart-provider";

interface MpesaPaymentStepProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function MpesaPaymentStep({ onSuccess, onBack }: MpesaPaymentStepProps) {
  // Taking values from the isContext
  const { finalTotal } = useCart();

  const [step, setStep] = useState<"phone" | "processing" | "error">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [publicId, setPublicId] = useState<string | null>(null);

  // 🔔 Subscribe to payment status
  useEffect(() => {
    if (!publicId) return;

    const channel = supabase
      .channel(`payments-changes-${publicId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "payments",
          filter: `public_id=eq.${publicId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as
            | "pending"
            | "success"
            | "failed";

          if (newStatus === "success") {
            toast.success("Payment successful 🎉");
            setPublicId(null);
            setStep("phone");
            onSuccess();
          }

          if (newStatus === "failed") {
            toast.error("Payment failed ❌");
            setPublicId(null);
            setStep("error");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [publicId, onSuccess]);

  // 📲 Payment request handler
  const requestPayment = async (phoneNumber: string) => {
    try {
      setStep("processing");
      setFormattedPhone(phoneNumber);

      const response = await axios.post("/api/payments/mpesa", {
        phoneNumber,
        amount: finalTotal, // ⚡ still from useCart, can be passed down if needed
      });

      if (response.status === 200 && response.data?.public_id) {
        setPublicId(response.data.public_id);
        toast.success(
          "Payment request sent. Please check your phone to complete the transaction."
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message || "Payment failed. Try again."
      );
      setStep("error");
    }
  };

  // 🔄 Step rendering
  if (step === "processing") {
    return <MpesaProcessingStep formattedPhone={formattedPhone} />;
  }

  if (step === "error") {
    return (
      <MpesaErrorStep
        formattedPhone={formattedPhone}
        onRetry={() => requestPayment(formattedPhone)}
        onChangePhone={() => {
          setFormattedPhone(""); // clear the old phone
          setPublicId(null); // reset publicId
          setStep("phone"); // go back to phone input step
        }}
      />
    );
  }

  return (
    <MpesaPaymentForm
      onSubmit={(phoneNumber) => requestPayment(phoneNumber)}
      onBack={onBack}
    />
  );
}
