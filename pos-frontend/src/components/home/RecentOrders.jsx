import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { getOrders } from "../../https";

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      console.log("API Response (RecentOrders):", response.data);

      // Handle backend response format: { success: true, data: [...] }
      const fetchedOrders = response.data?.success && Array.isArray(response.data.data)
        ? response.data.data
        : Array.isArray(response.data)
        ? response.data
        : [];

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      // Don't show error to user, just set empty orders
      setOrders([]);
    } finally {
      setLoading(false);
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
        </div>

        {/* Orders list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading orders...</p>
          ) : filteredOrders.length > 0 ? (
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
