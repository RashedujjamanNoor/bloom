import React from "react";
import { HeroImageSlider } from "../components/HeroImageSlider";
import { PopulerCategory } from "../components/PopulerCategory";
import { NowTranding } from "../components/NowTranding";
import { Sale } from "../components/Sale";

export const Home = () => {
  return (
    <div>
      <HeroImageSlider />
      <PopulerCategory />
      <NowTranding />
      <Sale />
    </div>
  );
};
