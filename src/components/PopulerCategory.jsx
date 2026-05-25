import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";

import { CategoryCard } from "./CategoryCard";

import { fetchProducts } from "../features/product/productSlice";

export const PopulerCategory = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // UNIQUE CATEGORIES
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mt-4">
      <div className="text-left text-2xl font-semibold">
        <h2>Popular Category</h2>
      </div>

      <hr className="mt-1 rounded-full border bg-gray-200" />

      <div className="mt-6">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
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
              slidesPerView: 5,
            },
          }}
        >
          {categories.map((category, index) => {
            const categoryProduct = products.find(
              (product) => product.category === category,
            );

            return (
              <SwiperSlide key={index}>
                <CategoryCard
                  title={category}
                  image={categoryProduct?.images?.[0]}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
