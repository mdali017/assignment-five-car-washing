import React, { useState } from "react";
import { useUserRegistrationMutation } from "../../redux/api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [userRegistration] = useUserRegistrationMutation();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, phone, address } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !lastName || !email || !password || !phone || !address) {
      return "All fields are required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: validationError,
      });
      return;
    }

    const apiRequestBody = {
      body: {
        name: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
        },
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: "user",
        address: formData.address,
      },
    };

    try {
      const response = await userRegistration(apiRequestBody).unwrap(); // Use `.unwrap()` to handle errors properly
      if (response?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Registration successful!",
        });
        navigate("/");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.data?.message || "Registration failed.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="middleName" className="block text-gray-600 mb-2">
              Middle Name (Optional)
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-600 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
