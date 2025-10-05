import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCareer } from "@/contexts/career-provider";

export function CareerSuccessStep() {
  const { setCurrentStep } = useCareer();
  return (
    <Card className="text-center p-8">
      <CardHeader>
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <CardTitle className="text-2xl">
          Application Submitted Successfully 🎉
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          A confirmation email has been sent to the address you provided. Please
          check your inbox for further details.
        </p>
        <Button variant="outline" onClick={() => setCurrentStep(0)}>
          Submit Another Application
        </Button>
      </CardContent>
    </Card>
  );
}
