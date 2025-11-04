import React from "react";
import BannerSlider from "../components/ui/BannerSlider";
import { heroBannerImgs } from "../data/heroBannerImgs";
import Newsletter from "../components/ui/home/Newsletter";
import ProductSlideList from "../components/product/ProductSlideList";
import FeaturesSection from "../components/common/FeaturesSection";

function Home() {
  return (
    <>
      <BannerSlider bannerImages={heroBannerImgs} />
      <ProductSlideList title="Productos más vendidos" />
      <FeaturesSection />
      <Newsletter />
    </>
  );
}

export default Home;
