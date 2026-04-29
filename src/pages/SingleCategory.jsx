import React from "react";
import mentData from "../assets/menCloth.js";
import { ProductCard } from "../components/ProductCard.jsx";

export const SingleCategory = () => {
  return (
    <div className="mt-4">
      <h2 className="text-left text-xs font-medium">Products</h2>
      <hr />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
        {mentData.map((item, index) => (
          <div key={index}>
            <ProductCard
              title={item.title}
              price={item.price}
              image={item.img}
              hoverImage={item.img2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
