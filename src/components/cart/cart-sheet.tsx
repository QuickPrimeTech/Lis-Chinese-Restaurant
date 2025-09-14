"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { CartItem } from "./cart-item";
import { CardPaymentForm } from "./card-payment-form";
import { MpesaPaymentForm } from "./mpesa-payment-form";
import { PickupForm } from "./pickup-form";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartSuccess } from "./cart-success";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "cart" | "details" | "payment" | "success";

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, total, itemCount, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const finalTotal = total;

  const handleBackToCart = () => setCurrentStep("cart");
  const handleBackToDetails = () => setCurrentStep("details");
  const handleProceedToDetails = () => setCurrentStep("details");
  const handleProceedToPayment = () => setCurrentStep("payment");

  const handlePaymentSuccess = () => {
    clearCart();
    setCurrentStep("success");
  };

  const handleExitSuccess = () => {
    onOpenChange(false);
    setCurrentStep("cart");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const renderOrderSummary = () => (
    <div className="bg-card rounded-xl p-4 space-y-3 shadow-luxury">
      <h4 className="font-semibold text-foreground">Order Summary</h4>

      <ScrollArea className="h-40 pr-2">
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 bg-background rounded-lg border border-border"
            >
              <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                <Image
                  fill
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity}x Ksh {item.price}
                </p>
              </div>

              <p className="text-sm font-semibold whitespace-nowrap">
                Ksh {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items):</span>
          <span>Ksh {total.toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold text-base text-primary">
          <span>Total:</span>
          <span>Ksh {finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

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

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>Ksh {total.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg text-primary">
                          <span>Total:</span>
                          <span>Ksh {finalTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
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
                          Continue to Pickup
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Details Step */}
                {currentStep === "details" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    {renderOrderSummary()}
                    <PickupForm onContinue={handleProceedToPayment} />
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll p-6 space-y-6">
                    {renderOrderSummary()}
                    <div>
                      <h4 className="font-semibold mb-4">
                        Choose Payment Method
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={
                            paymentMethod === "card" ? "default" : "outline"
                          }
                          onClick={() => setPaymentMethod("card")}
                          className="flex items-center gap-2"
                        >
                          <CreditCard className="h-4 w-4" />
                          Card
                        </Button>
                        <Button
                          variant={
                            paymentMethod === "mpesa" ? "default" : "outline"
                          }
                          onClick={() => setPaymentMethod("mpesa")}
                          className="flex items-center gap-2"
                        >
                          <Smartphone className="h-4 w-4" />
                          M-Pesa
                        </Button>
                      </div>

                      <div className="mt-4">
                        {paymentMethod === "card" ? (
                          <CardPaymentForm
                            total={finalTotal}
                            onSuccess={handlePaymentSuccess}
                            onBack={handleBackToDetails}
                          />
                        ) : (
                          <MpesaPaymentForm
                            total={finalTotal}
                            onSuccess={handlePaymentSuccess}
                            onBack={handleBackToDetails}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Step */}
                {currentStep === "success" && (
                  <CartSuccess
                    items={items}
                    total={finalTotal}
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
