import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/axios.js";
import { createOrder } from "../../services/orderService";

// CREATE ORDER
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, thunkAPI) => {
    try {
      return await createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },
);

// GET MY ORDERS
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",

  async (_, thunkAPI) => {
    try {
      const res = await API.get("/orders/my-orders");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

// CANCEL ORDER
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",

  async (orderId, thunkAPI) => {
    try {
      const res = await API.put(`/orders/cancel/${orderId}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // PLACE ORDER
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload.order) {
          state.orders.unshift(action.payload.order);
        }
      })

      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH MY ORDERS
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders || action.payload || [];
      })

      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CANCEL ORDER
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;

        const updatedOrder = action.payload.order || action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
