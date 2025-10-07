"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Smartphone,
  ArrowLeft,
  AlertTriangle,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { CartItem } from "./cart-item";
import { CardPaymentForm } from "./card-payment-form";
import { PickupForm } from "./pickup-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartSuccess } from "./cart-success";
import { OrderSummary } from "./order-summary";
import { PriceBreakdown } from "./price-breakdown";
import { MpesaPaymentStep } from "./mpesa-payment-step";
import { useOrder } from "@/contexts/order-context";
import axios from "axios";
import { formatDate, formatTime } from "@/utils/format-date";
import { toast } from "sonner";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type LastOrder = {
  items: OrderItem[];
  total: number;
};

type CheckoutStep = "cart" | "details" | "payment" | "success";

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, finalTotal, itemCount, clearCart } = useCart();
  const { pickupInfo } = useOrder();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("mpesa");
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isMpesaProcessing, setIsMpesaProcessing] = useState(false);

  const handleBackToCart = () => setCurrentStep("cart");
  const handleBackToDetails = () => setCurrentStep("details");
  const handleProceedToDetails = () => setCurrentStep("details");
  const handleProceedToPayment = () => setCurrentStep("payment");

  const handlePaymentSuccess = async (
    orderId: string,
    paymentMethod: string
  ) => {
    const snapshot = {
      items: items.map((i) => ({ ...i })),
      total: finalTotal,
    };

    setCurrentStep("success");
    setLastOrder(snapshot);

    toast.loading("Sending email confirmation...");

    try {
      const res = await axios.post("/api/orders", {
        items,
        total: finalTotal,
        customerName: pickupInfo?.fullName,
        email: pickupInfo?.email,
        phone: pickupInfo?.phone,
        pickupDate: pickupInfo?.pickupDate
          ? formatDate(pickupInfo.pickupDate)
          : undefined,
        pickupTime: pickupInfo?.pickupTime
          ? formatTime(pickupInfo.pickupTime)
          : undefined,
        orderId,
        paymentMethod,
        specialInstructions: pickupInfo?.instructions,
      });

      if (res.status === 200) {
        toast.success("Email confirmation sent successfully! 🎉");
      } else {
        toast.error("Failed to send confirmation email.");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error("⚠️ Something went wrong while sending the email.");
    } finally {
      toast.dismiss();
    }
    clearCart();
  };

  const handleExitSuccess = () => {
    onOpenChange(false);
    setCurrentStep("cart");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (currentStep === "success" && !open) setCurrentStep("cart");

  const getStepTitle = () => {
    switch (currentStep) {
      case "cart":
        return `Your Cart (${itemCount} items)`;
      case "details":
        return "Pickup Details";
      case "payment":
        return "Payment";
      case "success":
        return "Order Confirmed";
      default:
        return "Checkout";
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg p-0 gap-0 flex flex-col h-screen max-h-screen bg-background text-foreground">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 p-6 border-b border-border bg-card shadow-luxury">
            <SheetTitle className="flex items-center gap-2">
              {(currentStep === "details" || currentStep === "payment") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={
                    currentStep === "details"
                      ? handleBackToCart
                      : handleBackToDetails
                  }
                  className="p-0 h-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {currentStep === "cart" && <ShoppingCart className="h-5 w-5" />}
              {currentStep === "details" && <MapPin className="h-5 w-5" />}
              {currentStep === "payment" && <CreditCard className="h-5 w-5" />}
              {currentStep === "success" && (
                <CheckCircle2 className="h-5 w-5" />
              )}
              {getStepTitle()}
            </SheetTitle>
          </SheetHeader>

          {/* Body */}
          <div className="flex flex-col flex-1 min-h-0">
            {items.length === 0 && currentStep !== "success" ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some delicious items to get started!
                </p>
                <Button
                  className="bg-gradient-primary hover:shadow-glow transition-all"
                  onClick={() => onOpenChange(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Step */}
                {currentStep === "cart" && (
                  <>
                    <ScrollArea className="flex-1 h-1/4 px-6 py-4">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex-shrink-0 border-t p-6 bg-card">
                      <div className="flex items-center justify-between mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowClearConfirm(true)}
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20 border-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Clear All
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {itemCount} items
                        </span>
                      </div>

                      <PriceBreakdown className="text-lg" />

                      <div className="flex gap-2 max-sm:pb-16 mt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => onOpenChange(false)}
                        >
                          Continue Shopping
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-primary hover:shadow-glow"
                          onClick={handleProceedToDetails}
                        >
                          Continue to Pickup <ArrowRight />
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Details Step */}
                {currentStep === "details" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    <OrderSummary />
                    <PickupForm onContinue={handleProceedToPayment} />
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    <OrderSummary />
                    <div>
                      <h4 className="font-semibold mb-4">
                        Choose Payment Method
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={
                            paymentMethod === "mpesa" ? "default" : "outline"
                          }
                          onClick={() => setPaymentMethod("mpesa")}
                          className="flex items-center gap-2"
                        >
                          <Smartphone />
                          M-Pesa
                        </Button>
                        <Button
                          variant={
                            paymentMethod === "card" ? "default" : "outline"
                          }
                          disabled={isMpesaProcessing}
                          onClick={() => setPaymentMethod("card")}
                          className="flex items-center gap-2"
                        >
                          <CreditCard />
                          Card
                        </Button>
                      </div>

                      <div className="mt-4">
                        {paymentMethod === "card" ? (
                          <CardPaymentForm
                            onSuccess={handlePaymentSuccess}
                            onBack={handleBackToDetails}
                          />
                        ) : (
                          <MpesaPaymentStep
                            onProcessingChange={setIsMpesaProcessing}
                            onSuccess={handlePaymentSuccess}
                            onBack={handleBackToDetails}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Step */}
                {currentStep === "success" && lastOrder && (
                  <CartSuccess
                    items={lastOrder.items}
                    total={lastOrder.total}
                    onClose={handleExitSuccess}
                  />
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Clear Cart Confirm */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent className="bg-card text-foreground border border-border shadow-luxury">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Clear Cart?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove all items from your cart? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearCart}
              className="bg-destructive hover:bg-destructive/90"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
