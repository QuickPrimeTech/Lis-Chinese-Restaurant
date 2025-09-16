// @/sections/gallery/CTA.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GalleryCTA() {
  return (
    <div className="mt-20 text-center mb-16">
      <Card className="bg-gradient-primary max-w-2xl mx-auto">
        <CardContent className="p-12">
          <h3 className="text-3xl font-cinzel font-bold text-primary-foreground mb-4">
            Ready to Experience Li&apos;s Chinese Restaurant?
          </h3>
          <p className="text-primary-foreground/90 font-chivo mb-8 text-lg">
            Book your table or plan your private event to experience the elegance firsthand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="border-primary-foreground bg-primary-foreground text-primary hover:text-primary-foreground"
            >
              Plan Your Event
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Plan Your Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
