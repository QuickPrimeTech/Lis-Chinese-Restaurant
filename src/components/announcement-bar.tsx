"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnnouncementBar({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-primary/70 text-white py-2 px-4 relative z-40">
      <div
        ref={containerRef}
        className="container mx-auto flex items-center justify-between overflow-hidden group"
      >
        {/* Marquee wrapper */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={contentRef}
            className={cn(
              "flex items-center space-x-2 text-sm font-medium whitespace-nowrap",
              isOverflowing &&
                "w-max animate-[marquee_15s_linear_infinite] group-hover:[animation-play-state:paused]"
            )}
          >
            {children}
            {isOverflowing && (
              <>
                <span className="mx-8">•</span>
                {children}
              </>
            )}
          </div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 text-white hover:bg-white/20 flex-shrink-0 ml-2"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Tailwind arbitrary keyframes */}
      <div className="hidden">
        <div className="animate-[marquee_15s_linear_infinite]" />
      </div>
    </div>
  );
}
