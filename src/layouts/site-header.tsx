// @/layouts/site-header.tsx
"use client";

import { usePathname } from "next/navigation";
import { announcements } from "@/data/announcements";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/layouts/navbar";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const pageAnnouncements = announcements[pathname] ?? [];
  const [announcementOpen, setAnnouncementOpen] = useState<boolean>(true);

  const hasAnnouncement = pageAnnouncements.length > 0;

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      {pageAnnouncements.map(
        (a, idx) =>
          announcementOpen && (
            <AnnouncementBar
              key={idx}
              onClose={() => setAnnouncementOpen(false)}
            >
              <a.icon className="h-4 w-4 flex-shrink-0" />
              <span>{a.message}</span>
            </AnnouncementBar>
          )
      )}
      <Navbar className={hasAnnouncement && announcementOpen ? "top-10" : ""} />
    </header>
  );
}
