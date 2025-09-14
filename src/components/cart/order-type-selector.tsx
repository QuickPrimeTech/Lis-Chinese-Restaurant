"use client";

import { Button } from "@/components/ui/button";
import { Truck, MapPin } from "lucide-react";
import { useOrder } from "@/contexts/order-context";

export function OrderTypeSelector() {
  const { orderType, setOrderType } = useOrder();

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-lg ">
      <h4 className="font-semibold mb-3 text-gray-900">Order Type</h4>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={orderType === "delivery" ? "default" : "outline"}
          onClick={() => setOrderType("delivery")}
          className="flex flex-col items-center gap-2 h-auto py-4"
        >
          <Truck className="h-5 w-5" />
          <div className="text-center">
            <div className="font-medium">Delivery</div>
            <div className="text-xs opacity-75">Ksh 200 fee</div>
          </div>
        </Button>
        <Button
          variant={orderType === "pickup" ? "default" : "outline"}
          onClick={() => setOrderType("pickup")}
          className="flex flex-col items-center gap-2 h-auto py-4"
        >
          <MapPin className="h-5 w-5" />
          <div className="text-center">
            <div className="font-medium">Pickup</div>
            <div className="text-xs opacity-75">Free</div>
          </div>
        </Button>
      </div>
    </div>
  );
}
