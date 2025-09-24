export function formatCurrency(amount: number, withDecimals = true): string {
  return amount.toLocaleString("en-KE", {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  });
}
