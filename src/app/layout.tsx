import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cinzel, Chivo } from "next/font/google"; // 👈 add these
import "./globals.css";
import Footer from "@/layouts/footer";
import { CartProvider } from "@/contexts/cart-provider";
import { OrderProvider } from "@/contexts/order-context";
import { CartButton } from "@/components/cart/cart-button";
import { ContactButton } from "@/layouts/contact-button";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/layouts/site-header";
import { Toaster } from "@/components/ui/sonner";
import { CheckCircle2, CircleAlert, Loader, XCircleIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"], // pick weights you need
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Li's Chinese Restaurant | Fine Chinese Dining in Nairobi",
    template: "%s | Li's Chinese Restaurant",
  },
  description:
    "Discover Li's Chinese Restaurant in Nairobi — authentic Chinese dining with a modern touch. Perfect for family meals, romantic dinners, and special celebrations.",
  keywords: [
    "Chinese restaurant Nairobi",
    "Li's Chinese Restaurant",
    "authentic Chinese food Kenya",
    "best Chinese dining Nairobi",
    "family dining Nairobi",
    "fine dining Nairobi",
  ],
  openGraph: {
    title: "Li's Chinese Restaurant | Fine Chinese Dining in Nairobi",
    description:
      "Enjoy authentic Chinese cuisine in Nairobi with delicious meals, a welcoming atmosphere, and excellent service.",
    url: "https://your-domain.com",
    siteName: "Li's Chinese Restaurant",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Li's Chinese Restaurant | Fine Chinese Dining in Nairobi",
    description:
      "Authentic Chinese cuisine in Nairobi — tasty dishes, elegant space, and warm hospitality.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${cinzel.variable} 
          ${chivo.variable} 
          antialiased
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader>
            <OrderProvider>
              <CartProvider>
                <CartButton />
                {children}
                <Toaster
                  richColors
                  position="top-right"
                  expand={true}
                  icons={{
                    loading: (
                      <Loader className="w-4 h-4 animate-spin text-foreground" />
                    ),
                    success: (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ),
                    error: <CircleAlert className="w-4 h-4 text-red-500" />,
                  }}
                />
                <ContactButton />
                <Footer />
              </CartProvider>
            </OrderProvider>
          </SiteHeader>
        </ThemeProvider>
      </body>
    </html>
  );
}
