import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRecentOrders } from "../../redux/slices/ordersSlice";
import { getOrders } from "../../https";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log("Fetched orders:", response); // ✅ For debugging
        setOrders(response); // 👈 store the fetched data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Type</th>
              <th className="p-3">Table</th>
              <th className="p-3">Total</th>
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
                  <td className="p-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.orderType === "online"
                          ? "bg-purple-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {order.orderType}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    {order.orderType === "online" ? "N/A" : order.tableNo}
                  </td>
                  <td className="p-3 font-semibold">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="p-3 text-sm text-[#ababab]">
                    {order.dateTime}
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
