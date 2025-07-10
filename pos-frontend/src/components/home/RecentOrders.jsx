import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { getOrders } from "../../https"; // ✅ Assumes Axios is used here

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log("Fetched orders:", response);

        // ✅ If you're using Axios, the actual data is in response.data
        const fetchedOrders = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]); // fallback to empty array
      }
    };

    fetchOrders();
  }, []);

  // ✅ Filter orders based on search input
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

        {/* Search Input */}
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

        {/* Filtered Orders List */}
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
