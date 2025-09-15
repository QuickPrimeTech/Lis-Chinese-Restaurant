// @/sections/reservations/reservation-info.tsx

import { Clock, Users, CheckCircle } from "lucide-react";

export const ReservationInfoSection = () => (
  <div className="mt-12 grid md:grid-cols-3 gap-8 text-center container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="space-y-4">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <Clock className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-cinzel font-semibold text-foreground">Confirmation</h3>
      <p className="text-muted-foreground font-chivo text-sm">
        Receive confirmation within 2 hours via email and SMS
      </p>
    </div>
    <div className="space-y-4">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-cinzel font-semibold text-foreground">Flexible Seating</h3>
      <p className="text-muted-foreground font-chivo text-sm">
        Indoor, outdoor, and private dining options available
      </p>
    </div>
    <div className="space-y-4">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-cinzel font-semibold text-foreground">Easy Cancellation</h3>
      <p className="text-muted-foreground font-chivo text-sm">
        Cancel or modify up to 24 hours before your reservation
      </p>
    </div>
  </div>
);
