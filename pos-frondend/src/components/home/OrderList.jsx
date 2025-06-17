import React from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";

const OrderList = ({ order }) => {
  return (
    <div className="flex items-center gap-5 mb-3 px-6 py-3">
      {/* Avatar or initials */}
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">AM</button>

      {/* Order Details */}
      <div className="flex items-center justify-between w-full">
        {/* Customer Info */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Ren Sodalin</h1>
          <p className="text-[#ababab] text-sm">8 Items</p>
        </div>

        {/* Table Info */}
        <div>
          <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">
            Table No: 3
          </h1>
        </div>

        {/* Status Info */}
        <div className="flex flex-col items-end gap-2">
          <p className="text-green-600">
            <FaCheckDouble className="inline mr-2" />
            Ready
          </p>
          <p className="text-[#ababab] text-sm">
            <FaCircle className="inline mr-2 text-green-600" />
            Ready to serve
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
