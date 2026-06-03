import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import adminReducer from "../features/admin/adminSlice";
import authReducer from "../features/authSlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    admin: adminReducer,
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;
