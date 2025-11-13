import React from "react";
import { heroBannerImgs } from "../data/heroBannerImgs";
import Newsletter from "../components/ui/home/Newsletter";
import ProductSlideList from "../components/product/ProductSlideList";
import FeaturesSection from "../components/common/FeaturesSection";
import TestimonialSlider from "../components/common/TestimonialSlider";
import BannerCarousel from "../components/ui/BannerCarousel";

function Home() {
  return (
    <>
      <BannerCarousel images={heroBannerImgs} />
      <ProductSlideList title="Productos más vendidos" />
      <TestimonialSlider />
      <FeaturesSection />
      <Newsletter />
    </>
  );
}

export default Home;
