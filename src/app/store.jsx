import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import adminReducer from "../features/admin/adminSlice";
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    admin: adminReducer,
    auth: authReducer,
  },
});

export default store;
