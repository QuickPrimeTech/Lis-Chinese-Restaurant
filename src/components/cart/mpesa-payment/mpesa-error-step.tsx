import { useCart } from "@/contexts/cart-provider";
import { formatDisplayPhone } from "@/utils/payments";
import { Smartphone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type MpesaErrorStepProps = {
  formattedPhone: string;
  //   onRetry: () => void;
};

export function MpesaErrorStep({
  formattedPhone,
}: //   onRetry,
MpesaErrorStepProps) {
  const { finalTotal } = useCart();

  return (
    <div className="text-center space-y-8 py-8">
      {/* Icon */}
      <div className="w-16 h-16 bg-red-50 dark:bg-red-950 rounded-full flex items-center justify-center mx-auto">
        <Smartphone className="h-8 w-8 text-red-700 dark:text-red-200" />
      </div>

      {/* Heading */}
      <div>
        <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
          Payment Failed
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
          The payment could not be completed. Please try again.
        </p>
      </div>

      {/* Payment Info Card */}
      <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-700 rounded-lg p-6 text-left space-y-4">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <XCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Payment Request Failed</span>
        </div>

        {/* Phone Row */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Phone Number
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatDisplayPhone(formattedPhone)}
          </p>
        </div>

        {/* Amount Row */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
            Ksh {finalTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Retry Button */}
      <div>
        <Button
          //   onClick={onRetry}
          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
        >
          Retry Payment
        </Button>
      </div>
    </div>
  );
}
