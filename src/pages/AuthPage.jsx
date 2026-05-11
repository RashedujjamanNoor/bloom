import React, { useState } from "react";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Detect system theme

  // Handle input
  const handleChange = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  // Validations
  const validations = {
    name: formData.name.length >= 4 && formData.name.length <= 20,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),

    length: formData.password.length >= 6,

    upper: /[A-Z]/.test(formData.password),

    lower: /[a-z]/.test(formData.password),

    number: /[0-9]/.test(formData.password),

    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  // Final validation
  const isValid =
    validations.email &&
    validations.length &&
    validations.upper &&
    validations.lower &&
    validations.number &&
    validations.special &&
    (isLogin || validations.name);

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    alert(`${isLogin ? "Login" : "Registration"} Successful`);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100 dark:bg-gray-900 transition duration-300">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 transition duration-300">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-6 text-primary dark:text-white">
            {isLogin ? "Login" : "Register"}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {/* Name */}
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

            {/* Email */}
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

              {/* Show email validation only in Register page */}
              {!isLogin && (
                <ValidationItem
                  valid={validations.email}
                  text="Valid email address"
                />
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary"
              />

              {/* Show validations only in Register page */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 cursor-pointer ${
                isValid
                  ? "bg-primary hover:bg-secondary"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* Toggle */}
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
