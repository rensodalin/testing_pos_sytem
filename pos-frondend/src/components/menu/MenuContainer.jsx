import React, { useState } from "react";
import { menu } from "../../constants";
import { getBgColor } from "../../utils";
import { GrRadialSelected } from "react-icons/gr";

const MenuContainer = () => {
  const [selected, setselected] = useState(menu[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId , setItemId] = useState();
  const increment = (id) => {
    setItemId(id);
    if (itemCount >=4) return;
    setItemCount((prev) => prev + 1);
  };
  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount ((prev) => prev - 1);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menu.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg
                    h-[100px] cursor-pointer"
              style={{ backgroundColor: getBgColor() }}
              onClick={() => {
                setselected(menu);
                setItemId(0);
                setItemCount(0);

              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} item
              </p>
            </div>
          );
        })}
      </div>
      <hr className="border-[#655f5f] border-t-2 mt-4" />
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg
                    h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.name}
                </h1>
              </div>
              <p className="text-[#ababab] text-xl font-bold">${menu.price}</p>
              <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6 z-20">
                <button
                  onClick={() => decrement(menu.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &minus;
                </button>
                <span className="text-white">{menu.id === itemId ? itemCount :"0"}</span>
                <button
                  onClick={() => increment(menu.id)}
                  className="text-yellow-500 text-2xl"
                >
                  &#43;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
