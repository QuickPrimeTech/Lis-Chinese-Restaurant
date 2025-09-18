"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { GalleryImage } from "@/types/gallery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="columns-1 md:columns-3 lg:columns-5 gap-6 space-y-6">
      {images.map((image, index) => (
        <Card
          key={`${image.src}-${index}`}
          className="py-0 break-inside-avoid group overflow-hidden hover:shadow-luxury transition-all duration-300 border border-border hover:border-primary/50"
        >
          <CardContent className="p-0">
            <Dialog
              open={lightboxIndex === index}
              onOpenChange={(open) => !open && setLightboxIndex(null)}
            >
              <DialogTrigger asChild>
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="relative cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.title ?? "Gallery image"}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    {(image.title || image.description) && (
                      <div className="p-4">
                        <h3 className="font-cinzel font-semibold text-lg text-white">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-sm text-white/80 font-chivo">
                            {image.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </DialogTrigger>

              {/* Carousel Lightbox */}
              <DialogContent className="max-w-6xl w-[95vw] max-h-[85vh] p-0 border-0 bg-background">
                <DialogTitle>
                  <VisuallyHidden>
                    {image.title ?? "Gallery Image"}
                  </VisuallyHidden>
                </DialogTitle>

                <Carousel
                  opts={{
                    startIndex: lightboxIndex ?? 0,
                    loop: true,
                  }}
                  className="w-full h-full flex justify-center items-center"
                >
                  <CarouselContent className="w-full h-full">
                    {images.map((img, i) => (
                      <CarouselItem
                        key={`${img.src}-${i}`}
                        className="flex justify-center items-center w-full h-full"
                      >
                        <div className="relative w-full max-h-[80vh] flex justify-center items-center">
                          <Image
                            src={img.src}
                            alt={img.title ?? "Gallery image"}
                            width={1600}
                            height={1000}
                            className="max-h-[80vh] w-auto object-contain"
                          />
                          {(img.title || img.description) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-6">
                              <h3 className="font-cinzel font-bold text-2xl text-foreground">
                                {img.title}
                              </h3>
                              <p className="text-muted-foreground font-chivo">
                                {img.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
