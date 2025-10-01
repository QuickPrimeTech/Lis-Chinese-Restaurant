// @/app/menu/page.tsx
import MenuContent from "@/sections/menu/menu-content";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase/server";
import { Item } from "@/types/menu";

export const metadata: Metadata = {
  title: "Menu | Li's Chinese Restaurant Nairobi",
  description:
    "Discover our full menu with authentic Chinese dishes. From mouth-watering starters to flavourful mains and sweet desserts, enjoy the best Chinese dining in Nairobi.",
};

export const dynamic = "force-static";
export const revalidate = false;

export default async function MenuPage() {
  const USER_ID = process.env.USER_ID; // ✅ load from env

  const { data, error } = await supabase
    .from("menu_items")
    .select(
      "id, name, description, price, category, image_url, user_id, is_available"
    )
    .eq("user_id", USER_ID) // ✅ filter by user
    .eq("is_available", true); // ✅ only available items

  if (error) {
    console.error("Error fetching menu items:", error.message);
    return <div>Failed to load menu.</div>;
  }

  const items: Item[] =
    data?.map((item) => ({
      id: String(item.id),
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image_url || undefined,
    })) ?? [];

  // Group items by category
  const groupedByCategory = items.reduce<Record<string, Item[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-background">
      <MenuContent menuItems={groupedByCategory} />
    </div>
  );
}
