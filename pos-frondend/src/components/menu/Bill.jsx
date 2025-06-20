// import React from "react";
// import { useSelector } from "react-redux";
// import { getTotalPrice } from "../../redux/slices/cartSlice";

// const Bill = () => {
//   const cartData = useSelector((state) => state.cart);
//   const total = useSelector(getTotalPrice);
//   const taxRate = 5.25;
//   const tax = (total * taxRate ) / 100;
//   const totalPriceWithTax = total + tax ;

//   return (
//     <>
//       <div className="flex items-center justify-between px-5 mt-2">
//       <p className="text-xs text-[#ababab] font-medium mt-2">Item({cartData.length})</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">${total.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">${tax.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Total with Tax</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">${totalPriceWithTax.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">
//           Cash
//         </button>
//         <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold">
//           Online
//         </button>
//       </div>
//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
//           Print Receipt
//         </button>
//         <button className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg">
//           Place Order
//         </button>
//       </div>
//     </>
//   );
// };

// export default Bill;

// import React from "react";
// import { useSelector } from "react-redux";
// import { getTotalPrice } from "../../redux/slices/cartSlice";

// const Bill = () => {
//   const cartData = useSelector((state) => state.cart);
//   const total = useSelector(getTotalPrice);
//   const taxRate = 5.25;
//   const tax = (total * taxRate) / 100;
//   const totalPriceWithTax = total + tax;

//   return (
//     <>
//       <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
//         <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Item({cartData.length})</p>
//         <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${total.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
//         <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
//         <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${tax.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
//         <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Total with Tax</p>
//         <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${totalPriceWithTax.toFixed(2)}</h1>
//       </div>
//       <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4">
//         <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base">
//           Cash
//         </button>
//         <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base">
//           Online
//         </button>
//       </div>
//       <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4 mb-6">
//         <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-sm sm:text-lg">
//           Print Receipt
//         </button>
//         <button className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-sm sm:text-lg">
//           Place Order
//         </button>
//       </div>
//     </>
//   );
// };

// export default Bill;
import React from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";

const Bill = () => {
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  return (
    <div className="pb-8 mb-4"> {/* Added wrapper with extra padding/margin */}
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Item({cartData.length})</p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${total.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-3 sm:px-5 mt-2">
        <p className="text-xs sm:text-sm text-[#ababab] font-medium mt-2">Total with Tax</p>
        <h1 className="text-[#f5f5f5] text-sm sm:text-base font-bold">${totalPriceWithTax.toFixed(2)}</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4">
        <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base">
          Cash
        </button>
        <button className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold text-sm sm:text-base">
          Online
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 px-3 sm:px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-sm sm:text-lg">
          Print Receipt
        </button>
        <button className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-sm sm:text-lg">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Bill;
