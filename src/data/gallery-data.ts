// @/data/gallery-data.ts

import { GalleryImage } from '@/types/gallery';

export const galleryData: Record<string, GalleryImage[]> = {
  interior: [
    { id: 1, src: "/gallery-hero.jpg", title: "Main Dining Room", description: "Elegant dining space with sophisticated ambiance" },
    { id: 2, src: "/gallery-2.jpg", title: "Private Bar Area", description: "Intimate bar setting perfect for cocktails" },
    // ...
  ],
  cuisine: [
    { id: 5, src: "/api/placeholder/800/600", title: "Signature Tasting Menu", description: "Seven-course culinary journey" },
    // ...
  ],
  events: [
    { id: 9, src: "/api/placeholder/800/600", title: "Corporate Events", description: "Professional meetings and business dinners" },
    // ...
  ],
  kitchen: [
    { id: 13, src: "/gallery-1.jpg", title: "Executive Chef at Work", description: "Culinary artistry in our open kitchen" },
    // ...
  ],
};
