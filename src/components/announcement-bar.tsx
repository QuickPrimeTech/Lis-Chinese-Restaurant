// @/components/announcement-bar.tsx
"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnnouncementBar({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/70 text-white py-2 px-4 relative z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm font-medium">
          {children}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 text-white hover:bg-white/20 flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
