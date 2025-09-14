"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import React from "react";

type InquiryFormProps = {
  formData: Record<string, any>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  eventTypes: string[];
  guestCounts: string[];
  budgetRanges: string[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function InquiryForm({
  formData,
  handleInputChange,
  date,
  setDate,
  eventTypes,
  guestCounts,
  budgetRanges,
  onSubmit,
}: InquiryFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Contact fields ... */}
      {/* Use the same JSX from your original code but split into sections */}
      {/* The key difference: all value/onChange come from props */}
      {/* The submit button stays here */}
    </form>
  );
}
