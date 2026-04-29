import React from "react";
import { BsCart4 } from "react-icons/bs";

export const Cart = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative mr-4 ">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button ">
          <BsCart4 className="text-xl cursor-pointer" />
          <p className="absolute bottom-3 bg-black py-0.5 px-1 rounded-full text-xs left-4 font-bold">
            0
          </p>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-1/4 p-4">
          {/* Sidebar content here */}
          <p>Shopping Cart</p>
          <hr className="my-4" />
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
