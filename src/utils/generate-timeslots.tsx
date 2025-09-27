/**
 * Time slot generation utilities
 * This file handles the generation and filtering of available time slots
 */

import { addHours, addMinutes, isSameDay } from "date-fns";

export const RESTAURANT_CONFIG = {
  OPEN_HOUR: 11, // 11:00 AM opening time
  OPEN_MINUTE: 0,
  CLOSE_HOUR: 22, // 10:30 PM closing time (22:30 in 24h)
  CLOSE_MINUTE: 30,
  MINIMUM_ADVANCE_HOURS: 3, // Minimum 3 hours advance booking
  MAX_ADVANCE_DAYS: 7, // Maximum 7 days advance booking
  TIME_SLOT_INTERVAL_MINUTES: 30, // 30-minute intervals
  MAX_PARTY_SIZE: 12, // Maximum party size before requiring phone booking
};

/**
 * Generates available time slots for the selected date based on rules
 * - Today: skips slots within MINIMUM_ADVANCE_HOURS from now
 * - Future: returns all slots between OPEN and CLOSE times
 */
const slotCache: Record<string, string[]> = {};

export const filterAvailableTimeSlots = (selectedDate: Date): string[] => {
  const {
    OPEN_HOUR,
    OPEN_MINUTE,
    CLOSE_HOUR,
    CLOSE_MINUTE,
    TIME_SLOT_INTERVAL_MINUTES,
    MINIMUM_ADVANCE_HOURS,
  } = RESTAURANT_CONFIG;

  const now = new Date();
  const isToday = isSameDay(selectedDate, now);
  const cacheKey = isToday ? "today" : "future";

  if (slotCache[cacheKey]) {
    return slotCache[cacheKey];
  }

  const slots: string[] = [];

  // Start at opening time
  let currentSlot = new Date(selectedDate);
  currentSlot.setHours(OPEN_HOUR, OPEN_MINUTE, 0, 0);

  // End at closing time
  const endSlot = new Date(selectedDate);
  endSlot.setHours(CLOSE_HOUR, CLOSE_MINUTE, 0, 0);

  // For today, enforce minimum advance
  const minimumBookingTime = isToday
    ? addHours(now, MINIMUM_ADVANCE_HOURS)
    : null;

  while (currentSlot <= endSlot) {
    if (!isToday || currentSlot > minimumBookingTime!) {
      const timeString = currentSlot.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      slots.push(timeString);
    }
    currentSlot = addMinutes(currentSlot, TIME_SLOT_INTERVAL_MINUTES);
  }

  slotCache[cacheKey] = slots;
  return slots;
};

/**
 * Gets the count of available time slots for a specific date
 */
export const getAvailableSlotCount = (selectedDate: Date): number => {
  return filterAvailableTimeSlots(selectedDate).length;
};

/**
 * Formats the earliest available booking time for display
 */
export const getEarliestBookingTime = (): string => {
  const now = new Date();
  const earliestTime = addHours(now, RESTAURANT_CONFIG.MINIMUM_ADVANCE_HOURS);

  return earliestTime.toLocaleString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

/**
 * Gets the next available time slot for today
 */
export const getNextAvailableTimeSlot = (): string | null => {
  const today = new Date();
  const availableSlots = filterAvailableTimeSlots(today);
  return availableSlots.length > 0 ? availableSlots[0] : null;
};
