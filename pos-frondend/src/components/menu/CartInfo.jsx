import React from 'react';
import { FaNotesMedical } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const CartInfo = () => {
  const cartdata = useSelector((state) => state.cart);

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>

      <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]">
        {cartdata.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                {item.name || 'Chicken Tikak'}
              </h1>
              <p className="text-[#ababab] font-semibold">x{item.quantity || 1}</p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <RiDeleteBin2Fill
                  className="text-[#ababab] cursor-pointer"
                  size={20}
                />
                <FaNotesMedical
                  className="text-[#ababab] cursor-pointer"
                  size={20}
                />
              </div>
              <p className="text-[#f5f5f5] text-md font-bold">
                ${item.total || item.price || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartInfo;
