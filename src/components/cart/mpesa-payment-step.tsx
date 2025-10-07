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
import { formatDate, formatTime } from "@/utils/format-date";
import { useOrder } from "@/contexts/order-context";

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
  const { pickupInfo } = useOrder();
  const [step, setStep] = useState<"phone" | "processing" | "error">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Notify parent whenever processing state changes
  useEffect(() => {
    onProcessingChange?.(step === "processing");
  }, [step, onProcessingChange]);

  // 🔔 Subscribe to payment status
  // ✅ Check initial payment status before subscribing
  useEffect(() => {
    if (!uniqueId) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;
    async function checkStatusAndSubscribe() {
      try {
        // Authenticate anonymously with public_id metadata
        const { error: authError } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              id: uniqueId, // use the one from state
            },
          },
        });

        if (authError) {
          console.error("Supabase auth error:", authError);
          toast.error("Failed to authenticate session.");
          return;
        }
        // 🔍 Check current payment status first
        const { data, error } = await supabase
          .from("payments")
          .select("status")
          .eq("id", uniqueId)
          .maybeSingle();
        if (error) throw error;

        const status = data?.status as "pending" | "success" | "failed" | null;
        if (status === "success") {
          toast.success("Payment successful 🎉");
          setUniqueId(null);
          setStep("phone");
          onSuccess();
          return; // ✅ No need to subscribe
        }

        if (status === "failed") {
          toast.error("Payment failed", {
            description:
              "This could be due to wrong pin or cancellation of the transaction or insufficient balance",
          });
          setUniqueId(null);
          setStep("error");
          return; // ✅ No need to subscribe
        }

        // 🧩 If still pending → subscribe for changes
        channel = supabase
          .channel(`payments-changes-${uniqueId}`)
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "payments",
              filter: `id=eq.${uniqueId}`,
            },
            (payload) => {
              const newStatus = payload.new.status as
                | "pending"
                | "success"
                | "failed";

              if (newStatus === "success") {
                toast.success("Payment successful 🎉");
                setUniqueId(null);
                setStep("phone");
                onSuccess();
              }

              if (newStatus === "failed") {
                toast.error("Payment failed", {
                  description:
                    "This could be due to wrong pin or cancellation of the transaction or insufficient balance",
                });
                setUniqueId(null);
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
  }, [uniqueId, onSuccess]);

  // 📲 Payment request handler
  const requestPayment = async (phoneNumber: string) => {
    setStep("processing");
    try {
      setFormattedPhone(phoneNumber);

      // Extract only what’s needed
      const orderItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      }));
      const payload = {
        items,
        orderId: orderId,
        customerName: pickupInfo?.fullName,
        email: pickupInfo?.email,
        phone: pickupInfo?.phone,
        pickupDate: pickupInfo?.pickupDate
          ? formatDate(pickupInfo.pickupDate)
          : undefined,
        pickupTime: pickupInfo?.pickupTime
          ? formatTime(pickupInfo.pickupTime)
          : undefined,
        paymentMethod: "M-Pesa",
        specialInstructions: pickupInfo?.instructions,
      };
      const response = await axios.post("/api/payments/mpesa", {
        phoneNumber,
        items: orderItems, // send this instead of amount
        payload,
      });
      if (response.status === 200 && response.data?.unique_id) {
        setUniqueId(response.data.unique_id);
        setOrderId(response.data.order_id);
        toast.success(
          "Payment request sent. Please check your phone to complete the transaction."
        );
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStep("error");

      // Axios error (network, 4xx, 5xx, etc.)
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.error || error.response?.data?.message;

        // 🧠 Handle known Safaricom or backend messages
        if (
          serverMessage &&
          serverMessage.includes("Request failed with status code 403")
        ) {
          toast.error("Too Many Requests", {
            description: "Please wait a moment before trying again.",
          });
        }
      } else {
        // Non-Axios or unexpected error
        toast.error("Unexpected error", {
          description: "Please try again in a moment.",
        });
      }
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
          setUniqueId(null); // reset publicId
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
