import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Wine, UtensilsCrossed, Cookie } from "lucide-react";
import Link from "next/link";
export const MenuPreview = () => {
  const menuCategories = [
    {
      icon: Wine,
      title: "Drinks Menu",
      description:
        "Curated selection of fine wines, craft cocktails, and premium spirits",
      link: "/menu#drinks",
    },
    {
      icon: UtensilsCrossed,
      title: "Food Menu",
      description:
        "Exquisite dishes crafted with the finest ingredients and techniques",
      link: "/menu#food",
    },
    {
      icon: Cookie,
      title: "Dessert Menu",
      description: "Artisanal desserts that provide the perfect sweet finale",
      link: "/menu#Dessert",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/quick-prime-tech/image/upload/v1770274094/download_fylusv.webp"
          alt="Menu preview"
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAbACgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAUCAwYEB//EACsQAAIBAgUCBAcBAAAAAAAAAAECAwARBAUSITETQVFhkaEUIjIzUnGBgv/EABgBAAMBAQAAAAAAAAAAAAAAAAABAwIE/8QAHBEAAgIDAQEAAAAAAAAAAAAAAQIAERIhMQNh/9oADAMBAAIRAxEAPwDzzUdJBFkNr2qIC6uDpv7UyxOXSwXglmRyqDSb7WO4t60vZTHIyEglTbaoqwPJUoV7GS5NNIV6Wn54+oFLXNtOoXIFr2t/arlwXQVnMkZCsVsCTexHG3G/sa7sFnUeHw41K2pECBR32tzSvFzqU1Ifu3Zl/E3O1SUuxIInTh5KLyl5jwzZTM91E6yDTcm5Wxv7kUUuWU9B18e9FWRSLuQdwaqOUxsUyJNj8ewaL6UjBLntydu/jTXK2yDFiWUdNGBJc4qxY/q+1ZSdjIAz2JsBxVagBTtzSCADWplnJO5vJIsrx8iYeOGF0XiQstgPPSePKoHKcrWNneCMpEpZiCdh61iRxUhLIiOqyMARYgHnejD7DKSxAjYySxR6Iy50rfgUVcN8jYkC/wAQN/8AJopobuD6qf/Z"
          }
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-6">
            Our Menu
          </h2>
          <p className="text-xl text-white/90 font-chivo max-w-3xl mx-auto">
            Discover a world of flavors carefully curated to create an
            unforgettable dining experience
          </p>
        </div>

        {/* Menu Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-background/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-background/20 transition-all duration-500 hover:scale-105"
            >
              <div className="text-primary mb-6 flex justify-center group-hover:animate-glow">
                <category.icon className="size-8" />
              </div>
              <h3 className="text-2xl font-cinzel font-semibold text-white mb-4">
                {category.title}
              </h3>
              <p className="text-white/80 font-chivo mb-6 leading-relaxed">
                {category.description}
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-foreground hover:bg-white transition-all duration-300"
                asChild
              >
                <Link href={category.link}>View Menu</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Full Menu Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="xl"
            className="hover:shadow-glow transition-all duration-300"
          >
            <Link href="/menu"> View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
