import StickyCategoryNav from "@/sections/menu/sticky-category-nav";
import MenuSections from "@/sections/menu/menu-sections";
import type { Item } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MenuContentProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StickyCategoryNav />
        {/* Fixed Download Button (keeps its width, never pushed) */}
        <div className="flex justify-center mt-8 px-2">
          <Button
            variant="outline"
            className="border-primary whitespace-nowrap"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View PDF Menu
          </Button>
        </div>
        <MenuSections menuItems={menuItems} />
      </div>
    </>
  );
}
