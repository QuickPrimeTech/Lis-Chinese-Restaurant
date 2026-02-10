import { CartItem } from "@/contexts/cart-provider";

export type SupabaseOrder = {
  created_at: string;
  branch_id: string;
  name: string;
  phone: string;
  email: string;
  items: CartItem[];
  total: number;
  payment_method: string;
  pickup_date: string;
  pickup_time: string;
  special_instructions: string;
  status: "pending" | "success" | "failed";
  id: string;
};
