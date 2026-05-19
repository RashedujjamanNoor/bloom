import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDashboardStats } from "../../services/adminService";

const initialState = {
  stats: null,

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

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      // SUCCESS
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats;
      })

      // ERROR
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
