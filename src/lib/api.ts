/**
 * Delay execution for a given number of milliseconds
 * @param ms - milliseconds to wait
 */
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
