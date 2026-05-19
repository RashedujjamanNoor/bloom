import React, { useState } from "react";

import { loginUser, registerUser } from "../services/authService";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getCurrentUser, loginWithGoogle } from "../features/authSlice";

const ValidationItem = ({ valid, text }) => (
  <p
    className={`flex items-center gap-2 text-sm ${
      valid ? "text-primary" : "text-gray-500 dark:text-gray-400"
    }`}
  >
    <span>{valid ? "✅" : "⭕"}</span>

    {text}
  </p>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  // HANDLE INPUT
  const handleChange = ({ target }) =>
    setFormData({
      ...formData,

      [target.name]: target.value,
    });

  // VALIDATIONS
  const validations = {
    name: formData.name.length >= 4 && formData.name.length <= 20,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),

    length: formData.password.length >= 6,

    upper: /[A-Z]/.test(formData.password),

    lower: /[a-z]/.test(formData.password),

    number: /[0-9]/.test(formData.password),

    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  // FINAL VALIDATION
  const isValid =
    validations.email &&
    validations.length &&
    validations.upper &&
    validations.lower &&
    validations.number &&
    validations.special &&
    (isLogin || validations.name);

  // Previous Location
  const from = location.state?.from?.pathname || "/";

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    setLoading(true);

    try {
      let data;

      // LOGIN
      if (isLogin) {
        data = await loginUser({
          email: formData.email,

          password: formData.password,
        });
      }

      // REGISTER
      else {
        data = await registerUser({
          name: formData.name,

          email: formData.email,

          password: formData.password,
        });
      }

      // STORE TOKEN
      localStorage.setItem("token", data.token);

      // UPDATE REDUX AUTH STATE
      await dispatch(getCurrentUser());

      alert(`${isLogin ? "Login" : "Register"} Successful`);

      // RESET FORM
      setFormData({
        name: "",

        email: "",

        password: "",
      });

      navigate(from);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle());

    if (loginWithGoogle.fulfilled.match(result)) {
      navigate(from);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100 dark:bg-gray-900 transition duration-300">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transition duration-300">
          {/* TITLE */}
          <h1 className="text-3xl font-bold text-center mb-6 text-primary dark:text-white">
            {isLogin ? "Login" : "Register"}
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* NAME */}
            {!isLogin && (
              <div className="text-left">
                <label className="font-medium text-gray-700 dark:text-gray-200">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary"
                />

                <ValidationItem
                  valid={validations.name}
                  text="4 - 20 characters"
                />
              </div>
            )}

            {/* EMAIL */}
            <div className="text-left">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary"
              />

              {!isLogin && (
                <ValidationItem
                  valid={validations.email}
                  text="Valid email address"
                />
              )}
            </div>

            {/* PASSWORD */}
            <div className="text-left">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>

              <input
                type="password"
                autoComplete="current-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary"
              />

              {!isLogin && (
                <div className="mt-3 space-y-1">
                  <ValidationItem
                    valid={validations.length}
                    text="Minimum 6 characters"
                  />

                  <ValidationItem
                    valid={validations.upper}
                    text="One uppercase letter"
                  />

                  <ValidationItem
                    valid={validations.lower}
                    text="One lowercase letter"
                  />

                  <ValidationItem
                    valid={validations.number}
                    text="One number"
                  />

                  <ValidationItem
                    valid={validations.special}
                    text="One special character"
                  />
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 cursor-pointer
              
              ${
                isValid
                  ? "bg-primary hover:bg-secondary"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] w-full rounded-lg mt-2"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          {/* TOGGLE */}
          <p className="text-center mt-5 text-gray-700 dark:text-gray-300 text-xs">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-500 hover:text-blue-400 hover:underline cursor-pointer font-semibold transition"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
