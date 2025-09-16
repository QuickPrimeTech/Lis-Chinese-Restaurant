// @/sections/gallery/gallery-grid.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { GalleryImage } from "@/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="columns-1 md:columns-3 lg:columns-5 gap-6 space-y-6">
      {images.map((image, index) => (
        <Card
          key={image.src || index}
          className="py-0 break-inside-avoid group overflow-hidden hover:shadow-luxury transition-all duration-300 border border-border hover:border-primary/50"
        >
          <CardContent className="p-0">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.title ?? "Gallery image for Li's Chinese Restaurant"}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {(image.title && image.title) && (
                      <div className="absolute bottom-4 left-4">
                      <h3 className="font-cinzel font-semibold text-lg text-white">
                        {image.title}
                      </h3>
                      <p className="text-sm text-white/80 font-chivo">
                        {image.description}
                      </p>
                    </div>
                    )}
                  </div>
                </div>
              </DialogTrigger>
             <DialogContent className="max-w-4xl p-0 bg-background border-border">
  <div className="relative flex justify-center items-center">
    <Image
      src={image.src}
      alt={image.title ?? "Gallery image for Li's Chinese Restaurant"}
      width={1200}
      height={800}
      className="max-h-[90vh] w-auto object-contain"
    />
    {(image.title || image.description) && (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
        <h3 className="font-cinzel font-bold text-2xl">
          {image.title}
        </h3>
        <p className="text-muted-foreground font-chivo">
          {image.description}
        </p>
      </div>
    )}
  </div>
</DialogContent>

            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

