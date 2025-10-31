import React from "react";
import BannerSlider from "../components/ui/BannerSlider";
import { heroBannerImgs } from "../data/heroBannerImgs";

function Home() {
  return <BannerSlider bannerImages={heroBannerImgs} />;
}

export default Home;
