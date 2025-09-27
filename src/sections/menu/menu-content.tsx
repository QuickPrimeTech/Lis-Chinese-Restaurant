import StickyCategoryNav from "@/sections/menu/sticky-category-nav";
import MenuSections from "@/sections/menu/menu-sections";
import type { Item } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface MenuContentProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  return (
    <>
      <StickyCategoryNav />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Fixed Download Button (keeps its width, never pushed) */}
        <div className="flex justify-center mt-8 px-2">
          <Button className="border-primary whitespace-nowrap" asChild>
            <Link href={"/pdf-menus"}>
              View PDF Menu
              <ExternalLink />
            </Link>
          </Button>
        </div>
        <MenuSections menuItems={menuItems} />
      </div>
    </>
  );
}
