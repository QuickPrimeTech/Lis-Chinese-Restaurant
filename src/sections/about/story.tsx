// @/sections/about/story.tsx

export default function AboutStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel font-bold text-foreground mb-8">
              A Legacy of Excellence
            </h2>
            <div className="space-y-6 text-lg font-chivo text-muted-foreground leading-relaxed">
              <p>
                Founded in 2008, Li&apos;s Chinese Restaurant began as a vision
                to create more than just a restaurant – we sought to craft an
                experience that would redefine fine dining. What started as a
                passion project by renowned chef Alexandre Dubois has evolved
                into a culinary institution that celebrates the art of
                gastronomy.
              </p>
              <p>
                Our philosophy centers on the belief that exceptional cuisine is
                born from the marriage of the finest ingredients, masterful
                technique, and genuine hospitality. Every dish tells a story,
                every wine pairing creates a memory, and every service moment
                reflects our commitment to excellence.
              </p>
              <p>
                Located in the heart of the city, Li&apos;s Chinese Restaurant
                has become a destination for those who appreciate the finer
                things in life. From intimate romantic dinners to grand
                celebrations, we have had the privilege of being part of
                countless special moments.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            <div>
              <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                15+
              </div>
              <p className="text-muted-foreground font-chivo">Years of Excellence</p>
            </div>
            <div>
              <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                50k+
              </div>
              <p className="text-muted-foreground font-chivo">Satisfied Guests</p>
            </div>
            <div>
              <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                500+
              </div>
              <p className="text-muted-foreground font-chivo">Five-Star Reviews</p>
            </div>
            <div>
              <div className="text-4xl font-cinzel font-bold text-primary mb-2">
                25+
              </div>
              <p className="text-muted-foreground font-chivo">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
