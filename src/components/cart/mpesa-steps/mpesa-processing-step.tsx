// @/components/cart/mpesa-steps/mpesa-processing-step.tsx

import { useCart } from "@/contexts/cart-provider";
import { formatCurrency } from "@/utils/format-currency";
import { formatDisplayPhone } from "@/utils/payments";
import { Smartphone, CheckCircle, Loader } from "lucide-react";

type MpesaProcessingStepProps = {
  formattedPhone: string;
};

export function MpesaProcessingStep({
  formattedPhone,
}: MpesaProcessingStepProps) {
  const { finalTotal } = useCart();

  return (
    <div className="text-center space-y-8 py-8">
      {/* Icon */}
      <div className="w-16 h-16 bg-green-50 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto">
        <Smartphone className="h-8 w-8 text-green-900 dark:text-green-50 animate-pulse" />
      </div>

      {/* Heading */}
      <div>
        <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
          Please check your phone for the M-Pesa prompt and enter your PIN to
          complete the payment.
        </p>
      </div>

      {/* Payment Info Card */}
      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-700 rounded-lg p-6 text-left space-y-4">
        <div className="flex items-center gap-2 text-green-900 dark:text-green-50">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Payment Request Sent</span>
        </div>

        {/* Phone Row */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Phone Number
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatDisplayPhone(formattedPhone)}
          </p>
        </div>

        {/* Amount Row */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Amount</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-200">
            Ksh {formatCurrency(finalTotal)}
          </p>
        </div>
      </div>

      {/* Loader */}
      <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
        <Loader className="h-5 w-5 animate-spin text-green-600" />
        <span className="text-sm">Waiting for confirmation...</span>
      </div>
    </div>
  );
}
