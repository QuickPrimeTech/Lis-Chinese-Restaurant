// @/layouts/site-header.tsx
"use client";

import { usePathname } from "next/navigation";
import { announcements } from "@/data/announcements";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/layouts/navbar";
import { createContext, ReactNode, useContext, useState } from "react";

type SiteHeaderContextType = {
  hasAnnouncement: boolean;
  announcementOpen: boolean;
  setAnnouncementOpen: (open: boolean) => void;
};

const SiteHeaderContext = createContext<SiteHeaderContextType | undefined>(
  undefined
);

export function useSiteHeader() {
  const context = useContext(SiteHeaderContext);
  if (!context) {
    throw new Error(
      "Navbar or announcement bar must be used inside SiteHeader"
    );
  }
  return context;
}

type SiteHeaderProps = {
  children?: ReactNode;
};

export function SiteHeader({ children }: SiteHeaderProps) {
  const pathname = usePathname();
  const pageAnnouncements = announcements[pathname] ?? [];
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  const hasAnnouncement = pageAnnouncements.length > 0;

  return (
    <SiteHeaderContext.Provider
      value={{ hasAnnouncement, announcementOpen, setAnnouncementOpen }}
    >
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
        <Navbar
          className={hasAnnouncement && announcementOpen ? "top-10" : ""}
        />
      </header>
      {children}
    </SiteHeaderContext.Provider>
  );
}
