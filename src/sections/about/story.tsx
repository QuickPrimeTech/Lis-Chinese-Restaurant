// @/sections/about/story.tsx
import Image from "next/image";
export default function AboutStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          <div className="text-center lg:text-left lg:items-center  gap-y-6 mb-16 flex flex-col lg:flex-row lg:justify-between lg:space-x-10">
            <Image
              src="/team4.jpg"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <div className="flex flex-col gap-3 lg:gap-6">
              {" "}
              <h2 className="text-4xl font-cinzel font-bold text-foreground ">
                A Legacy of Excellence
              </h2>
              <div className="space-y-6 text-lg font-chivo text-muted-foreground leading-relaxed">
                <p>
                  Our philosophy centers on the belief that exceptional cuisine
                  is born from the marriage of the finest ingredients, masterful
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
          </div>

          {/* Stats */}
        </div>
      </div>
    </section>
  );
}
