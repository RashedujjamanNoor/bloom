import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { add } = cartSlice.actions;

export default cartSlice;
