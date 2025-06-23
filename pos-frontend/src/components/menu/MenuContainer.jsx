// import React, { useState } from "react";
// import { menus } from "../../constants";
// import { GrRadialSelected } from "react-icons/gr";
// import { FaShoppingCart } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { addItems } from "../../redux/slices/cartSlice";


// const MenuContainer = () => {
//   const [selected, setSelected] = useState(menus[0]);
//   const [itemCount, setItemCount] = useState(0);
//   const [itemId, setItemId] = useState();
//   const dispatch = useDispatch();

//   const increment = (id) => {
//     setItemId(id);
//     if (itemCount >= 4) return;
//     setItemCount((prev) => prev + 1);
//   };

//   const decrement = (id) => {
//     setItemId(id);
//     if (itemCount <= 0) return;
//     setItemCount((prev) => prev - 1);
//   };

//   const handleAddToCart = (item) => {
//     if(itemCount === 0) return;

//     const {name, price} = item;
//     const newObj = { id: new Date(), name, pricePerQuantity: price, quantity: itemCount, price: price * itemCount };

//     dispatch(addItems(newObj));
//     setItemCount(0);
//   }


//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
//         {menus.map((menu) => {
//           return (
//             <div
//               key={menu.id}
//               className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
//               style={{ backgroundColor: menu.bgColor }}
//               onClick={() => {
//                 setSelected(menu);
//                 setItemId(0);
//                 setItemCount(0);
//               }}
//             >
//               <div className="flex items-center justify-between w-full">
//                 <h1 className="text-[#f5f5f5] text-lg font-semibold">
//                   {menu.icon} {menu.name}
//                 </h1>
//                 {selected.id === menu.id && (
//                   <GrRadialSelected className="text-white" size={20} />
//                 )}
//               </div>
//               <p className="text-[#ababab] text-sm font-semibold">
//                 {menu.items.length} Items
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <hr className="border-[#2a2a2a] border-t-2 mt-4" />

//       <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
//         {selected?.items.map((item) => {
//           return (
//             <div
//               key={item.id}
//               className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
//             >
//               <div className="flex items-start justify-between w-full">
//                 <h1 className="text-[#f5f5f5] text-lg font-semibold">
//                   {item.name}
//                 </h1>
//                 <button onClick={() => handleAddToCart(item)} className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"><FaShoppingCart size={20} /></button>
//               </div>
//               <div className="flex items-center justify-between w-full">
//                 <p className="text-[#f5f5f5] text-xl font-bold">
//                   ₹{item.price}
//                 </p>
//                 <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6 w-[50%]">
//                   <button
//                     onClick={() => decrement(item.id)}
//                     className="text-yellow-500 text-2xl"
//                   >
//                     &minus;
//                   </button>
//                   <span className="text-white">
//                     {itemId == item.id ? itemCount : "0"}
//                   </span>
//                   <button
//                     onClick={() => increment(item.id)}
//                     className="text-yellow-500 text-2xl"
//                   >
//                     &#43;
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default MenuContainer;
import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 4) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <>
      {/* Menu Categories Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-4 w-full">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-3 sm:p-4 rounded-lg h-[90px] sm:h-[100px] cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelected(menu);
                setItemId(0);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold flex items-center gap-2">
                  <span className="text-sm sm:text-base">{menu.icon}</span>
                  <span className="truncate">{menu.name}</span>
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white flex-shrink-0" size={18} />
                )}
              </div>
              <p className="text-[#ababab] text-xs sm:text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* Menu Items Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-4 w-full">
        {selected?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-3 sm:p-4 rounded-lg h-[140px] sm:h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a] transition-colors"
            >
              <div className="flex items-start justify-between w-full mb-2">
                <h1 className="text-[#f5f5f5] text-base sm:text-lg font-semibold flex-grow pr-2 leading-tight">
                  {item.name}
                </h1>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg hover:bg-[#3a5a50] transition-colors flex-shrink-0"
                >
                  <FaShoppingCart size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between w-full mt-auto">
                <p className="text-[#f5f5f5] text-lg sm:text-xl font-bold">
                  ₹{item.price}
                </p>
                
                {/* Quantity Controls - Responsive */}
                <div className="flex items-center justify-between bg-[#1f1f1f] px-2 sm:px-2 py-2 sm:py-3 rounded-lg gap-2 sm:gap-6 min-w-[100px] sm:min-w-[120px]">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-500 text-xl sm:text-2xl hover:text-yellow-400 transition-colors w-6 h-6 flex items-center justify-center"
                  >
                    &minus;
                  </button>
                  <span className="text-white font-medium min-w-[20px] text-center">
                    {itemId == item.id ? itemCount : "0"}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-500 text-xl sm:text-2xl hover:text-yellow-400 transition-colors w-6 h-6 flex items-center justify-center"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
