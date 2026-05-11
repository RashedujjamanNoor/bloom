import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { add, deleteOne, remove } from "../feature/cartSlice";
import { Link } from "react-router-dom";

export const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartData);

  const handleDeleteOne = (item) => {
    dispatch(deleteOne(item));
  };

  const handleAdd = (item) => {
    dispatch(add(item));
  };

  const handleRemove = (item) => {
    dispatch(remove(item));
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative mr-4 ">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="drawer-button ">
          <BsCart4 className="text-xl cursor-pointer" />
          <p className="absolute bottom-3  py-0.5 px-1 rounded-full text-xs left-4 font-bold">
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
            {cartData.cartItem.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-2 w-full p-2"
              >
                <div className="flex items-center gap-2 w-full order-2">
                  <div className="text-left w-full">
                    <p>{item.title}</p>
                    <p className="text-xs">Price: {item.price}</p>
                  </div>
                  <div className="mt-2">
                    <MdDeleteForever
                      className="text-2xl text-red-400 cursor-pointer hover:text-red-300"
                      onClick={() => handleRemove(item)}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={item.img}
                    alt="Cloth Image"
                    className="w-16 h-16 object-top object-cover rounded-xl"
                  />
                  <div className="bg-gray-700 flex justify-center items-center gap-4 text-[#8cc63f] px-2 rounded-full mt-2">
                    <button
                      onClick={() => handleDeleteOne(item)}
                      className="hover:text-green-100 cursor-pointer"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleAdd(item)}
                      className="hover:text-green-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="text-primary my-2" />
          <p className="text-left font-extralight">
            Total Price: {cartData.totalAmount}
          </p>
          <Link
            to="/checkout"
            className="mt-4 bg-primary hover:bg-secondary duration-200 py-3 rounded-2xl font-semibold cursor-pointer active:scale-95"
          >
            Checkout
          </Link>
        </ul>
        <div></div>
      </div>
    </div>
  );
};
