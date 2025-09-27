import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface MenuCardProps {
  title: string;
  backgroundImage: string;
  pdfLink: string;
}

export const MenuCard = ({
  title,
  pdfLink,
  backgroundImage,
}: MenuCardProps) => {
  return (
    <Card className="group relative aspect-3/2 overflow-hidden rounded-xl transition-all cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-luxury group-hover:scale-105"
          priority
        />
      </div>

      {/* Overlay Content */}
      <CardContent className="relative z-10 flex flex-col p-8 bg-black/60 md:w-3/4 mx-auto my-auto rounded-sm">
        {/* Title */}
        <div className="mb-6">
          <h3 className="text-3xl text-center font-semibold text-white mb-2 animate-fade-in">
            {title}
          </h3>
          <div className="h-1 w-16 bg-gradient-gold rounded-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-slide-up">
          <Button className="flex-1" asChild>
            <Link href={pdfLink} rel="noopener noreferrer" target="_blank">
              <ExternalLink className="size-5" />
              View PDF
            </Link>
          </Button>

          {/* Download PDF */}
          <Button variant="outline" className="flex-1" asChild>
            <a href={pdfLink} download>
              <Download className="size-5" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
