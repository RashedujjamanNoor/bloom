import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDashboardStats,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct as updateProductService,
  getOrders,
  changeOrderStatus,
  removeOrder,
  getUsers,
  changeUserRole,
  removeUser,
  getAnalytics,
} from "../../services/adminService";

const initialState = {
  stats: null,

  orders: [],

  users: [],

  analytics: null,

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

//Get Analytics
export const fetchAnalytics = createAsyncThunk(
  "admin/fetchAnalytics",

  async (_, thunkAPI) => {
    try {
      return await getAnalytics();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

//Fetch All Users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",

  async (_, thunkAPI) => {
    try {
      return await getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

//Update User Role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",

  async ({ id, role }, thunkAPI) => {
    try {
      return await changeUserRole(id, role);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update role",
      );
    }
  },
);

//Delete User
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",

  async (id, thunkAPI) => {
    try {
      await removeUser(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  },
);

//Fetch All Orders
export const fetchOrders = createAsyncThunk(
  "admin/fetchOrders",

  async (_, thunkAPI) => {
    try {
      return await getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

//Update Order State
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",

  async ({ id, status }, thunkAPI) => {
    try {
      return await changeOrderStatus(id, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

//Cancel Order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",

  async (id, thunkAPI) => {
    try {
      await removeOrder(id);

      return id;
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

//Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",

  async ({ id, productData }, thunkAPI) => {
    try {
      return await updateProductService(id, productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update product",
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
        if (action.payload?.product) {
          state.products.unshift(action.payload.product);
        }
      })

      //Edit
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products = state.products.map((product) =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product,
        );
      })

      // DELETE PRODUCT SUCCESS
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      })

      // FETCH ORDERS
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      //Update Order

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order,
        );
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CANCEL ORDER
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload
            ? {
                ...order,
                orderStatus: "Cancelled",
              }
            : order,
        );
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.users;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // UPDATE USER ROLE
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user,
        );
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // FETCH ANALYTICS
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.analytics = action.payload.analytics;
      })

      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
