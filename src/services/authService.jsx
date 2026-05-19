import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";
import { googleLogin } from "./firebaseService/firebaseAuthService";

// LOGIN
export const loginUser = async (userData) => {
  const response = await API.post(
    "/auth/login",

    userData,
  );

  return response.data;
};

// REGISTER
export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",

    userData,
  );

  return response.data;
};

// //CURRENT USER
// export const currentUser = async () => {
//   const response = await API.get("/auth/currentUser");

//   return response.data;
// };

// //Firebase

// export const loginWithGoogle = createAsyncThunk(
//   "auth/loginWithGoogle",

//   async (_, thunkAPI) => {
//     try {
//       // Firebase Login
//       const firebaseUser = await googleLogin();

//       // Firebase ID Token
//       const firebaseToken = await firebaseUser.getIdToken();

//       // Send token to backend
//       const res = await API.post("/auth/firebase-login", {
//         token: firebaseToken,
//       });

//       // Store JWT
//       localStorage.setItem("token", res.data.token);

//       return res.data.user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message || "Google login failed");
//     }
//   },
// );
