// @/sections/gallery/CTA.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryCTA() {
  return (
    <div className="mt-20 text-center mb-16">
      <Card className="bg-gradient-primary">
        <CardContent className="p-12">
          <h3 className="text-3xl font-cinzel font-bold text-primary-foreground mb-4">
            Ready to Experience Li&apos;s Chinese Restaurant?
          </h3>
          <p className="text-primary-foreground/90 font-chivo mb-8 text-lg">
            Plan your private event or book a table to experience the elegance
            firsthand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-primary hover:bg-background/90"
              asChild
            >
              <Link href={"/private-events"}>
                Plan Your Event <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={"/menu"}>Book a table</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
