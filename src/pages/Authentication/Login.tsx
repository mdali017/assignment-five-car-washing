import React, { useState } from "react";
import { useUserLoginMutation } from "../../redux/api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await userLogin(formData).unwrap(); // Unwrap the response to handle errors properly

      if (response.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        Swal.fire("Success", "Login successful!", "success");
        navigate("/");
      }
    } catch (error: any) {
      // Capture error and display appropriate message
      // const errorMessage =
      //   error?.data?.message || "Login failed! Please check your credentials.";
      Swal.fire(
        "Error",
        "Login failed! Please check your credentials.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-6 rounded-md border my-16 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
        <p className="text-sm dark:text-gray-600">
          Sign in to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Don't have an account yet?
            <a
              rel="noopener noreferrer"
              href="#"
              className="hover:underline dark:text-violet-600"
            >
              Sign up
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
