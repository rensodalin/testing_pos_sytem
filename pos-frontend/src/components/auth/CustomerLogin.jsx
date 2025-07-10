import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { enqueueSnackbar } from "notistack";
import { loginCustomer } from "../../https"; // Make sure this is imported

const CustomerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginCustomer(formData);
      const { user, token } = response.data.data;
      // Convert id to _id for consistency with frontend
      const userData = { ...user, _id: user.id, token };
      dispatch(setUser(userData));
      enqueueSnackbar("Customer login successful!", { variant: "success" });
      navigate("/customer/dashboard");
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Login failed!",
        { variant: "error" }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#1f1f1f] rounded-lg">
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

      <button
        type="submit"
        className="w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold"
      >
        Sign in as Customer
      </button>
    </form>
  );
};

export default CustomerLogin;
