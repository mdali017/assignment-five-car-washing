import React, { useState } from "react";
import { UserOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Md. Ali Hasan",
    email: "ali.hasan@example.com",
    phone: "+880 1234 567890",
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully");
  };

  let isPositive = true;

  const data = [
    { title: "Profit", amount: 240.94, percentage: 67.81, isPositive: true },
    { title: "Revenue", amount: 120.5, percentage: 34.27, isPositive: false },
    { title: "Revenue", amount: 120.5, percentage: 34.27, isPositive: false },
    { title: "Revenue", amount: 120.5, percentage: 34.27, isPositive: false },
  ];

  return (
    <div>
      {/* state management  */}

      <div className="flex items-center gap-20 shadow-xl bg-black py-5 px-5">
        {data?.map((item, idx) => (
          <article
            key={idx}
            className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6"
          >
            <div>
              <p className="text-sm text-gray-500">{item?.title}</p>
              <p className="text-2xl font-medium text-gray-900">
                ${item?.amount}
              </p>
            </div>
            <div
              className={`inline-flex gap-2 rounded p-1 ${
                isPositive
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={`M13 ${isPositive ? "7" : "17"}h8m0 0V${
                    isPositive ? "8" : "9"
                  }m0 ${isPositive ? "-1l-8 8-4-4-6 6" : "1l-8-8-4 4-6-6"}`}
                />
              </svg>
              <span className="text-xs font-medium">20%</span>
            </div>
          </article>
        ))}
      </div>

      {/* Profile Managemnt */}
      <div className="flex justify-center items-center  bg-gray-100">
        <div className="w-full  bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex justify-center items-center bg-blue-500 text-white rounded-full">
                <UserOutlined className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold">Profile Management</h2>
            </div>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`px-4 py-2 text-white font-semibold rounded-lg flex items-center space-x-2 transition-all ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isEditing ? <SaveOutlined /> : <EditOutlined />}
              <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-100 rounded-lg">
                  {profileData.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-100 rounded-lg">
                  {profileData.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="px-4 py-2 bg-gray-100 rounded-lg">
                  {profileData.phone}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
