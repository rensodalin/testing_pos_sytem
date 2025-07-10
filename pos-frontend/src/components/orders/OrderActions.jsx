
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCheck, FaTimes, FaEdit, FaCreditCard } from "react-icons/fa";
import { updateOrderStatus, updatePaymentStatus, completeOrder } from "../../redux/slices/ordersSlice";
import { enqueueSnackbar } from "notistack";

const OrderActions = ({ order }) => {
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = (newStatus) => {
    setIsUpdating(true);
    
    setTimeout(() => {
      dispatch(updateOrderStatus({ orderId: order.id, status: newStatus }));
      enqueueSnackbar(`Order status updated to ${newStatus}`, { variant: "success" });
      setIsUpdating(false);
    }, 500);
  };

  const handlePaymentUpdate = (paymentStatus) => {
    setIsUpdating(true);
    
    setTimeout(() => {
      dispatch(updatePaymentStatus({ orderId: order.id, paymentStatus }));
      enqueueSnackbar(`Payment status updated to ${paymentStatus}`, { variant: "success" });
      setIsUpdating(false);
    }, 500);
  };

  const handleCompleteOrder = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      dispatch(completeOrder({ orderId: order.id }));
      enqueueSnackbar("Order marked as completed", { variant: "success" });
      setIsUpdating(false);
    }, 500);
  };

  return (
    <div className="mt-4 p-3 bg-[#1f1f1f] rounded-lg">
      <h4 className="text-[#f5f5f5] font-medium mb-3">Order Actions</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Status Actions */}
        <div className="space-y-2">
          <h5 className="text-[#ababab] text-sm font-medium">Update Status</h5>
          <div className="flex flex-wrap gap-2">
            {order.status !== "In Progress" && (
              <button
                onClick={() => handleStatusUpdate("In Progress")}
                disabled={isUpdating}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 disabled:opacity-50"
              >
                <FaEdit className="inline mr-1" />
                In Progress
              </button>
            )}
            {order.status !== "Ready" && (
              <button
                onClick={() => handleStatusUpdate("Ready")}
                disabled={isUpdating}
                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
              >
                <FaCheck className="inline mr-1" />
                Ready
              </button>
            )}
            {order.status !== "Completed" && (
              <button
                onClick={handleCompleteOrder}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
              >
                <FaCheck className="inline mr-1" />
                Complete
              </button>
            )}
          </div>
        </div>

        {/* Payment Actions */}
        <div className="space-y-2">
          <h5 className="text-[#ababab] text-sm font-medium">Payment Status</h5>
          <div className="flex flex-wrap gap-2">
            {order.paymentStatus === "pending" && (
              <button
                onClick={() => handlePaymentUpdate("paid")}
                disabled={isUpdating}
                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 disabled:opacity-50"
              >
                <FaCreditCard className="inline mr-1" />
                Mark Paid
              </button>
            )}
            {order.paymentStatus === "paid" && (
              <button
                onClick={() => handlePaymentUpdate("pending")}
                disabled={isUpdating}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 disabled:opacity-50"
              >
                <FaTimes className="inline mr-1" />
                Mark Pending
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="mt-4 pt-3 border-t border-[#333]">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[#ababab]">Order Type:</span>
            <span className="text-[#f5f5f5] ml-2 capitalize">{order.orderType}</span>
          </div>
          <div>
            <span className="text-[#ababab]">Payment Method:</span>
            <span className="text-[#f5f5f5] ml-2 capitalize">{order.paymentMethod}</span>
          </div>
          {order.deliveryType && (
            <div>
              <span className="text-[#ababab]">Delivery Type:</span>
              <span className="text-[#f5f5f5] ml-2 capitalize">{order.deliveryType}</span>
            </div>
          )}
          {order.deliveryAddress && (
            <div>
              <span className="text-[#ababab]">Address:</span>
              <span className="text-[#f5f5f5] ml-2 text-xs">{order.deliveryAddress}</span>
            </div>
          )}
        </div>
        
        {/* Order Items */}
        {order.orderItems && order.orderItems.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#333]">
            <h5 className="text-[#ababab] text-sm font-medium mb-2">Order Items</h5>
            <div className="space-y-1">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-[#f5f5f5]">{item.name} x{item.quantity}</span>
                  <span className="text-[#ababab]">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderActions; 
