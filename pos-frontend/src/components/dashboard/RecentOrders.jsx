import React, { useEffect, useState } from "react";
import { getOrders } from "../../https";

// Utility function to format date safely
const formatDateAndTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log("Fetched orders:", response.data); // For debugging
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Table</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#333] hover:bg-[#2c2c2c]"
                >
                  <td className="p-3 text-sm">#{order.id}</td>
                  <td className="p-3 font-medium">{order.customer}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Ready"
                          ? "bg-green-600 text-white"
                          : order.status === "In Progress"
                          ? "bg-yellow-600 text-white"
                          : order.status === "Completed"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{order.guests}</td>
                  <td className="p-3 text-sm">{order.tableNo}</td>
                  <td className="p-3 text-sm">{order.phone}</td>
                  <td className="p-3 text-sm text-[#ababab]">
                    {formatDateAndTime(order.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-[#ababab]">
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
