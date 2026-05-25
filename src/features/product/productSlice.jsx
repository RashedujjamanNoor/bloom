import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProducts } from "../../services/productService";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",

  async (_, thunkAPI) => {
    try {
      return await getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
