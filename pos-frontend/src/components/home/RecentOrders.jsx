import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { getOrders } from "../../https";

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const fetchedOrders = Array.isArray(response.data)
        ? response.data
        : [];

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    }
  };

  // Load orders on mount and refresh every 10 seconds
  useEffect(() => {
    fetchOrders(); // initial load

    const intervalId = setInterval(() => {
      fetchOrders(); // auto-refresh every 10s
    }, 10000);

    return () => clearInterval(intervalId); // clean up
  }, []);

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toString().includes(searchTerm) ||
      order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="#" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] flex-1"
          />
          <button
            onClick={fetchOrders}
            className="text-sm text-blue-400 hover:text-blue-300 underline"
          >
            Refresh Orders
          </button>
        </div>

        {/* Orders list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderList key={order.id} order={order} />
            ))
          ) : (
            <p className="col-span-3 text-gray-500 text-center py-8">
              {searchTerm
                ? "No orders found matching your search"
                : "No orders available"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
