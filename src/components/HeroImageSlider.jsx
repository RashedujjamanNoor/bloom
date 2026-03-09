import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import hero5 from "../assets/hero5.webp";
import hero6 from "../assets/hero6.webp";

export const HeroImageSlider = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={hero1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={hero6} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
