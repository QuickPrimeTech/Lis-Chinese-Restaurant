// @/sections/contact/quick-actions.tsx
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContactQuickActions() {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      {/* Quick Actions */}
      <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
        <CardContent className="p-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
            Make a Reservation
          </h3>
          <p className="text-muted-foreground font-chivo mb-6">
            Book your table for an unforgettable dining experience
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/reservations">Book Now</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
        <CardContent className="p-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
            Plan an Event
          </h3>
          <p className="text-muted-foreground font-chivo mb-6">
            Create memorable celebrations with our event specialists
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/private-events">Inquire Now</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="text-center hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50">
        <CardContent className="p-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-cinzel font-semibold text-xl text-foreground mb-4">
            General Questions
          </h3>
          <p className="text-muted-foreground font-chivo mb-6">
            Have questions about our menu, services, or policies?
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/contact">Get Answers</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
