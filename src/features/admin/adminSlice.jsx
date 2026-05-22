import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getProducts,
  createProduct,
  deleteProduct,
} from "../../services/adminService";

const initialState = {
  stats: null,

  products: [],

  loading: false,

  error: null,
};

// FETCH DASHBOARD STATS
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",

  async (_, thunkAPI) => {
    try {
      return await getDashboardStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

//Fetch Products
export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
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

//Add Product
export const addProduct = createAsyncThunk(
  "admin/addProduct",

  async (productData, thunkAPI) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product",
      );
    }
  },
);

//Delete Product
export const removeProduct = createAsyncThunk(
  "admin/removeProduct",

  async (id, thunkAPI) => {
    try {
      await deleteProduct(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //DASHBOARD PENDING
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      //DASHBOARD SUCCESS
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats;
      })

      //DASHBOARD ERROR
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // PRODUCTS PENDING
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      // PRODUCTS SUCCESS
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.products || action.payload;
      })

      // PRODUCTS ERROR
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ADD PRODUCT SUCCESS
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.product);
      })

      // DELETE PRODUCT SUCCESS
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      });
  },
});

export default adminSlice.reducer;
