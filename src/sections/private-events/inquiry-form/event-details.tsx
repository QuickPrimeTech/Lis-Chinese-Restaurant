// @/sections/private-events/inquiry-form/event-details.tsx

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventData {
  eventType: string;
  guests: string;
  budget: string;
}

interface EventDetailsStepProps {
  data: EventData;
  date: Date | undefined;
  onChange: (field: keyof EventData, value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  errors?: Partial<Record<keyof EventData, string>>;
}

const eventTypes = [
  "Corporate Meeting",
  "Business Dinner",
  "Product Launch",
  "Wedding Reception",
  "Anniversary Celebration",
  "Birthday Party",
  "Holiday Party",
  "Networking Event",
  "Team Building",
  "Retirement Party",
  "Other",
];

const guestCounts = ["8-12", "13-20", "21-30", "31-50", "51+"];

const budgetRanges = [
  "KSh 50,000 – KSh 150,000",
  "KSh 150,000 – KSh 300,000",
  "KSh 300,000 – KSh 600,000",
  "KSh 600,000+",
];

export const EventDetailsStep: React.FC<EventDetailsStepProps> = ({
  data,
  date,
  onChange,
  onDateChange,
  errors = {},
}) => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Event Details
        </h2>
        <p className="text-muted-foreground">Tell us about your event vision</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>
            Event Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.eventType}
            onValueChange={(value) => onChange("eventType", value)}
          >
            <SelectTrigger
              className={`${
                errors.eventType ? "border-destructive" : ""
              } w-full`}
            >
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.eventType && (
            <p className="text-sm text-destructive">{errors.eventType}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Preferred Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                disabled={(day) => day < new Date()}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>
            Number of Guests <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.guests}
            onValueChange={(value) => onChange("guests", value)}
          >
            <SelectTrigger
              className={`${errors.guests ? "border-destructive" : ""} w-full`}
            >
              <SelectValue placeholder="Select guest count" />
            </SelectTrigger>
            <SelectContent>
              {guestCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count} guests
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.guests && (
            <p className="text-sm text-destructive">{errors.guests}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Estimated Budget</Label>
          <Select
            value={data.budget}
            onValueChange={(value) => onChange("budget", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
