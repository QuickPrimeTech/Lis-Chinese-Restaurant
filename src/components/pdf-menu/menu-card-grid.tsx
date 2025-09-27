import { MenuCard } from "./menu-card";

export function MenuCardGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
      <MenuCard
        title="Food Menu"
        backgroundImage={
          "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758987961/food-menu.jpg"
        }
        pdfLink="/food-menu.pdf"
      />

      <MenuCard
        title="Drinks Menu"
        backgroundImage={
          "https://res.cloudinary.com/quick-prime-tech/image/upload/v1758988300/orange-juice.jpg"
        }
        pdfLink="/drinks-menu.pdf"
      />
    </div>
  );
}
