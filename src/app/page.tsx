import BrandCarousel from "@/components/brandcourosol";
import CategoryGrid from "@/components/categrid";
import FlashSale from "@/components/flashsale";
import Footer from "@/components/footer";
import HeroBanner from "@/components/hero";
import MegaDeals from "@/components/megadeals";
import ProductList from "@/components/plist";
import PromoBanners from "@/components/promo";
import Testimonials from "@/components/testimounial";
import TopSelling from "@/components/topselling";

export default function HomePage() {
  return (
    <div className="text-center py-10">
      <HeroBanner></HeroBanner>
      <CategoryGrid></CategoryGrid>
      <FlashSale />

      <PromoBanners />

      <ProductList title="Recommended For You" />

      <TopSelling />

      <BrandCarousel />

      <MegaDeals />

      <Testimonials />

      <Footer />
      <p className="text-lg text-gray-600">
        Shop the best products at the best prices
      </p>
    </div>
  );
}
