import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full bg-bgs py-8 md:py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-texts">
            Shop Smart, Live Better
          </h1>

          <p className="text-lg text-muteds max-w-md mx-auto md:mx-0">
            Get the best deals on electronics, fashion, home essentials & more.
            Everyday low prices—delivered fast.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-4 rounded-xl text-texts text-lg bg-primarys hover:opacity-90 transition">
              Shop Now
            </button>

            <button className="px-6 py-4 rounded-xl text-lg border border-primarys text-primarys hover:bg-primarys hover:text-texts transition">
              Explore Deals
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_106176-1647.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Ecommerce banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
