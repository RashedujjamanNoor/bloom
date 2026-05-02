import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { add } from "../feature/cartSlice";

export const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartData);

  const handleRemove = (item) => {
    dispatch();
  };

  const handleAdd = (item) => {
    dispatch(add(item));
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative mr-4 ">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button ">
          <BsCart4 className="text-xl cursor-pointer" />
          <p className="absolute bottom-3 bg-black py-0.5 px-1 rounded-full text-xs left-4 font-bold">
            {cartData.totalItem}
          </p>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 min-h-full w-3/5 lg:w-1/4 p-4">
          {/* Sidebar content here */}
          <p>Shopping Cart</p>
          <hr className="my-4" />
          <div>
            {cartData.cartItem.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-center w-full p-2"
              >
                <div className="flex items-center gap-2">
                  <p>{index + 1}.</p>
                  <div className="text-left">
                    <p>{item.title}</p>
                    <p className="text-xs">Price: {item.price}</p>
                    <div className="mt-2">
                      <MdDeleteForever className="text-xl text-red-400" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={item.img}
                    alt="Cloth Image"
                    className="w-16 h-16 object-top object-cover rounded-xl"
                  />
                  <div className="bg-gray-700 flex justify-center items-center gap-4 text-[#8cc63f] px-2 rounded-full mt-2">
                    <button onClick={() => handleRemove(item)}>-</button>
                    {item.quantity}
                    <button onClick={() => handleAdd(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};
