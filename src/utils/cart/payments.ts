import { SupabaseOrder } from "./../../types/cart/payments";
// @/lib/payments/getPrice.ts
import { supabase } from "@/lib/supabase/server";

export type Item = {
  id: string;
  name: string;
  quantity: number;
};
/**
 * Calculates total order amount (with 18% tax)
 * and rounds it up to the nearest shilling.
 */
export async function getTotalPrice(items: Item[]) {
  const ids = items.map((item) => Number(item.id));

  const { data: menuItems, error } = await supabase
    .from("menu_items")
    .select("id, price")
    .in("id", ids);

  if (error || !menuItems) {
    console.error("Error fetching menu prices:", error);
    throw new Error("Failed to fetch menu item prices");
  }

  const priceMap = new Map<number, number>();
  for (const m of menuItems) priceMap.set(m.id, Number(m.price));

  const totalAmount = Math.ceil(
    1.18 *
      items.reduce((sum, item) => {
        const price = priceMap.get(Number(item.id));
        return price ? sum + price * item.quantity : sum;
      }, 0)
  );

  // ✅ Just return plain data
  return { total: totalAmount };
}

export type OrderPayload = {
  items: Item[];
  customerName: string;
  email: string;
  total: number;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  orderId?: string;
  paymentMethod: string;
  specialInstructions?: string;
};

/**
 * Creates an order record in Supabase.
 * Assumes user authentication or a fixed user_id.
 */
export async function createOrder(payload: OrderPayload) {
  const {
    items,
    customerName,
    email,
    phone,
    pickupDate,
    pickupTime,
    paymentMethod,
    specialInstructions,
    total,
  } = payload;

  // ⚠️ Replace this with actual authenticated user id
  const user_id = process.env.USER_ID;

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id,
        name: customerName,
        phone,
        email,
        items,
        total,
        payment_method: paymentMethod,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        special_instructions: specialInstructions || "",
        status: "pending",
      },
    ])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error inserting order:", error);
    throw new Error("Failed to insert order: " + error.message);
  }

  return {
    message: "Order successfully inserted",
    data: data as SupabaseOrder,
  };
}
