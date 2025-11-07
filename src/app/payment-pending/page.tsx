import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getVisitorCount } from "@/utils/visitor-count";
import Link from "next/link";
import { Suspense } from "react";
import { BsWhatsapp } from "react-icons/bs";

export const dynamic = "force-dynamic";

export default function PaymentPendingPage() {
  const whatsappLink = "https://wa.me/254717448835";
  const whatsappMessage = encodeURIComponent(
    "Hello QuickPrimeTech. I am the restaurant owner and I want to complete my website payment"
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-muted/10 p-6">
      {/* Dual Gradient Overlay Background */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />

      <Card className="max-w-md space-y-2 px-6 py-8 relative z-10 backdrop-blur-md bg-background/90 shadow-lg">
        <h1 className="text-3xl font-bold text-destructive">
          Website Taken Down
        </h1>

        <p className="text-muted-foreground">
          This restaurant&apos;s website has been{" "}
          <strong>temporarily taken down</strong> due to
          <strong> unpaid development fees</strong>.
        </p>

        <p className="text-sm text-muted-foreground">
          If you are the restaurant owner, please contact the developer to
          <strong> restore your site immediately</strong>.
        </p>

        <Button asChild className="flex items-center gap-2 w-full mt-4">
          <Link
            href={`${whatsappLink}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp className="text-lg" />
            Contact Developer
          </Link>
        </Button>

        <div className="text-xs text-muted-foreground mt-4">
          <p>
            👀 This page has been viewed{" "}
            <Suspense fallback={<span className="text-bold">loading...</span>}>
              <VisitorCount />
            </Suspense>{" "}
            times
          </p>
        </div>
      </Card>
    </div>
  );
}

async function VisitorCount() {
  const count = await getVisitorCount();
  return <strong>{count}</strong>;
}
