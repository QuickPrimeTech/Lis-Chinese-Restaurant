"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

export interface PickupInfo {
  fullName: string;
  pickupDate: Date;
  pickupTime: Date;
  phone: string;
  email: string;
  instructions?: string;
}

interface OrderContextType {
  pickupInfo: PickupInfo | null;
  setPickupInfo: (info: PickupInfo) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [pickupInfo, setPickupInfo] = useState<PickupInfo | null>(null);

  return (
    <OrderContext.Provider
      value={{
        pickupInfo,
        setPickupInfo,
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
