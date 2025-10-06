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
import { CircleAlert } from "lucide-react";

interface MpesaPaymentStepProps {
  onSuccess: () => void;
  onBack: () => void;
  onProcessingChange?: (processing: boolean) => void; // 🧠 new prop
}

export function MpesaPaymentStep({
  onSuccess,
  onProcessingChange,
  onBack,
}: MpesaPaymentStepProps) {
  // Taking values from the isContext
  const { items } = useCart();

  const [step, setStep] = useState<"phone" | "processing" | "error">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [publicId, setPublicId] = useState<string | null>(null);

  // Notify parent whenever processing state changes
  useEffect(() => {
    onProcessingChange?.(step === "processing");
  }, [step, onProcessingChange]);

  // 🔔 Subscribe to payment status
  // ✅ Check initial payment status before subscribing
  useEffect(() => {
    if (!publicId) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;
    async function checkStatusAndSubscribe() {
      try {
        // 🔍 Check current payment status first
        const { data, error } = await supabase
          .from("payments")
          .select("status")
          .eq("public_id", publicId)
          .maybeSingle();

        if (error) throw error;

        const status = data?.status as "pending" | "success" | "failed" | null;
        if (status === "success") {
          toast.success("Payment successful 🎉");
          setPublicId(null);
          setStep("phone");
          onSuccess();
          return; // ✅ No need to subscribe
        }

        if (status === "failed") {
          toast.error("Payment failed", {
            description:
              "This could be due to wrong pin or cancellation of the transaction or insufficient balance",
            icon: <CircleAlert />,
          });
          setPublicId(null);
          setStep("error");
          return; // ✅ No need to subscribe
        }

        // 🧩 If still pending → subscribe for changes
        channel = supabase
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
                toast.error("Payment failed", {
                  description:
                    "This could be due to wrong pin or cancellation of the transaction or insufficient balance",
                  icon: <CircleAlert />,
                });
                setPublicId(null);
                setStep("error");
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.error("Error checking initial payment status:", err);
      }
    }

    checkStatusAndSubscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [publicId, onSuccess]);

  // 📲 Payment request handler
  const requestPayment = async (phoneNumber: string) => {
    try {
      setStep("processing");
      setFormattedPhone(phoneNumber);

      // Extract only what’s needed
      const orderItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      }));

      const response = await axios.post("/api/payments/mpesa", {
        phoneNumber,
        items: orderItems, // send this instead of amount
      });

      if (response.status === 200 && response.data?.public_id) {
        setPublicId(response.data.public_id);
        toast.success(
          "Payment request sent. Please check your phone to complete the transaction."
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // ✅ Safe handling with proper typing
        toast.error(
          error.response?.data?.message || "Payment failed. Try again.",
          {
            description: "Please check your internet connection.",
          }
        );
      } else {
        toast.error("Unexpected error. Please try again.");
      }
      console.error("Payment error:", error);
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
