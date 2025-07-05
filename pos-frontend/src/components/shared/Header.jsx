import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: () => {
      dispatch(removeUser());
      navigate("/auth");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      if (userData.isCustomer) {
        navigate("/customer/menu", { state: { search } });
      } else {
        navigate("/menu", { state: { search } });
      }
    }
  };

  const handleLogoClick = () => {
    if (userData.isCustomer) {
      navigate("/customer/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="bg-[#1a1a1a] w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
      {/* Logo Section */}
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={logo} alt="restro logo" className="h-8 w-8" />
        <h1 className="text-lg sm:text-xl font-semibold text-[#f5f5f5]">
          Cafio
        </h1>
        {userData.isCustomer && (
          <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-medium">
            Customer
          </span>
        )}
      </div>

      {/* Search Bar - Only show for admin */}
      {!userData.isCustomer && (
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ababab]" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#262626] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </form>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-[#f5f5f5] text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>

        {/* Dashboard Button - Only show for admin */}
        {!userData.isCustomer && (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#262626] text-[#f5f5f5] px-4 py-2 rounded-lg hover:bg-[#333] transition-colors flex items-center gap-2"
          >
            <MdDashboard />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        )}

        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-2xl sm:text-3xl" />
          <div className="flex flex-col leading-tight">
            <h1 className="text-sm sm:text-base text-[#f5f5f5] font-semibold">
              {userData.name || "TEST USER"}
            </h1>
            <p className="text-xs sm:text-sm text-[#ababab]">
              {userData.isCustomer ? "Customer" : userData.role || "Role"}
              {userData.isCustomer && userData.loyaltyPoints && (
                <span className="ml-2 text-yellow-400">
                  {userData.loyaltyPoints} pts
                </span>
              )}
            </p>
          </div>
          <IoLogOut
            onClick={handleLogout}
            className="text-[#f5f5f5] text-xl ml-2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

