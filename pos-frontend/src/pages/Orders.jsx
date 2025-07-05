import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { selectOrdersByStatus } from "../redux/slices/ordersSlice";

const Orders = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  // Get orders from Redux store
  const orders = useSelector((state) => selectOrdersByStatus(state, status));

  return (
    <section className="bg-[#1f1f1f] min-h-screen scrollbar-hide overflow-y-auto">
      {/* Header Section - Responsive */}
      <div className="sticky top-0 z-10 bg-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 gap-3 sm:gap-4 border-b border-[#383838]">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* Filter Buttons - Fully responsive */}
        <div className="flex overflow-x-auto sm:overflow-visible gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto scrollbar-hide">
          {["all", "In Progress", "Ready", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatus(type)}
              className={`text-[#ababab] text-xs sm:text-sm md:text-base ${
                status === type 
                  ? "bg-[#383838] text-white" 
                  : "hover:bg-[#2a2a2a] hover:text-white"
              } rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
                status === type ? "border-[#4a4a4a]" : "border-transparent"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "In Progress"
                ? "In Progress"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid - Responsive with proper spacing */}
      <div className="pb-20 lg:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-4 md:p-6 lg:p-8">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="w-full">
                <OrderCard order={order} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 lg:py-16">
              <div className="max-w-md mx-auto">
                <p className="text-gray-400 text-base sm:text-lg lg:text-xl font-medium">
                  No orders available
                </p>
                {status !== "all" && (
                  <p className="text-gray-500 text-sm sm:text-base mt-2">
                    No {status === "In Progress" ? "in progress" : status.toLowerCase()} orders found
                  </p>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => setStatus("all")}
                    className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                  >
                    View all orders
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </section>
  );
};

export default Orders;

