"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Private Events", path: "/private-events" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent border-b border-primary/20"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-cinzel font-bold text-primary hover:text-primary-glow transition-colors"
          >
            <Image
              src="/logo.jpg"
              alt="Li's Chinese Restaurant Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span>Li&apos;s Chinese Restaurant</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-foreground hover:text-primary transition-colors font-chivo font-medium relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Link href="/reservations">Reservations</Link>
            </Button>
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="text-primary"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/10 backdrop-blur-xl border-r border-border/50 text-foreground">
                <SheetHeader className="flex flex-row items-center space-x-3 pb-6 border-b border-border">
                  <Image
                    src="/logo.jpg"
                    alt="Li's Chinese Restaurant Logo"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <SheetTitle className="text-xl font-cinzel font-bold text-primary">
                    Li&apos;s Chinese Restaurant
                  </SheetTitle>
                </SheetHeader>

                <div className="flex px-6 flex-col mt-6 space-y-5">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className="text-lg font-chivo font-medium hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300 mt-6"
                  >
                    <Link href="/reservations">Reservations</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
