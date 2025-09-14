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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Truck,
  MapPin,
} from "lucide-react";
import { useCart } from "@/contexts/cart-provider";
import { useOrder } from "@/contexts/order-context";
import { CartItem } from "./cart-item";
import { CardPaymentForm } from "./card-payment-form";
import { MpesaPaymentForm } from "./mpesa-payment-form";
import { OrderTypeSelector } from "./order-type-selector";
import { DeliveryForm } from "./delivery-form";
import { PickupForm } from "./pickup-form";
import Image from "next/image";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "cart" | "details" | "payment" | "processing" | "success";

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, total, itemCount, clearCart } = useCart();
  const { orderType, deliveryFee } = useOrder();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa">("card");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const finalTotal = total + deliveryFee;

  const handleBackToCart = () => {
    setCurrentStep("cart");
  };

  const handleBackToDetails = () => {
    setCurrentStep("details");
  };

  const handleProceedToDetails = () => {
    setCurrentStep("details");
  };

  const handleProceedToPayment = () => {
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = () => {
    setCurrentStep("success");
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      onOpenChange(false);
      setCurrentStep("cart");
    }, 3000);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const renderOrderSummary = () => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h4 className="font-semibold text-gray-900">Order Summary</h4>

      {/* Items List */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 bg-white rounded-md"
          >
            <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <Image
                fill
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
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

      <Separator />

      {/* Totals */}
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items):</span>
          <span>Ksh {total.toFixed(2)}</span>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between">
            <span>Delivery fee:</span>
            <span>Ksh {deliveryFee.toFixed(2)}</span>
          </div>
        )}
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold text-base">
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
        return orderType === "delivery" ? "Delivery Details" : "Pickup Details";
      case "payment":
        return "Payment";
      default:
        return "Checkout";
    }
  };

  if (currentStep === "success") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Your order has been confirmed and will be{" "}
                {orderType === "delivery" ? "delivered" : "ready for pickup"}{" "}
                soon.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <p className="text-sm text-gray-600 mb-2">
                  Order Total:{" "}
                  <span className="font-semibold">
                    Ksh {finalTotal.toFixed(2)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Items:{" "}
                  <span className="font-semibold">{itemCount} items</span>
                </p>
                <p className="text-sm text-gray-600">
                  Type:{" "}
                  <span className="font-semibold capitalize">{orderType}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              This window will close automatically...
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg p-0 gap-0 flex flex-col h-screen max-h-screen">
          {/* Sheet Header */}
          <SheetHeader className="flex-shrink-0 p-6 border-b bg-white">
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
              {currentStep === "details" &&
                (orderType === "delivery" ? (
                  <Truck className="h-5 w-5" />
                ) : (
                  <MapPin className="h-5 w-5" />
                ))}
              {currentStep === "payment" && <CreditCard className="h-5 w-5" />}
              {getStepTitle()}
            </SheetTitle>
          </SheetHeader>

          {/* Sheet Body */}
          <div className="flex flex-col flex-1 min-h-0">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add some delicious items to get started!
                </p>
                <Button onClick={() => onOpenChange(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Step */}
                {currentStep === "cart" && (
                  <>
                    <div className="flex-shrink-0 pb-3">
                      <OrderTypeSelector />
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4 space-y-4 custom-scroll">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>

                    <div className="flex-shrink-0 border-t p-6 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowClearConfirm(true)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
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
                        {deliveryFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Delivery:</span>
                            <span>Ksh {deliveryFee.toFixed(2)}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <span>Ksh {finalTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="w-full bg-white border-t pb-12 lg:pb-0 pt-3 z-50">
                        {/* Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => onOpenChange(false)}
                          >
                            Continue Shopping
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={handleProceedToDetails}
                          >
                            Continue to{" "}
                            {orderType === "delivery" ? "Delivery" : "Pickup"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Details Step */}
                {currentStep === "details" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">
                    <div className="p-6 space-y-6">
                      {renderOrderSummary()}
                      {orderType === "delivery" ? (
                        <DeliveryForm onContinue={handleProceedToPayment} />
                      ) : (
                        <PickupForm onContinue={handleProceedToPayment} />
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {currentStep === "payment" && (
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scroll">
                    <div className="p-6 space-y-6">
                      {renderOrderSummary()}

                      <div>
                        <h4 className="font-semibold mb-4 text-gray-900">
                          Choose Payment Method
                        </h4>

                        <Tabs
                          value={paymentMethod}
                          onValueChange={(value) =>
                            setPaymentMethod(value as "card" | "mpesa")
                          }
                        >
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                              value="card"
                              className="flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              Card
                            </TabsTrigger>
                            <TabsTrigger
                              value="mpesa"
                              className="flex items-center gap-2"
                            >
                              <Smartphone className="h-4 w-4" />
                              M-Pesa
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="card" className="mt-4">
                            <CardPaymentForm
                              total={finalTotal}
                              onSuccess={handlePaymentSuccess}
                              onBack={handleBackToDetails}
                            />
                          </TabsContent>

                          <TabsContent value="mpesa" className="mt-4">
                            <MpesaPaymentForm
                              total={finalTotal}
                              onSuccess={handlePaymentSuccess}
                              onBack={handleBackToDetails}
                            />
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {/* Clear Cart Confirmation Dialog */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
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
              className="bg-red-600 hover:bg-red-700"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
