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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image) => (
        <Card
          key={image.id}
          className="group overflow-hidden hover:shadow-luxury transition-all duration-300 border-border hover:border-primary/50"
        >
          <CardContent className="p-0">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative h-96 aspect-square cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-cinzel font-semibold text-lg text-white">{image.title}</h3>
                      <p className="text-sm text-white/80 font-chivo">{image.description}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-background border-border">
                <div className="relative w-full aspect-square">
                  <Image src={image.src} alt={image.title} fill />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                    <h3 className="font-cinzel font-bold text-2xl">{image.title}</h3>
                    <p className="text-muted-foreground font-chivo">{image.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
