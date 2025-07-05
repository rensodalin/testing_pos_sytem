import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/slices/ordersSlice";
import { enqueueSnackbar } from "notistack";

const StaffOrderForm = ({ onClose, selectedItems, total, onSubmit }) => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!customerData.customerName) {
      enqueueSnackbar("Please set up customer information first", { variant: "warning" });
      return;
    }

    if (!customerData.table?.tableNo) {
      enqueueSnackbar("Please assign a table to the customer first", { variant: "warning" });
      return;
    }

    const orderData = {
      customer: customerData.customerName,
      customerPhone: customerData.customerPhone,
      items: selectedItems,
      total: total,
      orderType: "dine-in",
      paymentStatus: paymentStatus,
      tableNo: customerData.table.tableNo,
      status: paymentStatus === "paid" ? "Ready" : "In Progress"
    };

    // If onSubmit callback is provided, use it; otherwise dispatch directly
    if (onSubmit) {
      onSubmit(orderData);
    } else {
      dispatch(addOrder(orderData));
      enqueueSnackbar("Order created successfully!", { variant: "success" });
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#262626] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">Create Dine-in Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Information Display */}
          <div className="bg-[#1f1f1f] p-3 rounded-lg">
            <h3 className="text-[#f5f5f5] font-medium mb-2">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#ababab]">
                <span>Name:</span>
                <span className="text-[#f5f5f5]">{customerData.customerName || "Not set"}</span>
              </div>
              <div className="flex justify-between text-[#ababab]">
                <span>Phone:</span>
                <span className="text-[#f5f5f5]">{customerData.customerPhone || "Not set"}</span>
              </div>
              <div className="flex justify-between text-[#ababab]">
                <span>Table:</span>
                <span className="text-[#f5f5f5]">{customerData.table?.tableNo || "Not assigned"}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <label className="text-[#ababab] text-sm mb-2 block">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full bg-[#1f1f1f] text-white p-3 rounded-lg border border-[#333] focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="bg-[#1f1f1f] p-3 rounded-lg">
            <h3 className="text-[#f5f5f5] font-medium mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#ababab]">
                <span>Items:</span>
                <span>{selectedItems.length}</span>
              </div>
              <div className="flex justify-between text-[#f5f5f5] font-semibold">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#1f1f1f] text-[#ababab] py-3 rounded-lg hover:bg-[#333] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffOrderForm; 