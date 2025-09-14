// @/data/about-data.ts

import { ChefHat, Users, Star, Utensils } from "lucide-react";

export const awards = [
  { year: "2023", award: "Michelin Star", description: "Excellence in fine dining" },
  { year: "2022", award: "Best Restaurant Award", description: "City's finest dining establishment" },
  { year: "2021", award: "Wine Spectator Award", description: "Outstanding wine program" },
  { year: "2020", award: "Chef of the Year", description: "Culinary innovation and excellence" },
];

export const team = [
  {
    name: "Alexandre Dubois",
    role: "Executive Chef",
    experience: "15+ years",
    image: "/chef-portrait.jpg",
    description: "Trained in Paris and Tokyo, brings international expertise to Li's Chinese Restaurant",
  },
  {
    name: "Maria Santos",
    role: "Pastry Chef",
    experience: "12+ years",
    image: "/api/placeholder/300/300",
    description: "Award-winning pastry chef specializing in modern European desserts",
  },
  {
    name: "James Wellington",
    role: "Sommelier",
    experience: "10+ years",
    description: "Master sommelier with expertise in rare wines and perfect pairings",
  },
  {
    name: "Sofia Rodriguez",
    role: "Restaurant Manager",
    experience: "8+ years",
    description: "Ensures impeccable service and memorable dining experiences",
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
