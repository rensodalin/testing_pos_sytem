// import React from "react";
// import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
// import { FaCircle } from "react-icons/fa";
// import { formatDateAndTime, getAvatarName } from "../../utils/index";

// const OrderCard = ({ key, order }) => {
//   console.log(order);
//   return (
//     <div key={key} className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
//       <div className="flex items-center gap-5">
//         <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
//           {getAvatarName(order.customerDetails.name)}
//         </button>
//         <div className="flex items-center justify-between w-[100%]">
//           <div className="flex flex-col items-start gap-1">
//             <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
//               {order.customerDetails.name}
//             </h1>
//             <p className="text-[#ababab] text-sm">#{Math.floor(new Date(order.orderDate).getTime())} / Dine in</p>
//             <p className="text-[#ababab] text-sm">Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {order.table.tableNo}</p>
//           </div>
//           <div className="flex flex-col items-end gap-2">
//             {order.orderStatus === "Ready" ? (
//               <>
//                 <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
//                   <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-sm">
//                   <FaCircle className="inline mr-2 text-green-600" /> Ready to
//                   serve
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
//                   <FaCircle className="inline mr-2" /> {order.orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-sm">
//                   <FaCircle className="inline mr-2 text-yellow-600" /> Preparing your order
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center mt-4 text-[#ababab]">
//         <p>{formatDateAndTime(order.orderDate)}</p>
//         <p>{order.items.length} Items</p>
//       </div>
//       <hr className="w-full mt-4 border-t-1 border-gray-500" />
//       <div className="flex items-center justify-between mt-4">
//         <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
//         <p className="text-[#f5f5f5] text-lg font-semibold">₹{order.bills.totalWithTax.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;
// import React from "react";
// import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";
// import { formatDateAndTime, getAvatarName } from "../../utils/index";

// const OrderCard = ({ key, order }) => {
//   if (!order) return null;

//   const customerName = order.customerDetails?.name || "Unknown Customer";
//   const tableNo = order.table?.tableNo || "N/A";
//   const totalWithTax = order.bills?.totalWithTax || 0;
//   const itemsCount = order.items?.length || 0;

//   return (
//     <div key={key} className="w-full bg-[#262626] p-3 sm:p-4 rounded-lg mb-4">
//       {/* Main Content - Mobile Stack, Desktop Side-by-side */}
//       <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
//         {/* Avatar */}
//         <button className="bg-[#f6b100] p-2 sm:p-3 text-lg sm:text-xl font-bold rounded-lg shrink-0">
//           {getAvatarName(customerName)}
//         </button>
        
//         {/* Content Container */}
//         <div className="flex flex-col sm:flex-row justify-between w-full gap-3 sm:gap-5">
//           {/* Left Side - Customer Info */}
//           <div className="flex flex-col items-start gap-1 flex-1">
//             <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold tracking-wide">
//               {customerName}
//             </h1>
//             <p className="text-[#ababab] text-xs sm:text-sm break-all">
//               #{Math.floor(new Date(order.orderDate).getTime())} / Dine in
//             </p>
//             <p className="text-[#ababab] text-xs sm:text-sm flex items-center gap-1">
//               Table <FaLongArrowAltRight className="text-[#ababab]" /> {tableNo}
//             </p>
//           </div>
          
//           {/* Right Side - Status */}
//           <div className="flex flex-col items-start sm:items-end gap-2">
//             {order.orderStatus === "Ready" ? (
//               <>
//                 <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg text-xs sm:text-sm">
//                   <FaCheckDouble className="inline mr-1 sm:mr-2" /> {order.orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-xs sm:text-sm">
//                   <FaCircle className="inline mr-1 sm:mr-2 text-green-600" /> Ready to serve
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg text-xs sm:text-sm">
//                   <FaCircle className="inline mr-1 sm:mr-2" /> {order.orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-xs sm:text-sm">
//                   <FaCircle className="inline mr-1 sm:mr-2 text-yellow-600" /> Preparing your order
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Footer Info */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2 sm:gap-0 text-[#ababab]">
//         <p className="text-xs sm:text-sm">{formatDateAndTime(order.orderDate)}</p>
//         <p className="text-xs sm:text-sm">{itemsCount} Items</p>
//       </div>
      
//       <hr className="w-full mt-3 sm:mt-4 border-t border-gray-500" />
      
//       {/* Total */}
//       <div className="flex items-center justify-between mt-3 sm:mt-4">
//         <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold">Total</h1>
//         <p className="text-[#f5f5f5] text-base sm:text-lg font-semibold">₹{totalWithTax.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;
import React from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";
import { getAvatarName, getBgColor } from "../../utils/index";

const OrderCard = ({ order }) => {
  if (!order) return null;

  const customerName = order.customer || "Unknown Customer";
  const tableNo = order.tableNo || "N/A";
  const total = order.total || 0;
  const itemsCount = order.items || 0;
  const orderId = order.id || "N/A";
  const dateTime = order.dateTime || "N/A";
  const status = order.status || "Unknown";

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
              #{orderId} / Dine in
            </p>
            <p className="text-[#ababab] text-xs sm:text-sm flex items-center gap-1">
              Table <FaLongArrowAltRight className="text-[#ababab]" /> {tableNo}
            </p>
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
    </div>
  );
};

export default OrderCard;