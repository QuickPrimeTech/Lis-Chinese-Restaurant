export default function OrderOnlineSection() {
  return (
    <section className="relative flex items-center justify-center py-20 px-6 overflow-hidden bg-white">
      {/* Concave Shape Container */}
      <div className="relative w-full max-w-5xl bg-[#06C167] text-white rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Top Small Cutout */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full" />

        {/* Bottom Small Cutout */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full" />

        {/* Content */}
        <div className="space-y-4 text-center md:text-left max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Craving something delicious?
          </h2>
          <p className="text-lg text-white/90">
            Get your favorite meals delivered fast and fresh. Order now through Uber Eats and enjoy restaurant-quality food at home.
          </p>
        </div>

        <a
          href="#"
          className="bg-black text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Order on Uber Eats
        </a>
      </div>
    </section>
  );
}