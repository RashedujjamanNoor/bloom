import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../api/axios";

import { googleLogin } from "../services/firebaseService/firebaseAuthService";

// GET CURRENT USER

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",

  async (_, thunkAPI) => {
    try {
      const res = await API.get("/auth/currentUser");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get user",
      );
    }
  },
);

// GOOGLE LOGIN

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",

  async (_, thunkAPI) => {
    try {
      // Firebase Login
      const firebaseUser = await googleLogin();

      // Firebase Token
      const firebaseToken = await firebaseUser.getIdToken();

      // Backend Verify
      const res = await API.post("/auth/firebase-login", {
        token: firebaseToken,
      });

      // Store JWT
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// INITIAL STATE

const initialState = {
  user: null,

  loading: false,

  error: null,

  isAuthenticated: false,
};

// SLICE

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;

      state.isAuthenticated = false;

      state.error = null;

      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET CURRENT USER

      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;

        state.user = null;

        state.isAuthenticated = false;

        state.error = action.payload;
      })

      // GOOGLE LOGIN

      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
