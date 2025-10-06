// @/utils/format-date.ts

/**
 * Formats a date string (ISO or Date) to a human-readable
 * date in Kenyan English locale (e.g. "6 October 2025").
 */
export function formatDate(date: string | Date): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats a time string (ISO or Date) to a human-readable
 * 12-hour time (e.g. "02:30 PM") in Kenyan English locale.
 */
export function formatTime(time: string | Date): string {
  if (!time) return "";
  const parsed = new Date(time);
  if (isNaN(parsed.getTime())) return "";
  return parsed.toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formats a full datetime (ISO or Date) to a combined readable
 * string (e.g. "6 October 2025, 02:30 PM").
 */
export function formatDateTime(dateTime: string | Date): string {
  if (!dateTime) return "";
  const parsed = new Date(dateTime);
  if (isNaN(parsed.getTime())) return "";
  return `${formatDate(parsed)}, ${formatTime(parsed)}`;
}
