"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

interface CountdownProps {
  endDate: Date;
  startDate?: Date;
  className?: string;
  compactPreview?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TIME_PARTS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function AnimatedNumberCountdown({
  endDate,
  startDate,
  className,
  compactPreview = false,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - start.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  // Compact inline preview
  if (compactPreview) {
    return (
      <div className="flex items-center justify-center gap-4">
        {TIME_PARTS.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col bg-primary/20 items-center px-3 py-2 rounded-md"
          >
            <NumberFlow
              value={timeLeft[key]}
              className="text-3xl sm:text-4xl font-bold text-foreground leading-none"
              format={{ minimumIntegerDigits: 2 }}
            />
            <span className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Full layout with responsive grid
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${className}`}>
      {/* Mobile Layout (< 640px) */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3">
          {TIME_PARTS.map(({ key, label }) => (
            <div
              key={key}
              className="flex flex-col items-center rounded-lg p-3 bg-card border border-border"
            >
              <NumberFlow
                value={timeLeft[key]}
                className="text-2xl font-semibold tracking-tighter text-primary"
                format={{ minimumIntegerDigits: 2 }}
              />
              <span className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet Layout (640px - 1024px) */}
      <div className="hidden sm:flex lg:hidden items-center justify-center gap-6">
        {TIME_PARTS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center">
            <NumberFlow
              value={timeLeft[key]}
              className="text-3xl font-semibold tracking-tighter text-foreground"
              format={{ minimumIntegerDigits: 2 }}
            />
            <span className="mt-1 text-sm uppercase tracking-wide text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:flex items-center justify-center gap-8">
        {TIME_PARTS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center">
            <NumberFlow
              value={timeLeft[key]}
              className="text-5xl font-semibold tracking-tighter text-primary"
              format={{ minimumIntegerDigits: 2 }}
            />
            <span className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnimatedNumberCountdownShowcase() {
  return (
    <div className="flex flex-col p-4 bg-background">
      <AnimatedNumberCountdown
        endDate={new Date("2025-10-09")}
        className="my-4"
        compactPreview={true}
      />
    </div>
  );
}
