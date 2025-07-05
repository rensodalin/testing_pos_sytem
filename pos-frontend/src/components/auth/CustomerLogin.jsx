import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";

const CustomerLogin = ({ setIsRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate customer login
    const customerData = {
      _id: 'customer_' + Date.now(),
      name: 'Customer User',
      email: formData.email,
      phone: '0000000000',
      role: 'customer',
      address: '123 Customer Street',
      preferences: ['coffee', 'desserts'],
      loyaltyPoints: 150
    };
    
    dispatch(setUser(customerData));
    enqueueSnackbar("Customer login successful!", { variant: "success" });
    navigate("/customer/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
        >
          Sign in as Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerLogin; 