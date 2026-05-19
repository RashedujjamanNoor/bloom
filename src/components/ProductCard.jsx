import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { add } from "../features/cartSlice";

export const ProductCard = ({ image, hoverImage, title, price, item }) => {
  const dispatch = useDispatch();

  const handleAddcart = (item) => {
    dispatch(add(item));
  };

  return (
    <div className=" rounded-xl shadow-sm hover:shadow-md transition duration-300">
      {/* Image Wrapper */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg group">
        {/* Main Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full rounded-xl object-cover absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Hover Image */}
        <img
          src={hoverImage}
          alt={title}
          className="w-full h-full rounded-xl object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Add to Cart Button */}
      <div
        onClick={() => handleAddcart(item)}
        className="flex justify-end mt-2 mr-2"
      >
        <button className="bg-black text-white text-xs px-3 py-1 rounded-md hover:bg-gray-800 flex items-center justify-center gap-1 cursor-pointer">
          <LuShoppingCart className="text-md " />
          Add to Cart
        </button>
      </div>

      {/* Title + Price */}
      <div className="mt-1 text-left mx-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs">৳{price}</p>
      </div>
    </div>
  );
};
