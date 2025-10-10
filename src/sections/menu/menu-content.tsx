"use client";

import StickyCategoryNav from "@/sections/menu/sticky-category-nav";
import MenuSections from "@/sections/menu/menu-sections";
import type { Item } from "@/types/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { File } from "lucide-react";
import { useState, useMemo } from "react";
import { EmptyState } from "./empty-state";

interface MenuContentProps {
  menuItems: Record<string, Item[]>;
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filter menu items based only on searchTerm
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return menuItems;

    const lower = searchTerm.toLowerCase();
    const result: Record<string, Item[]> = {};

    for (const [category, items] of Object.entries(menuItems)) {
      const matches = items.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.description?.toLowerCase().includes(lower)
      );

      if (matches.length > 0) result[category] = matches;
    }

    return result;
  }, [menuItems, searchTerm]);

  return (
    <>
      {/* 🔍 Sticky Nav now only handles search, no category filtering */}
      <StickyCategoryNav
        menuItems={filteredItems}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center mt-8 px-2">
          <Button className="border-primary whitespace-nowrap" asChild>
            <Link href="/menu/pdf-menus">
              <File />
              View PDF Menu
            </Link>
          </Button>
        </div>

        {/* 🍽 Show filtered results or empty state */}
        {Object.keys(filteredItems).length > 0 ? (
          <MenuSections menuItems={filteredItems} />
        ) : (
          <EmptyState
            className="mt-8"
            searchTerm={searchTerm}
            onClearSearch={() => setSearchTerm("")}
          />
        )}
      </div>
    </>
  );
}
