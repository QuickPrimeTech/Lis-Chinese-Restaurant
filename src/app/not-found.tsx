"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-950  to-gray-950 text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-7xl md:text-9xl font-cinzel font-bold text-gradient mb-6">
          404
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-lg text-muted-foreground mb-12">
          It might have been moved, renamed, or never existed. Let us guide you
          back.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button size="lg" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 transition-all duration-300"
            onClick={() => router.push("/")}
          >
            Go to Homepage
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute w-64 h-64 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl top-1/4 left-1/3 animate-animate-float"></div>
          <div className="absolute w-48 h-48 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-2xl bottom-1/4 right-1/4 animate-animate-float delay-1000"></div>
        </div>
      </div>
    </section>
  );
}
