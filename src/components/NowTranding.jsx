import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useDispatch, useSelector } from "react-redux";

import { ProductCard } from "./ProductCard";

import { fetchProducts } from "../features/admin/adminSlice";

export const NowTranding = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // FILTER PRODUCTS
  const womenProducts = products.filter(
    (item) => item.gender?.toLowerCase() === "women",
  );

  const menProducts = products.filter(
    (item) => item.gender?.toLowerCase() === "men",
  );

  const kidProducts = products.filter(
    (item) => item.gender?.toLowerCase() === "kid",
  );

  const renderSlider = (data) => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (data.length === 0) {
      return <p>No Products Found</p>;
    }

    return (
      <Swiper
        slidesPerView={4.2}
        spaceBetween={30}
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
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductCard
              id={item._id}
              item={item}
              title={item.title}
              price={item.price}
              image={item.images?.[0]}
              hoverImage={item.images?.[1]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="mt-4">
      {/* HEADER */}
      <div className="relative mb-2 flex items-center justify-between md:top-11">
        <h2 className="text-2xl font-semibold">Trending Now</h2>
      </div>

      {/* TABS */}
      <div className="tabs tabs-border md:justify-end">
        {/* WOMEN */}
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Women"
          defaultChecked
        />

        <div className="tab-content pt-10">{renderSlider(womenProducts)}</div>

        {/* MEN */}
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Men" />

        <div className="tab-content pt-10">{renderSlider(menProducts)}</div>

        {/* KID */}
        <input type="radio" name="my_tabs_2" className="tab" aria-label="Kid" />

        <div className="tab-content pt-10">{renderSlider(kidProducts)}</div>
      </div>
    </div>
  );
};
