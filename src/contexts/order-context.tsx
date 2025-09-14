"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export type OrderType = "delivery" | "pickup";

export interface DeliveryInfo {
  address: string;
  phone: string;
  instructions?: string;
}

export interface PickupInfo {
  scheduledTime: Date;
  phone: string;
  instructions?: string;
}

interface OrderContextType {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  pickupInfo: PickupInfo | null;
  setPickupInfo: (info: PickupInfo) => void;
  deliveryFee: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [pickupInfo, setPickupInfo] = useState<PickupInfo | null>(null);

  const deliveryFee = orderType === "delivery" ? 200 : 0;

  return (
    <OrderContext.Provider
      value={{
        orderType,
        setOrderType,
        deliveryInfo,
        setDeliveryInfo,
        pickupInfo,
        setPickupInfo,
        deliveryFee,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
