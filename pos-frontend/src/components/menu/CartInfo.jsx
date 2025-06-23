// import React, { useEffect, useRef } from "react";
// import { RiDeleteBin2Fill } from "react-icons/ri";
// import { FaNotesMedical } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { removeItem } from "../../redux/slices/cartSlice";

// const CartInfo = () => {
//   const cartData = useSelector((state) => state.cart);
//   const scrolLRef = useRef();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if(scrolLRef.current){
//       scrolLRef.current.scrollTo({
//         top: scrolLRef.current.scrollHeight,
//         behavior: "smooth"
//       })
//     }
//   },[cartData]);

//   const handleRemove = (itemId) => {
//     dispatch(removeItem(itemId));
//   }

//   return (
//     <div className="px-4 py-2">
//       <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
//         Order Details
//       </h1>
//       <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]" ref={scrolLRef} >
//         {cartData.length === 0 ? (
//           <p className="text-[#ababab] text-sm flex justify-center items-center h-[380px]">Your cart is empty. Start adding items!</p>
//         ) : cartData.map((item) => {
//           return (
//             <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
//               <div className="flex items-center justify-between">
//                 <h1 className="text-[#ababab] font-semibold tracling-wide text-md">
//                   {item.name}
//                 </h1>
//                 <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
//               </div>
//               <div className="flex items-center justify-between mt-3">
//                 <div className="flex items-center gap-3">
//                   <RiDeleteBin2Fill
//                     onClick={() => handleRemove(item.id)}
//                     className="text-[#ababab] cursor-pointer"
//                     size={20}
//                   />
//                   <FaNotesMedical
//                     className="text-[#ababab] cursor-pointer"
//                     size={20}
//                   />
//                 </div>
//                 <p className="text-[#f5f5f5] text-md font-bold">₹{item.price}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CartInfo;
import React, { useEffect, useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 w-full">
      {/* Header */}
      <h1 className="text-base sm:text-lg lg:text-xl text-[#e4e4e4] font-semibold tracking-wide mb-3 sm:mb-4">
        Order Details
      </h1>

      {/* Cart Items Container */}
      <div 
        className="overflow-y-auto scrollbar-hide h-[320px] sm:h-[380px] lg:h-[420px] pr-1" 
        ref={scrollRef}
      >
        {cartData.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col justify-center items-center h-full text-center px-4">
            <p className="text-[#ababab] text-sm sm:text-base leading-relaxed">
              Your cart is empty.
              <br className="sm:hidden" />
              <span className="block sm:inline sm:ml-1">Start adding items!</span>
            </p>
          </div>
        ) : (
          /* Cart Items */
          cartData.map((item) => {
            return (
              <div 
                key={item.id} 
                className="bg-[#1f1f1f] hover:bg-[#252525] transition-colors rounded-lg px-3 sm:px-4 py-3 sm:py-4 mb-2 sm:mb-3 last:mb-0"
              >
                {/* Item Header - Name and Quantity */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h1 className="text-[#ababab] font-semibold tracking-wide text-sm sm:text-base flex-grow leading-tight pr-2">
                    {item.name}
                  </h1>
                  <span className="text-[#ababab] font-semibold text-sm sm:text-base flex-shrink-0 bg-[#2a2a2a] px-2 py-1 rounded text-center min-w-[2.5rem]">
                    x{item.quantity}
                  </span>
                </div>

                {/* Item Footer - Actions and Price */}
                <div className="flex items-center justify-between">
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#ababab] hover:text-red-400 cursor-pointer transition-colors p-1 hover:bg-[#2a2a2a] rounded"
                      aria-label="Remove item"
                    >
                      <RiDeleteBin2Fill size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <button
                      className="text-[#ababab] hover:text-blue-400 cursor-pointer transition-colors p-1 hover:bg-[#2a2a2a] rounded"
                      aria-label="Add notes"
                    >
                      <FaNotesMedical size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-[#f5f5f5] text-sm sm:text-base lg:text-lg font-bold">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
