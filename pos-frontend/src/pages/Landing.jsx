import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import { FaUserTie, FaUser } from "react-icons/fa";

const Landing = () => {
  useEffect(() => {
    document.title = "Cafio | Welcome";
  }, []);

  const navigate = useNavigate();
  const { isAuth, isCustomer } = useSelector((state) => state.user);

  // Only redirect if user is already authenticated
  useEffect(() => {
    if (isAuth) {
      if (isCustomer) {
        navigate("/customer/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuth, isCustomer, navigate]);

  const handleAdminAccess = () => {
    navigate("/auth");
  };

  const handleCustomerAccess = () => {
    navigate("/customer/auth");
  };

  // Don't render if user is authenticated (they will be redirected)
  if (isAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Left Section - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src={restaurant} 
          alt="Restaurant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to Cafio</h1>
            <p className="text-xl text-gray-300 max-w-md">
              Experience the finest coffee and cuisine with our modern POS system
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Access Options */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-12">
            <img src={logo} alt="Cafio Logo" className="h-20 w-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Cafio</h1>
            <p className="text-[#ababab]">Choose your access type</p>
          </div>

          {/* Access Options */}
          <div className="space-y-6">
            {/* Admin Access */}
            <button
              onClick={handleAdminAccess}
              className="w-full bg-[#262626] hover:bg-[#333] text-[#f5f5f5] p-6 rounded-lg border border-[#333] hover:border-yellow-400 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-gray-900 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <FaUserTie size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Staff Access</h3>
                  <p className="text-[#ababab] text-sm">
                    For restaurant staff, managers, and administrators
                  </p>
                </div>
              </div>
            </button>

            {/* Customer Access */}
            <button
              onClick={handleCustomerAccess}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-6 rounded-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <FaUser size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">Customer Access</h3>
                  <p className="text-gray-700 text-sm">
                    Browse menu, place orders, and track deliveries
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 text-center">
            <h3 className="text-[#f5f5f5] font-semibold mb-4">What's New?</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#262626] p-3 rounded-lg">
                <p className="text-yellow-400 font-medium">Customer Portal</p>
                <p className="text-[#ababab]">Order online & track deliveries</p>
              </div>
              <div className="bg-[#262626] p-3 rounded-lg">
                <p className="text-yellow-400 font-medium">Loyalty Points</p>
                <p className="text-[#ababab]">Earn rewards with every order</p>
              </div>
              <div className="bg-[#262626] p-3 rounded-lg">
                <p className="text-yellow-400 font-medium">Real-time Tracking</p>
                <p className="text-[#ababab]">Track your order status</p>
              </div>
              <div className="bg-[#262626] p-3 rounded-lg">
                <p className="text-yellow-400 font-medium">Easy Payments</p>
                <p className="text-[#ababab]">Multiple payment options</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-[#666] text-sm">
            <p>© 2024 Cafio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 