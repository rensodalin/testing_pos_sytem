import React from "react";
// import { GrUpdate } from "react-icons/gr";
// import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { enqueueSnackbar } from "notistack";
// import { getOrders, updateOrderStatus } from "../../https/index";
// import { formatDateAndTime } from "../../utils";

const mockOrders = [
  { id: "1", customer: "John Doe", status: "Pending", date: "2024-01-01" },
  { id: "2", customer: "Jane Smith", status: "Completed", date: "2024-01-02" },
];

const RecentOrders = () => {
  // All backend logic removed. Using mock data only.
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
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;

