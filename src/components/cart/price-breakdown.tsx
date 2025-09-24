import { useCart } from "@/contexts/cart-provider";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/lib/utils";

type PriceBreakdownProps = {
  className?: string;
};

export const PriceBreakdown = ({ className }: PriceBreakdownProps) => {
  const { itemCount, finalTotal, total, vatAmount, levyAmount } = useCart();
  return (
    <div className="space-y-1 text-sm mb-2">
      <div className="flex justify-between">
        <span>Subtotal ({itemCount} items):</span>
        <span>Ksh {formatCurrency(total)}</span>
      </div>
      <div className="flex justify-between">
        <span>VAT (16%):</span>
        <span>Ksh {formatCurrency(vatAmount)}</span>
      </div>
      <div className="flex justify-between">
        <span>Catering Levy (2%):</span>
        <span>Ksh {formatCurrency(levyAmount)}</span>
      </div>
      <Separator className="my-2" />
      <div
        className={cn(
          "flex justify-between font-semibold text-base text-primary",
          className
        )}
      >
        <span>Total:</span>
        <span>Ksh {formatCurrency(finalTotal)}</span>
      </div>
    </div>
  );
};
