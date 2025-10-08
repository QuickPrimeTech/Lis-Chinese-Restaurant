// @/components/cart/mpesa-payment-step.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

import { MpesaPaymentForm } from "./mpesa-steps/mpesa-payment-form";
import { MpesaProcessingStep } from "./mpesa-steps/mpesa-processing-step";
import { MpesaErrorStep } from "./mpesa-steps/mpesa-error-step";
import { useCart } from "@/contexts/cart-provider";
import { useOrder } from "@/contexts/order-context";
import { formatDate, formatTime } from "@/utils/format-date";

interface MpesaPaymentStepProps {
  onSuccess: () => void;
  onBack: () => void;
  onProcessingChange?: (processing: boolean) => void;
}

export function MpesaPaymentStep({
  onSuccess,
  onBack,
  onProcessingChange,
}: MpesaPaymentStepProps) {
  const { items } = useCart();
  const { pickupInfo } = useOrder();

  const [step, setStep] = useState<"phone" | "processing" | "error">("phone");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Notify parent when processing
  useEffect(() => {
    onProcessingChange?.(step === "processing");
  }, [step, onProcessingChange]);

  // 🔁 Function to check status + subscribe
  const checkStatusAndSubscribe = useCallback(async () => {
    if (!uniqueId) return;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    try {
      const { error: authError } = await supabase.auth.signInAnonymously({
        options: { data: { id: uniqueId } },
      });

      if (authError) {
        console.error("Supabase auth error:", authError);
        toast.error("Failed to authenticate Supabase session.");
        return;
      }

      // 🧭 Check current payment status
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
        return;
      }

      if (status === "failed") {
        toast.error("Payment failed", {
          description:
            "This could be due to wrong PIN, cancellation, or insufficient balance.",
        });
        setUniqueId(null);
        setStep("error");
        return;
      }

      // 🪄 Subscribe to realtime updates
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
                  "This could be due to wrong PIN, cancellation, or insufficient balance.",
              });
              setUniqueId(null);
              setStep("error");
            }
          }
        )
        .subscribe();

      console.log("🔌 Subscribed to payment updates:", uniqueId);
    } catch (err) {
      console.error("Error checking payment status:", err);
      toast.error("Failed to connect to payment updates");
    }

    // 🧹 Cleanup on unmount
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [uniqueId, onSuccess]);

  // 👂 Detect online/offline and reconnect automatically
  useEffect(() => {
    if (!uniqueId) return;

    let loadingToastId: string | number | undefined;

    const handleOffline = () => {
      toast.warning("You’re offline", {
        description: "We’ll reconnect when your internet is back...",
      });
      loadingToastId = toast.loading("Reconnect to the internet...");
    };

    const handleOnline = () => {
      // Dismiss the reconnecting loader if it's showing
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        loadingToastId = undefined;
      }
      toast.success("Back online", {
        description: "Reconnecting to payment updates...",
      });
      checkStatusAndSubscribe();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [uniqueId, checkStatusAndSubscribe]);

  // Subscribe when uniqueId changes
  useEffect(() => {
    if (uniqueId) {
      checkStatusAndSubscribe();
    }
  }, [uniqueId, checkStatusAndSubscribe]);

  // 📲 Handle payment request
  const requestPayment = async (phoneNumber: string) => {
    setStep("processing");
    try {
      setFormattedPhone(phoneNumber);

      const orderItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
      }));

      const payload = {
        items,
        orderId,
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
        items: orderItems,
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

      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.error || error.response?.data?.message;

        if (
          serverMessage &&
          serverMessage.includes("Request failed with status code 403")
        ) {
          toast.error("Too Many Requests", {
            description: "Please wait a moment before trying again.",
          });
        }
      } else {
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
          setFormattedPhone("");
          setUniqueId(null);
          setStep("phone");
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
