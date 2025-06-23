// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { formatDate, getAvatarName } from "../../utils";

// const CustomerInfo = () => {
//   const [dateTime, setDateTime] = useState(new Date());
//   const customerData = useSelector((state) => state.customer);

//   return (
//     <div className="flex items-center justify-between px-4 py-3">
//       <div className="flex flex-col items-start">
//         <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
//           {customerData.customerName || "Customer Name"}
//         </h1>
//         <p className="text-xs text-[#ababab] font-medium mt-1">
//           #{customerData.orderId || "N/A"} / Dine in
//         </p>
//         <p className="text-xs text-[#ababab] font-medium mt-2">
//           {formatDate(dateTime)}
//         </p>
//       </div>
//       <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
//         {getAvatarName(customerData.customerName) || "CN"}
//       </button>
//     </div>
//   );
// };

// export default CustomerInfo;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const customerData = useSelector((state) => state.customer);

  return (
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-full">
      {/* Customer Details Section */}
      <div className="flex flex-col items-start flex-grow min-w-0 pr-3">
        {/* Customer Name */}
        <h1 className="text-sm sm:text-md lg:text-lg text-[#f5f5f5] font-semibold tracking-wide truncate w-full">
          {customerData.customerName || "Customer Name"}
        </h1>
        
        {/* Order ID and Dine Info */}
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-1 truncate w-full">
          <span className="font-mono">#{customerData.orderId || "N/A"}</span>
          <span className="mx-1 sm:mx-2">/</span>
          <span>Dine in</span>
        </p>
        
        {/* Date and Time */}
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-1 sm:mt-2">
          {formatDate(dateTime)}
        </p>
      </div>

      {/* Avatar Button */}
      <div className="flex-shrink-0">
        <button className="bg-[#f6b100] hover:bg-[#e6a000] active:bg-[#d69000] transition-colors p-2 sm:p-3 lg:p-4 text-base sm:text-lg lg:text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 min-w-[40px] min-h-[40px] sm:min-w-[48px] sm:min-h-[48px] lg:min-w-[56px] lg:min-h-[56px] flex items-center justify-center">
          <span className="text-black select-none">
            {getAvatarName(customerData.customerName) || "CN"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CustomerInfo;
