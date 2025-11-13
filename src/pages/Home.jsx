import React from "react";
import { heroBannerImgs } from "../data/heroBannerImgs";
import Newsletter from "../components/ui/home/Newsletter";
import ProductSlideList from "../components/product/ProductSlideList";
import FeaturesSection from "../components/common/FeaturesSection";
import TestimonialSlider from "../components/common/TestimonialSlider";
import BannerCarousel from "../components/ui/BannerCarousel";
import { useProducts } from "../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts(1, 6);

  return (
    <>
      <BannerCarousel images={heroBannerImgs} />
      <ProductSlideList
        title="Productos Destacados"
        products={products}
        loading={loading}
        error={error}
      />
      <TestimonialSlider />
      <FeaturesSection />
      <Newsletter />
    </>
  );
}

export default Home;
