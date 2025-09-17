import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Phone, X } from "lucide-react";
import { site } from "@/config/site-config"; // import site config
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export function ContactButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          aria-label="Contact us"
          className="group bg-green-500 hover:bg-green-600 fixed bottom-4 right-4 z-50 rounded-full size-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {/* Phone Icon (shows when popover is closed) */}
          <Phone className="h-7 w-7 data-[state=open]:hidden group-data-[state=open]:hidden" />

          {/* X Icon (shows when popover is open) */}
          <X className="h-7 w-7 hidden data-[state=open]:block group-data-[state=open]:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-64 p-4 space-y-2 rounded-lg shadow-lg bg-background border border-foreground/40"
      >
        <Button
          className="w-full h-12 flex items-center justify-start gap-3 text-base bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 hover:bg-green-600"
          asChild
        >
          <Link
            href={`${site.contact.whatsapp_url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaWhatsapp className="size-5" />
            WhatsApp Chat
          </Link>
        </Button>
        <Button
          className="bg-indigo-500 dark:bg-indigo-900 dark:hover:bg-indigo-800 hover:bg-indigo-700 w-full h-12 flex items-center justify-start gap-3 text-base"
          asChild
        >
          <Link
            href={`${site.contact.call_url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Phone className="size-5" />
            Call Us
          </Link>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
