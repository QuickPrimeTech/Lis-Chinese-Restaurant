import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function OrderOnlineSection() {
  return (
    <section className="relative text-white flex flex-col lg:flex-row items-center gap-8 justify-center py-28 px-6 bg-gradient-to-br from-emerald-500 to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 overflow-hidden -mt-12">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Stock Image */}
      <div className="relative rounded-lg overflow-hidden flex-1 w-full max-w-140 aspect-[3/2]">
        <Image
          src={"https://res.cloudinary.com/quick-prime-tech/image/upload/v1770711191/imgi_193_original-5e6169dffaf28828d0f7669f2d6c05f6_lbts14.jpg"}
          alt="Uber Eats delivery"
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Content */}
      <div className="space-y-6 flex-1 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl max-sm:text-center font-bold leading-tight">
          Craving something delicious?
        </h2>
        <p className="text-lg text-white/90">
          Get your favorite meals delivered fast and fresh. Order now through Uber Eats and enjoy restaurant-quality Chinese food at home.
        </p>

        <Button
          size="xl"
          variant="outline"
          className="text-foreground dark:bg-foreground dark:text-background dark:hover:bg-foreground/80"
          asChild
        >
          <Link
            href={"https://www.ubereats.com/ke/store/lis-chinese-restaurant-nairobi/mK3prEXcUr-0xK91bDy28w?diningMode=DELIVERY&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxpJ3MlMjBDaGluZXNlJTIwUmVzdGF1cmFudCUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkNoSUpnLWxKdlhRWEx4Z1Jnem15eVFIdnhZdyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJnb29nbGVfcGxhY2VzJTIyJTJDJTIybGF0aXR1ZGUlMjIlM0EtMS4yMzU5OTg1MDAwMDAwMDAyJTJDJTIybG9uZ2l0dWRlJTIyJTNBMzYuODA3MDE0MDk5OTk5OTk2JTdE&sc=SEARCH_SUGGESTION"}
            rel="noreferrer noopener"
            target="_blank"
          >
            Order on Uber Eats
          </Link>
        </Button>
      </div>
    </section>
  );
}
