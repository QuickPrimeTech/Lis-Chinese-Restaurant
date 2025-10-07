import { Metadata } from "next";
import { MenuCardGrid } from "@/components/pdf-menu/menu-card-grid";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Utensils } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "View PDF Menus",
  description:
    "Don't like online menus? We've got you. You can go through our PDF menus and not have to worry about navigating our online menus.",
};

export default function PDFMenus() {
  return (
    <div className="min-h-screen mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Main Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Our Menus
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of exquisite dishes and
            handcrafted beverages
          </p>
        </div>

        {/* Menu Cards Grid */}
        <MenuCardGrid />
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-in">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href={"/menu"}>
              <ArrowLeft className="size-5" />
              Back to Menu
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href={"/menu"}>
              <Utensils className="size-5" />
              Start Ordering
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
