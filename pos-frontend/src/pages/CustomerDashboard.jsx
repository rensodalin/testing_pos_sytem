import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHistory, FaMapMarkerAlt, FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import { MdRestaurantMenu, MdLocalOffer } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { enqueueSnackbar } from "notistack";
import { selectAllOrders } from "../redux/slices/ordersSlice";

const CustomerDashboard = () => {
  useEffect(() => {
    document.title = "Cafio | Customer Dashboard";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const allOrders = useSelector(selectAllOrders);

  // Find the customer's current order (most recent order for this customer)
  const currentOrder = allOrders.find(order => 
    order.customerId === userData._id && 
    order.status !== "Completed"
  );

  // Get customer's order history
  const customerOrders = allOrders
    .filter(order => order.customerId === userData._id)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  const [activeTab, setActiveTab] = useState("overview");

  const quickActions = [
    {
      title: "Browse Menu",
      icon: <MdRestaurantMenu size={24} />,
      action: () => navigate("/customer/menu"),
      color: "bg-blue-600"
    },
    {
      title: "Place Order",
      icon: <FaShoppingCart size={24} />,
      action: () => navigate("/customer/menu"),
      color: "bg-green-600"
    },
    {
      title: "Track Order",
      icon: <FaEye size={24} />,
      action: () => navigate("/customer/track"),
      color: "bg-purple-600",
      disabled: !currentOrder
    },
    {
      title: "My Profile",
      icon: <FaUser size={24} />,
      action: () => setActiveTab("profile"),
      color: "bg-orange-600"
    }
  ];

  const handleRateOrder = (orderId, rating) => {
    enqueueSnackbar(`Order ${orderId} rated ${rating} stars!`, { variant: "success" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "text-green-400";
      case "In Progress":
        return "text-yellow-400";
      case "Completed":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-[#1f1f1f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#f5f5f5]">Customer Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-semibold">
                {userData.loyaltyPoints} Points
              </span>
              <button
                onClick={() => navigate("/customer/auth")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Welcome Section */}
        <div className="bg-[#262626] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#f5f5f5] mb-2">
            Welcome back, {userData.name}!
          </h2>
          <p className="text-[#ababab]">
            You have {userData.loyaltyPoints} loyalty points. Keep ordering to earn more!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              disabled={action.disabled}
              className={`${action.color} text-white p-4 rounded-lg flex flex-col items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.title}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["overview", "history", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === tab
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-[#262626] text-[#ababab] hover:bg-[#333]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Current Order Status */}
            {currentOrder && (
              <div className="bg-[#262626] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Current Order</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#ababab]">Order #{currentOrder.id}</p>
                    <p className={`font-medium ${getStatusColor(currentOrder.status)}`}>
                      {currentOrder.status}
                    </p>
                    <p className="text-[#ababab] text-sm">
                      {currentOrder.items} items • ₹{currentOrder.total.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/customer/track")}
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            )}

            {/* Recent Orders */}
            <div className="bg-[#262626] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {customerOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-[#1f1f1f] rounded-lg">
                    <div>
                      <p className="text-[#f5f5f5] font-medium">#{order.id}</p>
                      <p className="text-[#ababab] text-sm">
                        {order.orderItems ? order.orderItems.map(item => item.name).join(", ") : `${order.items} items`}
                      </p>
                      <p className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-medium">₹{order.total.toFixed(2)}</p>
                      <p className="text-[#ababab] text-xs">{order.dateTime}</p>
                    </div>
                  </div>
                ))}
                {customerOrders.length === 0 && (
                  <p className="text-[#ababab] text-center py-4">No orders yet. Start ordering to see your history!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="bg-[#262626] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Order History</h3>
            <div className="space-y-4">
              {customerOrders.map((order) => (
                <div key={order.id} className="border border-[#333] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#f5f5f5] font-medium">#{order.id}</h4>
                    <span className="text-[#ababab] text-sm">{order.dateTime}</span>
                  </div>
                  <p className="text-[#ababab] mb-2">
                    {order.orderItems ? order.orderItems.map(item => item.name).join(", ") : `${order.items} items`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-medium">₹{order.total.toFixed(2)}</span>
                    <span className={`text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {customerOrders.length === 0 && (
                <p className="text-[#ababab] text-center py-8">No order history available.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-[#262626] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[#ababab] text-sm">Name</label>
                <p className="text-[#f5f5f5]">{userData.name}</p>
              </div>
              <div>
                <label className="text-[#ababab] text-sm">Email</label>
                <p className="text-[#f5f5f5]">{userData.email}</p>
              </div>
              <div>
                <label className="text-[#ababab] text-sm">Phone</label>
                <p className="text-[#f5f5f5]">{userData.phone}</p>
              </div>
              <div>
                <label className="text-[#ababab] text-sm">Address</label>
                <p className="text-[#f5f5f5]">{userData.address}</p>
              </div>
              <div>
                <label className="text-[#ababab] text-sm">Loyalty Points</label>
                <p className="text-yellow-400 font-medium">{userData.loyaltyPoints}</p>
              </div>
              <div>
                <label className="text-[#ababab] text-sm">Total Orders</label>
                <p className="text-[#f5f5f5]">{customerOrders.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard; 