import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import womentData from "../assets/womenCloth";
import { ProductCard } from "./ProductCard";
import menData from "../assets/menCloth";
import kidsData from "../assets/kidsCloth";

export const NowTranding = () => {
  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 md:relative top-11">
        <h2 className="text-2xl font-semibold">Trending Now</h2>
      </div>

      {/* Tabs (RIGHT) */}
      <div className="tabs tabs-border md:justify-end">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Women"
          defaultChecked
        />
        <div className="tab-content  pt-10">
          <Swiper
            slidesPerView={4.2}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4.2,
              },
            }}
          >
            {womentData.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  title={item.title}
                  price={item.price}
                  image={item.img}
                  hoverImage={item.img2}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Men" />
        <div className="tab-content  pt-10">
          <Swiper
            slidesPerView={4.2}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4.2,
              },
            }}
          >
            {menData.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  title={item.title}
                  price={item.price}
                  image={item.img}
                  hoverImage={item.img2}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <input type="radio" name="my_tabs_2" className="tab" aria-label="Kid" />
        <div className="tab-content  pt-10">
          <Swiper
            slidesPerView={4.2}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[]}
            className="mySwiper"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4.2,
              },
            }}
          >
            {kidsData.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  title={item.title}
                  price={item.price}
                  image={item.img}
                  hoverImage={item.img2}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
