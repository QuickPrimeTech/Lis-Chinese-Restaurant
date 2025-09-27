import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BsPinterest, BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn, FaTiktok, FaTripadvisor } from "react-icons/fa";
import { FooterCurrentYear } from "@/components/footer-current-year";
import { site } from "@/config/site-config";

// import qrCode from "/qr-menu.jpg";

const Footer = () => {
  const footerLinks = {
    restaurant: [
      { name: "About Us", path: "/about" },
      { name: "Menu", path: "/menu" },
      { name: "Contact", path: "/contact" },
      { name: "Gallery", path: "/gallery" },
    ],
    services: [
      { name: "Reservations", path: "/reservations" },
      { name: "Private Events", path: "/private-events" },
    ],
    menu: [
      { name: "Dinner Menu", path: "/menu#dinner" },
      { name: "Wine List", path: "/menu#wine" },
      { name: "Cocktails", path: "/menu#cocktails" },
      { name: "Desserts", path: "/menu#desserts" },
    ],
  };
  const socialLinks = [
    {
      icon: FaTripadvisor,
      url: site.socials.tripAdvisor,
      name: "Tripadvisor",
      hover: "hover:bg-green-500 hover:text-white", // Tripadvisor solid green
    },
    {
      icon: Instagram,
      url: site.socials.instagram,
      name: "Instagram",
      hover:
        "hover:bg-gradient-to-tr hover:from-yellow-700 hover:to-pink-600 hover:text-white", // IG pink→yellow gradient
    },
    {
      icon: BsTwitterX,
      url: site.socials.x,
      name: "Twitter",
      hover: "hover:bg-black hover:text-white", // Twitter solid black
    },
    {
      icon: FaTiktok,
      url: site.socials.tiktok, // Replace with actual TikTok URL
      name: "TikTok",
      hover: "hover:bg-black hover:text-white", // TikTok solid black
    },
    {
      icon: FaLinkedinIn,
      url: site.socials.linkedIn, // Replace with actual LinkedIn URL
      name: "LinkedIn",
      hover: "hover:bg-blue-700 hover:text-white", // LinkedIn solid blue
    },
    {
      icon: BsPinterest,
      url: site.socials.pintrest, // Replace with actual LinkedIn URL
      name: "Pintrest",
      hover: "hover:bg-rose-600 hover:text-white", // LinkedIn solid blue
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-cinzel font-bold text-primary mb-6 block"
            >
              Li&apos;s Chinese Restaurant
            </Link>
            <p className="text-muted-foreground font-chivo leading-relaxed mb-6 max-w-md">
              Experience culinary excellence in an atmosphere of refined
              elegance. Where every meal is a celebration and every moment is
              treasured.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 text-primary" />
                <span className="font-chivo">
                  QR74+JR2, PETROCITY-Gigiri, Limuru Rd, Nairobi
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span className="font-chivo">0746815106</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span className="font-chivo">
                  info@lischineserestaurantnairobi.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel font-semibold text-foreground mb-6">
              Restaurant
            </h3>
            <ul className="space-y-3">
              {footerLinks.restaurant.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors font-chivo"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cinzel font-semibold text-foreground mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors font-chivo"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code Section */}
          <div>
            <h3 className="font-cinzel font-semibold text-foreground mb-6">
              Digital Menu
            </h3>
            <Card className="bg-background border-border py-0">
              <CardContent className="p-2 text-center">
                <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1758718147/qr-code.jpg"
                    fill
                    alt="QR Code for Digital Menu"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Menu Online
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-cinzel font-semibold text-foreground mb-4">
              Stay Connected
            </h3>
            <p className="text-muted-foreground font-chivo mb-6">
              Be the first to know about exclusive events, seasonal menus, and
              special offers
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-auto flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground font-chivo"
              />
              <Button className="w-full md:w-fit bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8">
                <Mail />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-background border border-border p-3 rounded-full text-muted-foreground transition-all duration-300 ${social.hover}`}
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-muted-foreground font-chivo">
              <FooterCurrentYear />
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors font-chivo text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors font-chivo text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
