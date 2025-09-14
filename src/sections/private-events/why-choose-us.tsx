"use client";
import { Utensils, Users, MapPin, Star } from "lucide-react";

const WhyChooseUs = () => {
  const items = [
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: "Culinary Excellence",
      desc: "Award-winning cuisine crafted by world-class chefs",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Dedicated Service",
      desc: "Personal event coordinator and professional staff",
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Elegant Venues",
      desc: "Sophisticated spaces perfect for any occasion",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Bespoke Experience",
      desc: "Fully customizable to your vision and needs",
    },
  ];
  return (
    <div className="bg-card rounded-2xl p-12 mt-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-cinzel font-bold text-foreground mb-4">
          Why Choose Us
        </h3>
      </div>
      <div className="grid md:grid-cols-4 gap-8 text-center">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              {item.icon}
            </div>
            <h4 className="font-cinzel font-semibold mb-2">{item.title}</h4>
            <p className="text-muted-foreground font-chivo text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
