import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cartItem =
  localStorage.getItem("cartItem") !== null
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];

const totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
const totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
const totalItem = JSON.parse(localStorage.getItem("totalItem"));

const initialState = {
  cartItem,
  totalItem,
  totalAmount,
  totalQuantity,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItem.find(
        (item) => item.id === newItem.id,
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItem.push(action.payload);
        newItem.quantity = 1;
        newItem.singleTotal = newItem.price;
        state.totalItem++;
      } else {
        existingItem.quantity++;
        existingItem.singleTotal = existingItem.price * existingItem.quantity;
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity),
      );
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
    },

    deleteOne(state, action) {
      const id = action.payload.id;

      const existingId = state.cartItem.find((item) => item.id === id);

      if (existingId.quantity == 1) {
        state.totalQuantity--;
        state.totalAmount = state.totalAmount - existingId.price;
        state.totalItem--;
        state.cartItem = state.cartItem.filter((item) => item.id !== id);
      } else {
        state.totalQuantity--;
        existingId.quantity--;
        state.totalAmount = state.totalAmount - existingId.price;
        existingId.singleTotal = existingId.singleTotal - existingId.price;
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity),
      );
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
    },

    remove(state, action) {
      const newItem = action.payload;
      const existingId = state.cartItem.find((item) => item.id === newItem.id);

      state.totalQuantity = state.totalQuantity - newItem.quantity;
      state.totalItem--;

      if (existingId) {
        state.cartItem = state.cartItem.filter(
          (item) => item.id !== newItem.id,
        );
      } else {
        console.log("not exist");
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity),
      );
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
      localStorage.setItem("totalItem", JSON.stringify(state.totalItem));
    },
  },
});

export const { add, deleteOne, remove } = cartSlice.actions;

export default cartSlice;
