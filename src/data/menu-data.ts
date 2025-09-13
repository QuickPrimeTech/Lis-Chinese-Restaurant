import type { Item } from "@/types/menu";

export const menuItems: Record<string, Item[]> = {
  appetizers: [
    {
      id: "app1",
      name: "Seared Foie Gras",
      description:
        "Pan-seared foie gras with cherry gastrique and brioche toast",
      price: 32,
      image: "/appetizer.jpg",
      category: "Appetizers",
      rating: 4.9,
      prepTime: 15,
    },
    {
      id: "app2",
      name: "Oysters Rockefeller",
      description:
        "Fresh Blue Point oysters with spinach, herbs, and hollandaise",
      price: 28,
      image: "/appetizer.jpg",
      category: "Appetizers",
      rating: 4.8,
      prepTime: 12,
    },
    {
      id: "app3",
      name: "Wagyu Beef Tartare",
      description: "Hand-cut wagyu with quail egg, capers, and truffle oil",
      price: 38,
      image: "/appetizer.jpg",
      category: "Appetizers",
      rating: 5.0,
      prepTime: 10,
    },
  ],
  mains: [
    {
      id: "main1",
      name: "Dry-Aged Ribeye",
      description:
        "32oz dry-aged ribeye with roasted bone marrow and seasonal vegetables",
      price: 95,
      image: "/main-course.jpg",
      category: "Main Courses",
      rating: 4.9,
      prepTime: 25,
    },
    {
      id: "main2",
      name: "Lobster Thermidor",
      description: "Whole Maine lobster with cognac cream sauce and gruyere",
      price: 68,
      image: "/main-course.jpg",
      category: "Main Courses",
      rating: 4.8,
      prepTime: 30,
    },
    {
      id: "main3",
      name: "Duck Confit",
      description:
        "Slow-cooked duck leg with cherry reduction and potato gratin",
      price: 52,
      image: "/main-course.jpg",
      category: "Main Courses",
      rating: 4.7,
      prepTime: 22,
    },
  ],
  desserts: [
    {
      id: "des1",
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla bean ice cream",
      price: 18,
      image: "/dessert.jpg",
      category: "Desserts",
      rating: 4.9,
      prepTime: 20,
    },
    {
      id: "des2",
      name: "Crème Brûlée Trio",
      description:
        "Classic vanilla, lavender honey, and espresso crème brûlée",
      price: 16,
      image: "/dessert.jpg",
      category: "Desserts",
      rating: 4.8,
      prepTime: 8,
    },
    {
      id: "des3",
      name: "Tarte Tatin",
      description: "Upside-down apple tart with calvados ice cream",
      price: 14,
      image: "/dessert.jpg",
      category: "Desserts",
      rating: 4.7,
      prepTime: 15,
    },
  ],
};
