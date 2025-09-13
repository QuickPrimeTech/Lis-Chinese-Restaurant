// @/app/menu/page.tsx

import MenuHero from "@/sections/menu/hero";
import MenuContent from "@/sections/menu/menu-content"; // new client wrapper for tabs/cart
import { menuItems } from "@/data/menu-data";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <MenuHero />
      <MenuContent menuItems={menuItems} />
    </div>
  );
}
