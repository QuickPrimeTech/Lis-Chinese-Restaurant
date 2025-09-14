// @/app/menu/page.tsx

import MenuContent from "@/sections/menu/menu-content"; // new client wrapper for tabs/cart
import { menuItems } from "@/data/menu-data";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <MenuContent menuItems={menuItems} />
    </div>
  );
}
