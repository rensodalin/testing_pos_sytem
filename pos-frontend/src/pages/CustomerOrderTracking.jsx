import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { MdRestaurantMenu, MdLocalShipping } from "react-icons/md";
import { selectAllOrders } from "../redux/slices/ordersSlice";
import { enqueueSnackbar } from "notistack";

const CustomerOrderTracking = () => {
  useEffect(() => {
    document.title = "Cafio | Order Tracking";
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

  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const orderSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received and confirmed",
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      completed: true
    },
    {
      title: "Preparing",
      description: "Our chefs are preparing your delicious food",
      icon: <MdRestaurantMenu className="text-yellow-400" size={24} />,
      completed: currentOrder?.status === "In Progress" || currentOrder?.status === "Ready"
    },
    {
      title: "Ready for Pickup/Delivery",
      description: "Your order is ready!",
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      completed: currentOrder?.status === "Ready"
    },
    {
      title: currentOrder?.deliveryType === "delivery" ? "Out for Delivery" : "Ready for Pickup",
      description: currentOrder?.deliveryType === "delivery" 
        ? "Your order is on its way to you" 
        : "Please collect your order from the restaurant",
      icon: currentOrder?.deliveryType === "delivery" 
        ? <MdLocalShipping className="text-blue-500" size={24} />
        : <FaMapMarkerAlt className="text-blue-500" size={24} />,
      completed: currentOrder?.status === "Completed"
    }
  ];

  // Calculate current step based on order status
  useEffect(() => {
    if (!currentOrder) return;

    switch (currentOrder.status) {
      case "In Progress":
        setCurrentStep(1);
        break;
      case "Ready":
        setCurrentStep(2);
        break;
      case "Completed":
        setCurrentStep(3);
        break;
      default:
        setCurrentStep(0);
    }
  }, [currentOrder?.status]);

  // Calculate time remaining
  useEffect(() => {
    if (currentOrder?.estimatedTime) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const estimated = new Date(currentOrder.estimatedTime).getTime();
        const remaining = Math.max(0, estimated - now);
        setTimeRemaining(remaining);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentOrder?.estimatedTime]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleOrderComplete = () => {
    enqueueSnackbar("Order completed! Thank you for choosing Cafio!", { variant: "success" });
    navigate("/customer/dashboard");
  };

  if (!currentOrder) {
    return (
      <div className="bg-[#1f1f1f] min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="text-[#ababab] hover:text-yellow-400"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-[#f5f5f5]">Order Tracking</h1>
          </div>

          <div className="text-center py-12">
            <MdRestaurantMenu className="text-6xl text-[#ababab] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#f5f5f5] mb-2">No Active Order</h2>
            <p className="text-[#ababab] mb-6">You don't have any active orders to track.</p>
            <button
              onClick={() => navigate("/customer/menu")}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f1f] min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="text-[#ababab] hover:text-yellow-400"
            >
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-[#f5f5f5]">Order Tracking</h1>
          </div>
          <div className="text-right">
            <p className="text-[#ababab] text-sm">Order Status</p>
            <p className={`text-sm font-semibold ${
              currentOrder.status === "Ready" ? "text-green-400" :
              currentOrder.status === "In Progress" ? "text-yellow-400" :
              "text-blue-400"
            }`}>
              {currentOrder.status}
            </p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-[#262626] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-[#f5f5f5]">
                Order #{currentOrder.id}
              </h2>
              <p className="text-[#ababab]">
                {currentOrder.deliveryType === "delivery" ? "Delivery" : "Pickup"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 font-semibold text-lg">
                ₹{currentOrder.total.toFixed(2)}
              </p>
              <p className="text-[#ababab] text-sm">
                {currentOrder.items} items
              </p>
            </div>
          </div>

          {/* Estimated Time */}
          {timeRemaining > 0 && (
            <div className="bg-[#1f1f1f] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-yellow-400" size={20} />
                <div>
                  <p className="text-[#f5f5f5] font-medium">Estimated Time Remaining</p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="space-y-2">
            {currentOrder.orderItems && currentOrder.orderItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#1f1f1f] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#333] rounded-lg flex items-center justify-center">
                    <MdRestaurantMenu className="text-[#ababab]" size={16} />
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">{item.name}</p>
                    <p className="text-[#ababab] text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-yellow-400 font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-[#262626] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#f5f5f5] mb-6">Order Progress</h3>
          
          <div className="space-y-6">
            {orderSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Step Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? "bg-green-500" 
                    : index === currentStep 
                      ? "bg-yellow-400" 
                      : "bg-[#333]"
                }`}>
                  {index === currentStep && !step.completed ? (
                    <FaSpinner className="text-gray-900 animate-spin" size={20} />
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    step.completed || index === currentStep 
                      ? "text-[#f5f5f5]" 
                      : "text-[#ababab]"
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    step.completed || index === currentStep 
                      ? "text-[#ababab]" 
                      : "text-[#666]"
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Progress Line */}
                {index < orderSteps.length - 1 && (
                  <div className={`w-0.5 h-12 ml-6 ${
                    step.completed ? "bg-green-500" : "bg-[#333]"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        {currentOrder.deliveryType === "delivery" && (
          <div className="bg-[#262626] rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Delivery Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1" size={16} />
                <div>
                  <p className="text-[#f5f5f5] font-medium">Delivery Address</p>
                  <p className="text-[#ababab]">{currentOrder.deliveryAddress}</p>
                </div>
              </div>
              {currentOrder.deliveryInstructions && (
                <div className="flex items-start gap-3">
                  <FaClock className="text-yellow-400 mt-1" size={16} />
                  <div>
                    <p className="text-[#f5f5f5] font-medium">Special Instructions</p>
                    <p className="text-[#ababab]">{currentOrder.deliveryInstructions}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="flex-1 bg-[#333] text-[#f5f5f5] py-3 rounded-lg font-semibold hover:bg-[#444]"
          >
            Back to Dashboard
          </button>
          {currentOrder.status === "Ready" && (
            <button
              onClick={handleOrderComplete}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500"
            >
              Complete Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderTracking; 