import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";
import { registerCustomer } from "../../https";

const CustomerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    preferences: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePreferenceToggle = (preference) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerCustomer(formData);
      const { user, token } = response.data.data;
      dispatch(setUser({ ...user, token }));
      enqueueSnackbar("Customer registration successful!", { variant: "success" });
      navigate("/customer/dashboard");
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Registration failed!",
        { variant: "error" }
      );
    }
  };

  const preferenceOptions = [
    "Coffee",
    "Tea",
    "Desserts",
    "Snacks",
    "Vegetarian",
    "Spicy Food",
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#1f1f1f] rounded-lg">
      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full bg-transparent text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full bg-transparent text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full bg-transparent text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Delivery Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your delivery address"
          className="w-full bg-transparent text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full bg-transparent text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Food Preferences</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {preferenceOptions.map((pref) => (
            <button
              key={pref}
              type="button"
              onClick={() => handlePreferenceToggle(pref.toLowerCase())}
              className={`p-2 rounded-lg text-sm ${
                formData.preferences.includes(pref.toLowerCase())
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-[#1f1f1f] text-[#ababab]"
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
      >
        Create Customer Account
      </button>
    </form>
  );
};

export default CustomerRegister;
