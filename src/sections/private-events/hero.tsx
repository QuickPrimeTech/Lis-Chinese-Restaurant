"use client";

const privateEventsHero = "/private-events-hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${privateEventsHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-foreground mb-6">
              Private Events
            </h1>
            <p className="text-xl font-chivo max-w-3xl mx-auto">
              Create unforgettable memories with exclusive dining experiences
              tailored to your special occasion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
