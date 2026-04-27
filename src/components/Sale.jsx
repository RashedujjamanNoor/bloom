import React from "react";
import sale1 from "../assets/sale/sale1.webp";
import sale2 from "../assets/sale/sale2.webp";
import sale3 from "../assets/sale/sale3.webp";
import sale4 from "../assets/sale/sale4.webp";
import sale5 from "../assets/sale/sale5.webp";
import sale6 from "../assets/sale/sale6.webp";
import sale7 from "../assets/sale/sale7.webp";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const sale = [sale1, sale2, sale3, sale4, sale5, sale6, sale7];

export const Sale = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold">Sale</h2>
      <div className="md:flex justify-center items-center hidden">
        <div>
          <img src={sale1} alt="KIDS IMAGE" />
        </div>
        <div>
          <div>
            <img src={sale2} alt="" />
          </div>
          <div>
            <img src={sale3} alt="" />
          </div>
        </div>
        <div>
          <img src={sale4} alt="" />
        </div>
        <div>
          <div>
            <img src={sale5} alt="" />
          </div>
          <div>
            <img src={sale6} alt="" />
          </div>
        </div>
        <div>
          <img src={sale7} alt="" />
        </div>
      </div>
      <div className="mt-4 md:hidden">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1.9, // small phones
            },
            480: {
              slidesPerView: 2, // bigger phones
            },
            768: {
              slidesPerView: 3, // tablets
            },
            1024: {
              slidesPerView: 4, // laptop
            },
            1280: {
              slidesPerView: 5, // desktop
            },
          }}
        >
          {sale.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={item}
                  alt=""
                  className="h-60 w-full object-cover object-top rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
