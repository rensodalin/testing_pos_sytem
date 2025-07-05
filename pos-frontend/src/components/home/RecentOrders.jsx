import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { useSelector } from "react-redux";
import { selectRecentOrders } from "../../redux/slices/ordersSlice";

const RecentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const recentOrders = useSelector(selectRecentOrders);

  // Filter orders based on search term
  const filteredOrders = recentOrders.filter(order =>
    order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>

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

        {/* Order list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              return <OrderList key={order.id} order={order} />;
            })
          ) : (
            <p className="col-span-3 text-gray-500 text-center py-8">
              {searchTerm ? "No orders found matching your search" : "No orders available"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
