// @/data/about-data.ts

import { ChefHat, Users, Star, Utensils } from "lucide-react";

export const awards = [
  {
    year: "2023",
    award: "Michelin Star",
    description: "Excellence in fine dining",
  },
  {
    year: "2022",
    award: "Best Restaurant Award",
    description: "City's finest dining establishment",
  },
  {
    year: "2021",
    award: "Wine Spectator Award",
    description: "Outstanding wine program",
  },
  {
    year: "2020",
    award: "Chef of the Year",
    description: "Culinary innovation and excellence",
  },
];

export const team = [
  {
    name: "Hari Khasu",
    role: "Executive Chef",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1763838284/nbsnj8kp0fgkbkt4exar_1_ezamhe.jpg",
    description:
      "Oversees kitchen operations and menu creation, ensuring every dish meets the restaurant’s culinary standards.",
  },
  {
    name: "Morris Mativo",
    role: "Head of Strategy, Operations & Compliance",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1763838006/rdeyxjzcdjp2s2eiidgd_1_ewdj02.jpg",
    description:
      "Leads strategic planning and daily operations while ensuring the restaurant runs efficiently and meets industry compliance requirements.",
  },
];

export const values = [
  {
    icon: <ChefHat className="h-8 w-8" />,
    title: "Culinary Excellence",
    description:
      "We source only the finest ingredients and employ time-honored techniques combined with modern innovation.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Exceptional Service",
    description:
      "Our team is dedicated to providing personalized, attentive service that exceeds expectations.",
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Artistic Presentation",
    description:
      "Every dish is a work of art, carefully crafted to delight both the palate and the eye.",
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Memorable Experiences",
    description:
      "We create moments that last a lifetime, celebrating life's most precious occasions.",
  },
];
