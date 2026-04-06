import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { CategoryCard } from "./CategoryCard";
import CategoryData from "../assets/category.js";

export const PopulerCategory = () => {
  return (
    <div className="mt-4">
      <div className="text-left text-2xl font-semibold">
        <h2>Populer Category</h2>
      </div>
      <hr
        className="border bg-gray-200 rounded-full mt-1
      "
      />

      <div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {CategoryData.map((item) => (
            <SwiperSlide key={item.id}>
              <CategoryCard title={item.title} image={item.img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
