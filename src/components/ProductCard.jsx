import React from "react";
import { LuShoppingCart } from "react-icons/lu";
// import { useDispatch } from "react-redux";
// import { add } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ image, hoverImage, title, price, item }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleAddcart = (item) => {
  //   dispatch(
  //     add({
  //       ...item,
  //       selectedSize: item.sizes?.[0] || "",
  //       selectedColor: item.colors?.[0] || "",
  //     }),
  //   );
  // };

  const handleClick = () => {
    navigate(`/product/${item._id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleClick}
      className=" rounded-xl shadow-sm hover:shadow-md transition duration-300"
    >
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
      <div className="mt-1 text-left mx-2 pb-1">
        {title.length > 20 ? (
          <h3 className="text-sm font-medium">{title.slice(0, 20)}...</h3>
        ) : (
          <h3 className="text-sm font-medium">{title}</h3>
        )}

        <p className="text-xs">৳{price}</p>
      </div>
    </div>
  );
};
