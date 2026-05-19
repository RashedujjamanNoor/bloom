import API from "../api/axios";

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

//CURRENT USER
export const currentUser = async () => {
  const response = await API.get("/auth/currentUser");

  return response.data;
};
