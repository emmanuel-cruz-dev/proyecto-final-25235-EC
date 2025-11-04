import React from "react";
import BannerSlider from "../components/ui/BannerSlider";
import { heroBannerImgs } from "../data/heroBannerImgs";
import Newsletter from "../components/ui/home/Newsletter";
import ProductSlideList from "../components/product/ProductSlideList";
import FeaturesSection from "../components/common/FeaturesSection";
import TestimonialSlider from "../components/common/TestimonialSlider";

function Home() {
  return (
    <>
      <BannerSlider bannerImages={heroBannerImgs} />
      <ProductSlideList title="Productos más vendidos" />
      <TestimonialSlider />
      <FeaturesSection />
      <Newsletter />
    </>
  );
}

export default Home;
