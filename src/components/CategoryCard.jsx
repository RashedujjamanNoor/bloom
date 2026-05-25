import React from "react";
import { Link } from "react-router-dom";

export const CategoryCard = ({ title, image }) => {
  return (
    <Link to={`/category/${title}`}>
      <div className="py-4">
        <div className="rounded-sm bg-base-100 w-full drop-shadow-sm pb-2">
          <figure>
            <img className="rounded-sm" src={image} alt="Shoes" />
          </figure>
          <div>
            <p className="font-semibold mt-2">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
