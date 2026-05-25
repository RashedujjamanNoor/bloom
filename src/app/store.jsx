import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import adminReducer from "../features/admin/adminSlice";
import authReducer from "../features/authSlice";
import productReducer from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    admin: adminReducer,
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
