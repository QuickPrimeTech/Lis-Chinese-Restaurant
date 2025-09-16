// @/app/menu/page.tsx

import MenuContent from "@/sections/menu/menu-content"; // new client wrapper for tabs/cart
import { menuItems } from "@/data/menu-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Li's Chinese Restaurant Nairobi",
  description:
    "Discover our full menu with authentic Chinese dishes. From mouth-watering starters to flavourful mains and sweet desserts, enjoy the best Chinese dining in Nairobi.",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <MenuContent menuItems={menuItems} />
    </div>
  );
}
