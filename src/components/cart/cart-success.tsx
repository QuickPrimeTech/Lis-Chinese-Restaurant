"use client";

import Image from "next/image";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CartSuccessProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  total: number;
  onClose: () => void;
}

export function CartSuccess({ items, total, onClose }: CartSuccessProps) {
  return (
    <ScrollArea className="flex flex-col h-[calc(100vh-72px)] items-center text-center space-y-6 px-6 py-10">
      {/* Icon */}
      <CheckCircle className="mx-auto mb-8 size-16 text-green-500" />
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Order Confirmed 🎉
        </h2>
        <p className="text-muted-foreground">
          You&apos;ll receive a WhatsApp notification with your order details.
        </p>
      </div>

      {/* Order Summary */}
      <Card className="mb-8 w-full bg-card/60 border-border/40 shadow-lg rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h4 className="text-lg font-semibold text-foreground">
            Pickup Details
          </h4>

          <ScrollArea className="space-y-3 h-50 pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 bg-background/50 rounded-lg border border-border/40"
              >
                {item.image && (
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      fill
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × Ksh {item.price}
                  </p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>

          <Separator />

          <div className="flex justify-between text-base font-semibold text-primary">
            <span>Total</span>
            <span>Ksh {total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action */}
      <Button
        onClick={onClose}
        size="lg"
        className="w-full rounded-xl shadow-md"
      >
        Done
        <CheckCircle2 className="size-6 ml-2" />
      </Button>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
