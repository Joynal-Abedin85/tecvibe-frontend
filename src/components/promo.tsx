import Image from "next/image";

export default function PromoBanners() {
  return (
    <section className="py-12 bg-bgs">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Banner 1 */}
        <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group shadow">
          <Image
            src="https://images.unsplash.com/photo-1518442310709-1c1d7a1f724c?auto=format&fit=crop&w=1200&q=80"
            alt="Electronics Sale"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-primarys/40"></div>

          <div className="absolute left-5 bottom-5 text-texts space-y-2">
            <h3 className="text-2xl font-bold">Electronics Sale</h3>
            <p className="text-sm opacity-90">Up to 40% Off</p>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group shadow">
          <Image
            src="https://images.unsplash.com/photo-1526178631152-910c3b2d49d2?auto=format&fit=crop&w=1200&q=80"
            alt="Fashion Deals"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-primarys/40"></div>

          <div className="absolute left-5 bottom-5 text-texts space-y-2">
            <h3 className="text-2xl font-bold">Fashion Deals</h3>
            <p className="text-sm opacity-90">Trendy Styles</p>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group shadow">
          <Image
            src="https://images.unsplash.com/photo-1607082349566-187342175e2e?auto=format&fit=crop&w=1200&q=80"
            alt="Home Essentials"
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-secondarys/40"></div>

          <div className="absolute left-5 bottom-5 text-texts space-y-2">
            <h3 className="text-2xl font-bold">Home Essentials</h3>
            <p className="text-sm opacity-90">Everyday Discounts</p>
          </div>
        </div>

      </div>
    </section>
  );
}
