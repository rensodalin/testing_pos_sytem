import React, { useState } from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaCircle, FaCreditCard, FaMoneyBillWave, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getAvatarName, getBgColor } from "../../utils/index";
import OrderActions from "./OrderActions";

const OrderCard = ({ order }) => {
  const [showActions, setShowActions] = useState(false);

  if (!order) return null;

  const customerName = order.customer || "Unknown Customer";
  const tableNo = order.orderType === "online" ? "N/A" : (order.tableNo || "N/A");
  const total = order.total || 0;
  const itemsCount = order.items || 0;
  const orderId = order.id || "N/A";
  const dateTime = order.dateTime || "N/A";
  const status = order.status || "Unknown";
  const paymentStatus = order.paymentStatus || "pending";
  const orderType = order.orderType || "dine-in";

  return (
    <div className="w-full bg-[#262626] p-3 sm:p-4 rounded-lg mb-4 hover:bg-[#2c2c2c] transition-colors">
      {/* Main Content - Mobile Stack, Desktop Side-by-side */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
        {/* Avatar */}
        <div 
          className="p-2 sm:p-3 text-lg sm:text-xl font-bold rounded-lg shrink-0 text-white"
          style={{ backgroundColor: getBgColor() }}
        >
          {getAvatarName(customerName)}
        </div>
                
        {/* Content Container */}
        <div className="flex flex-col sm:flex-row justify-between w-full gap-3 sm:gap-5">
          {/* Left Side - Customer Info */}
          <div className="flex flex-col items-start gap-1 flex-1">
            <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold tracking-wide">
              {customerName}
            </h1>
            <p className="text-[#ababab] text-xs sm:text-sm">
              #{orderId} / {orderType === "online" ? "Online Order" : "Dine in"}
            </p>
            <p className="text-[#ababab] text-xs sm:text-sm flex items-center gap-1">
              Table <FaLongArrowAltRight className="text-[#ababab]" /> {tableNo}
            </p>
            {/* Payment Status */}
            <div className="flex items-center gap-2 mt-1">
              {paymentStatus === "paid" ? (
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <FaCreditCard /> Paid
                </span>
              ) : (
                <span className="text-yellow-400 text-xs flex items-center gap-1">
                  <FaMoneyBillWave /> Pending
                </span>
              )}
            </div>
          </div>
                    
          {/* Right Side - Status */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            {status === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg text-xs sm:text-sm">
                  <FaCheckDouble className="inline mr-1 sm:mr-2" /> {status}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-green-600" /> Ready to serve
                </p>
              </>
            ) : status === "In Progress" ? (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2" /> {status}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-yellow-600" /> Preparing your order
                </p>
              </>
            ) : status === "Completed" ? (
              <>
                <p className="text-blue-600 bg-[#2e3a4a] px-2 py-1 rounded-lg text-xs sm:text-sm">
                  <FaCheckDouble className="inline mr-1 sm:mr-2" /> {status}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-blue-600" /> Order completed
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 bg-[#3a3a3a] px-2 py-1 rounded-lg text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2" /> {status}
                </p>
                <p className="text-[#ababab] text-xs sm:text-sm">
                  <FaCircle className="inline mr-1 sm:mr-2 text-gray-600" /> Status unknown
                </p>
              </>
            )}
          </div>
        </div>
      </div>
            
      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0 text-[#ababab]">
        <p className="text-xs sm:text-sm">{dateTime}</p>
        <p className="text-xs sm:text-sm">{itemsCount} Items</p>
      </div>
            
      <hr className="w-full mt-3 sm:mt-4 border-t border-gray-500" />
            
      {/* Total */}
      <div className="flex items-center justify-between mt-3 sm:mt-4">
        <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-base sm:text-lg font-semibold">₹{total.toFixed(2)}</p>
      </div>

      {/* Actions Toggle Button */}
      <div className="mt-4 pt-3 border-t border-[#333]">
        <button
          onClick={() => setShowActions(!showActions)}
          className="w-full flex items-center justify-center gap-2 text-[#ababab] hover:text-[#f5f5f5] transition-colors"
        >
          <span className="text-sm font-medium">Manage Order</span>
          {showActions ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </div>

      {/* Order Actions */}
      {showActions && <OrderActions order={order} />}
    </div>
  );
};

export default OrderCard;