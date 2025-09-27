import { CheckCircle, MessageCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReservationFormValues } from "@/schemas/reservations";

interface SuccessStepProps {
  reservationData: ReservationFormValues; // ✅ strongly typed
  onNewReservation: () => void;
}

export const SuccessStep = ({
  reservationData,
  onNewReservation,
}: SuccessStepProps) => {
  return (
    <div className="text-center space-y-6 transition-all duration-500 ease-in-out">
      <div className="flex justify-center">
        <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Reservation Confirmed!
        </h2>
        <p className="text-muted-foreground">
          Thank you, {reservationData.firstName}! Your table has been reserved.
        </p>
      </div>

      <Card className="text-left">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">What happens next?</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">WhatsApp Confirmation</div>
                <div className="text-sm text-muted-foreground">
                  You&apos;ll receive a WhatsApp message with your reservation
                  details shortly.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Reminder Call</div>
                <div className="text-sm text-muted-foreground">
                  Our team will call you 6 hours before your reservation to
                  confirm.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Need to Cancel?</div>
                <div className="text-sm text-muted-foreground">
                  Simply text us on WhatsApp if you need to cancel or modify
                  your reservation.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Reservation Details:</strong>
          <br />
          {reservationData.date &&
            new Date(reservationData.date).toLocaleDateString()}{" "}
          at {reservationData.time}
          <br />
          {reservationData.guests}{" "}
          {reservationData.guests === "1" ? "guest" : "guests"} •{" "}
          {reservationData.diningPreference === "indoor" ? "Indoor" : "Outdoor"}{" "}
          dining
        </p>
      </div>

      <Button onClick={onNewReservation} variant="outline" className="w-full">
        Make Another Reservation
      </Button>
    </div>
  );
};
