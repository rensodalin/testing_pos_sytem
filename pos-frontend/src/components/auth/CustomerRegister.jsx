import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";

const CustomerRegister = ({ setIsRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    preferences: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate customer registration
    const customerData = {
      _id: 'customer_' + Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: 'customer',
      address: formData.address,
      preferences: formData.preferences,
      loyaltyPoints: 0
    };
    
    dispatch(setUser(customerData));
    enqueueSnackbar("Customer registration successful!", { variant: "success" });
    navigate("/customer/dashboard");
  };

  const preferenceOptions = [
    "Coffee", "Tea", "Desserts", "Snacks", "Vegetarian", "Spicy Food"
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Full Name
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Email Address
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Phone Number
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Delivery Address
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Password
          </label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Food Preferences
          </label>
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
    </div>
  );
};

export default CustomerRegister; 