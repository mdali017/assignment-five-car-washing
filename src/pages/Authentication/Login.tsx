import React, { useState } from "react";
import { useUserLoginMutation } from "../../redux/api/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await userLogin(formData).unwrap();
      if (response.statusCode === 200) {
        const carWash = {
          user: response?.data?.user,
          token: response?.data?.token,
        };
        localStorage.setItem("carWash", JSON.stringify(carWash));
        if (response?.data?.user?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        Swal.fire("Success", "Login successful!", "success");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Login failed! Please check your credentials.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Sign in to access your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white font-semibold bg-violet-600 rounded-lg hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none dark:ring-offset-gray-800"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?
              <Link
                to="/auth/signup"
                className="text-violet-600 hover:underline ml-1"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="text-center mb-4 sm:mb-0">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">
                Admin Credentials
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Email:</span> info@gmail.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Password:</span> 123456
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">
                User Credentials
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Email:</span> info_01@gmail.com
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Password:</span> 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
