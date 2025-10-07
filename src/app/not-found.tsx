"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center min-h-screen  px-4">
      <Card className="relative z-10 max-w-2xl w-full text-center bg-background/10 border border-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8">
        <CardHeader>
          <CardTitle className="text-7xl md:text-9xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            404
          </CardTitle>
          <CardDescription className="text-lg md:text-xl text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <p className="text-base md:text-lg text-muted-foreground">
            It might have been moved, renamed, or never existed. Let&apos;s help
            you find your way back.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <Link href={"/"}>Go to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Floating Gradient Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl top-1/4 left-1/3 animate-animate-float"></div>
        <div className="absolute w-48 h-48 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-2xl bottom-1/4 right-1/4 animate-animate-float delay-1000"></div>
      </div>
    </section>
  );
}
